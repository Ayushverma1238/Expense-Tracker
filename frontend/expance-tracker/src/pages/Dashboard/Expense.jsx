import React, { useEffect, useState } from "react";
import { useUserAuth } from "../../hooks/useUserAuth";
import DashboardLayout from "../../components/layouts/DashboardLayout";
import { API_PATH } from "../../utils/apiPath";
import axiosInstance from "../../utils/axiosInstance";
import { toast } from "react-toastify";
import ExpenseOverview from "../../components/Expense/ExpenseOverview";
import Modal from "../../components/layouts/Modal";
import AddExpenseForm from "../../components/Expense/AddExpenseForm";
import DeleteAlert from "../../components/DeleteAlert";
import ExpenseList from "../../components/Expense/ExpenseList";
const Expense = () => {
  useUserAuth();
  const [expenseData, setExpenseData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [openDeleteAlert, setOpenDeleteAlert] = useState({
    show: false,
    data: null,
  });

  const [openAddExpenseModel, setOpenAddExpenseModel] = useState(false);

  // Get All Expense data
  const fetchExpenseDetail = async () => {
    try {
      setLoading(true);

      const response = await axiosInstance.get(
        API_PATH.EXPENSE.GET_ALL_EXPENSE,
      );
      if (response?.data?.data) {
        setExpenseData(response.data.data);
      }
    } catch (error) {
      console.error("Fetching expense data error", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchExpenseDetail();
  }, []);

  // handle add Expense
  const handleAddExpense = async (expense) => {
    const { category, icon, amount, date } = expense;

    if (!category.trim()) {
      toast.error("Category is required.");
      return;
    }

    if (!amount || isNaN(amount) || Number(amount) <= 0) {
      toast.error("Amount should be a valid number greater than 0.");
      return;
    }

    if (!date) {
      toast.error("Date is required.");
      return;
    }

    try {
      await axiosInstance.post(API_PATH.EXPENSE.ADD_EXPENSE, {
        category,
        date,
        amount,
        icon,
      });

      setOpenAddExpenseModel(false);
      toast.success("Expense added successfully.");
      fetchExpenseDetail();
      return;
    } catch (error) {
      console.error(
        "Error adding expense detail",
        error?.response?.data?.message || error?.message,
      );
    }
  };

  // handleDelete Expense
  const handleDeleteExpense = async (id) => {
    if (!id) return;

    try {
      await axiosInstance.delete(API_PATH.EXPENSE.DELETE_EXPENSE(id));

      setOpenDeleteAlert({ show: false, data: null });
      toast.success("Expense Detail deleted successfully.");
      fetchExpenseDetail();
    } catch (error) {
      console.error(
        "Error deleting expense detail",
        error?.response?.data?.message || error?.message,
      );
    }
  };
  // handle Download Expense Detail
  const handleDownloadExpenseDetails = async () => {
    try {
      const response = await axiosInstance.get(API_PATH.EXPENSE.DOWNLOAD_EXPENSE,{
        responseType:'blob'
      })
      // Creating a url for blog

      const url = window.URL.createObjectURL(new Blob([response?.data]))
      const link = document.createElement('a');
      link.href=url;
      link.setAttribute("download", 'expense_detail.xlsx');
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);
      window.URL.revokeObjectURL(url)
      toast.success("Downloading Expense data.")
    } catch (error) {
      console.error("Error downloading expense details:", error);
      toast.error("Failed to download expense details. Please try again.")
    }
  };

  return (
    <DashboardLayout activeMenu="Expense">
      <div className="my-5 mx-auto">
        <div className="gri grid-cols-1 gap-6">
          <div>
            <ExpenseOverview 
            transactions = {expenseData}
            onExpenseIncome = {() =>setOpenAddExpenseModel(true)}
            />
             <ExpenseList
            transactions={expenseData}
            onDelete={(id) => {
              setOpenDeleteAlert({ show: true, data: id });
            }}
            onDownload={handleDownloadExpenseDetails}
          />
          </div>
        </div>

        <Modal
        isOpen ={openAddExpenseModel}
        onClose ={()=> setOpenAddExpenseModel(false)}
        title="Add Expense"
        >
          <AddExpenseForm onAddExpense = {handleAddExpense} />
        </Modal>


        <Modal
          isOpen={openDeleteAlert.show}
          onClose={() => setOpenDeleteAlert({ show: false, data: null })}
          title="Delete Expense"
        >
          <DeleteAlert
            content="Are you sure you want to delete this expense detail?"
            onDelete={() => handleDeleteExpense(openDeleteAlert.data)}
          />
        </Modal>
      </div>
    </DashboardLayout>
  );
};

export default Expense;
