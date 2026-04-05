const db = require("../config/db");
const response = require("../utils/responseHandler");


exports.getDashboardData = async (req, res) => {
  try {
    const userId = req.user.id;

    const formatDate = (date) => date.toISOString().split("T")[0];

    // const today = formatDate(new Date());
    // const last60Days = formatDate(new Date(Date.now() - 60 * 24 * 60 * 60 * 1000));
    // const last30Days = formatDate(new Date(Date.now() - 30 * 24 * 60 * 60 * 1000));
    // const last5Days = formatDate(new Date(Date.now() - 5 * 24 * 60 * 60 * 1000));

    // ✅ Total Income
    const [[totalIncomeResult]] = await db.query(
      `SELECT SUM(amount) as totalIncome FROM incomes WHERE user_id = ?`,
      [userId]
    );

    // ✅ Total Expense
    const [[totalExpenseResult]] = await db.query(
      `SELECT SUM(amount) as totalExpense FROM expenses WHERE user_id = ?`,
      [userId]
    );

    // ✅ Last 60 Days Income
    const [last60DaysTransactionsData] = await db.query(
      `SELECT * FROM incomes 
       WHERE user_id = ? 
      AND date >= CURDATE() - INTERVAL 5 DAY ORDER BY date DESC`,
      [userId]
    );

    const last60DaysIncomeData = last60DaysTransactionsData.reduce(
      (sum, t) => sum + Number(t.amount),
      0
    );

    // ✅ Last 30 Days Expense
    const [last30DaysTransactionsData] = await db.query(
      `SELECT * FROM expenses 
       WHERE user_id = ? 
       AND date >= CURDATE() - INTERVAL 5 DAY ORDER BY date DESC`,
      [userId]
    );

    const last30DaysExpenseData = last30DaysTransactionsData.reduce(
      (sum, t) => sum + Number(t.amount),
      0
    );

    // ✅ Last 5 Days Transactions
    const [last5DaysIncomeData] = await db.query(
      `SELECT * FROM incomes 
       WHERE user_id = ? 
       AND date >= CURDATE() - INTERVAL 5 DAY ORDER BY date DESC`,
      [userId]
    );

    const [last5DaysExpenseData] = await db.query(
      `SELECT * FROM expenses 
       WHERE user_id = ? 
       AND date >= CURDATE() - INTERVAL 5 DAY ORDER BY date DESC`,
      [userId]
    );

    const last5DaysTransactions = [
      ...last5DaysIncomeData.map(t => ({ ...t, type: "income" })),
      ...last5DaysExpenseData.map(t => ({ ...t, type: "expense" })),
    ].sort((a, b) => new Date(b.date) - new Date(a.date));

    // ✅ Final Data
    const totalIncome = Number(totalIncomeResult?.totalIncome) || 0;
const totalExpense = Number(totalExpenseResult?.totalExpense) || 0;

    const data = {
      totalBalance: totalIncome - totalExpense,
      totalIncome,
      totalExpense,

      last30DaysExpenses: {
        total: last30DaysExpenseData,
        transactions: last30DaysTransactionsData,
      },

      last60DaysIncome: {
        total: last60DaysIncomeData,
        transactions: last60DaysTransactionsData,
      },

      recentTransactions: last5DaysTransactions,
    };

    return response(res, 200, "Getting dashboard data", data);

  } catch (error) {
    console.error("Error fetching dashboard data", error);
    return response(res, 500, "Internal server error");
  }
};