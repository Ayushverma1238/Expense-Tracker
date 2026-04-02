const express = require("express");
const db = require("../config/db");
const xlsx = require("xlsx");
const {
  createExpenseTable,
  addExpense,
  deleteExpense,
  getAllExpenseData,
} = require("../models/Expense");
const response = require("../utils/responseHandler");

createExpenseTable();

exports.addExpense = async (req, res) => {
  const user_id = req.user.id;
  try {
    const { icon, category, amount, date } = req.body;

    // validation
    if (!category || !amount || !date) {
      return response(res, 400, "All filed are required");
    }

    const expense = await addExpense({ user_id, icon, category, amount, date });
    return response(res, 200, "Expense added successfully", expense);
  } catch (error) {
    console.error("Adding expense error", error);
    return response(res, 500, "Internal server error");
  }
};

exports.deleteExpense = async (req, res) => {
  const id = req.params.id;
  try {
    const query = `SELECT * from expenses WHERE id = ?`;
    const [rows] = await db.query(query, [id]);
    if (rows.length === 0) {
      return response(res, 404, "Expense not found");
    }

    await deleteExpense({id});
    return response(res, 200, "Expense deleted successfull");
  } catch (error) {
    console.error("Error deleting expences", error)
    return response(res, 500, "Internal server error");
  }
};

exports.getAllExpense = async (req, res) => {
  const userId = req.user.id;
  try {
    
    const expenses = await getAllExpenseData({ userId });
    return response(res, 200, "Getting all expenses of user ", expenses);
  } catch (error) {
    console.error("Error getting expenses", error);
    return response(res, 500, "Internal server error");
  }
};

exports.downloadExpenseExcel = async (req, res) => {
  const userId = req.user.id;

  try {
    const expences = await getAllExpenseData({ userId });

    const data = expences.map((item) => ({
      Category: item.category,
      Amount: item.amount,
      Date: item.date,
    }));

    // create workbook
    const wb = xlsx.utils.book_new();
    const ws = xlsx.utils.json_to_sheet(data);

    xlsx.utils.book_append_sheet(wb, ws, "Expences");

    const filePath = "expense_details.xlsx";
    xlsx.writeFile(wb, filePath);

    res.download(filePath);
  } catch (error) {
    console.error("Error downloading data", error);
    return response(res, 500, "Internal server error");
  }
};
