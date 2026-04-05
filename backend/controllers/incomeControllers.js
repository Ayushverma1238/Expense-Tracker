const express = require("express");
const xlsx = require('xlsx')
const db = require("../config/db");
const {
  createIncomeTable,
  addRow,
  deleteRow,
  getAllIncomeData,
} = require("../models/Income");
const response = require("../utils/responseHandler");

// Create income table
createIncomeTable();
// Add Income
exports.addIncome = async (req, res) => {
  const userId = req.user.id;

  try {
    const { icon, source, amount, date } = req.body;
   

    if (!source || !amount || !date) {
      return response(res, 400, "All field are required");
    }

    const income = await addRow({
      user_id: userId,
      icon,
      source,
      amount,
      date,
    });

    return response(res, 200, "Income data added successfully", income);
  } catch (error) {
    console.error("Adding income error", error)
    return response(res, 500, "Internal server error");
  }
};

// Get all income
exports.getAllIncome = async (req, res) => {
    const userId = req.user.id;
    
    try {
        const income = await getAllIncomeData({userId});
        // res.json(income);
        return response(res, 200, "User income data retrived", income)
    } catch (error) {
        console.error("Fetching user detail", error)
        return response(res, 500, "Internal server error");
    }
};

// Delete a particular income row
exports.deleteIncome = async (req, res) => {
    const id = req.params.id;
   
    try {
        const query = `SELECT * from incomes WHERE id = ?`;
        const [rows] = await db.query(query, [id]);
        if(rows.length === 0){
            return response(res, 404, "Income detail not found");
        }

        await deleteRow({id});
        return response(res, 200, "Income data deleted successfull");

    } catch (error) {
        console.error("Error deleting income data", error)
        return response(res, 500, "Internal server error");
    }

};

// Download Income expences in excel sheet
exports.downloadIncomeExcel = async (req, res) => {
    const userId = req.user.id;

  try {
    const income = await getAllIncomeData({userId});

    // prepare data
    const data = income.map((item) => ({
        
      Source: item.source,
      Amount: item.amount,
      Date: item.date,
    }));

    
    // create workbook
    const wb = xlsx.utils.book_new();
    const ws = xlsx.utils.json_to_sheet(data);

    xlsx.utils.book_append_sheet(wb, ws, "Income");

    // ✅ Fix 2: correct variable + extension
    const filePath = "income_details.xlsx";
    xlsx.writeFile(wb, filePath);

    // ✅ Fix 3: download correct file
    res.download(filePath);

  } catch (error) {
    console.error("Error printing data", error);
    return response(res, 500, "Internal server error");
  }
};
