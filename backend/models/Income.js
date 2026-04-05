const db = require("../config/db");

const createIncomeTable = async () => {
  const query = `
    CREATE TABLE IF NOT EXISTS incomes (
      id INT AUTO_INCREMENT PRIMARY KEY,
      user_id INT NOT NULL,
      icon VARCHAR(100),
      source VARCHAR(100) NOT NULL,
      amount DECIMAL(10,2) NOT NULL,
      date DATETIME DEFAULT CURRENT_TIMESTAMP,
      createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

      INDEX (user_id),
      CONSTRAINT fk_user_income
      FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
    )
  `;

  try {
    const [result] = await db.query(query);
  } catch (err) {
    console.error("Error creating income table:", err);
  }
};

const formatDate = (date) => {
  const d = new Date(date);

  const pad = (n) => (n < 10 ? "0" + n : n);

  return (
    d.getFullYear() +
    "-" +
    pad(d.getMonth() + 1) +
    "-" +
    pad(d.getDate()) +
    " " +
    pad(d.getHours()) +
    ":" +
    pad(d.getMinutes()) +
    ":" +
    pad(d.getSeconds())
  );
};

// Insert User
const addRow = async (incomeData) => {
  const { user_id, icon, source, amount, date } = incomeData;

  const formattedDate = date
    ? formatDate(date)
    : formatDate(new Date());

  const query =
    "INSERT INTO incomes (user_id, icon, source, amount, date) VALUES (?, ?, ?, ?, ?)";

  const [result] = await db.query(query, [
    user_id,
    icon,
    source,
    amount,
    formattedDate,
  ]);

  return result;
};

const deleteRow = async ({ id }) => {
  const query = `DELETE FROM incomes
WHERE id = ?; `;

  await db.execute(query, [id]);
  return;
};

const getAllIncomeData = async ({userId}) => {
  const query = `SELECT * from incomes WHERE user_id = ? ORDER BY date DESC`;
  const [rows] = await db.query(query,[userId]);
  return rows;
};

module.exports = {
  createIncomeTable,
  addRow,
  deleteRow,
  getAllIncomeData,
};
