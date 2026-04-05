import React, { useEffect, useState } from "react";
import DashboardLayout from "../../components/layouts/DashboardLayout";
import IncomeOverview from "../../components/Income/IncomeOverview";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATH } from "../../utils/apiPath";
import Modal from "../../components/layouts/Modal";
import AddIncomeForm from "../../components/Income/AddIncomeForm";
import { toast } from "react-toastify";
import IncomeList from "../../components/Income/IncomeList";
import DeleteAlert from "../../components/DeleteAlert";
import { useUserAuth } from "../../hooks/useUserAuth";

const Income = () => {
  useUserAuth();
  const [incomeData, setIncomeData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [openDeleteAlert, setOpenDeleteAlert] = useState({
    show: false,
    data: null,
  });

  const [openAddIncomeModel, setOpenAddIncomeModel] = useState(false);

  // Get All income data
  const fetchIncomeDetail = async () => {
    try {
      setLoading(true);

      const response = await axiosInstance.get(API_PATH.INCOME.GET_ALL_INCOME);

      if (response?.data?.data) {
        setIncomeData(response.data.data);
      }
    } catch (error) {
      console.error("Fetching income data error", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchIncomeDetail();
  }, []);

  // handle add income
  const handleAddIncome = async (income) => {
    const { source, icon, amount, date } = income;

    if (!source.trim()) {
      toast.error("Source is required.");
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
      await axiosInstance.post(API_PATH.INCOME.ADD_INCOME, {
        source,
        date,
        amount,
        icon,
      });

      setOpenAddIncomeModel(false);
      toast.success("Income added successfully.");
      fetchIncomeDetail();
      return;
    } catch (error) {
      console.error(
        "Error adding income detail",
        error?.response?.data?.message || error?.message,
      );
    }
  };

  // handleDelete Income
  const handleDeleteIncome = async (id) => {
    if (!id) return;

    try {
      await axiosInstance.delete(API_PATH.INCOME.DELETE_INCOME(id));

      setOpenDeleteAlert({ show: false, data: null });
      toast.success("Income Detail deleted successfully.");
      fetchIncomeDetail();
    } catch (error) {
      console.error(
        "Error deleting income detail",
        error?.response?.data?.message || error?.message,
      );
    }
  };
  // handle Download Income Detail
  const handleDownloadIncomeDetails = async () => {
    try {
      const response = await axiosInstance.get(
        API_PATH.INCOME.DOWNLOAD_INCOME,
        {
          responseType: "blob",
        },
      );
      // Creating a url for blog

      const url = window.URL.createObjectURL(new Blob([response?.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "income_detail.xlsx");
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);
      window.URL.revokeObjectURL(url);
      toast.success("Downloading Income data.");
    } catch (error) {
      console.error("Error downloading income details:", error);
      toast.error("Failed to download income details. Please try again.");
    }
  };

  return (
    <DashboardLayout activeMenu="Income">
      <div className="my-5 mx-auto">
        <div className="grid grid-cols-1 gap-4">
          <div className="">
            <IncomeOverview
              transactions={incomeData}
              onAddIncome={() => setOpenAddIncomeModel(true)}
            />
          </div>

          <IncomeList
            transactions={incomeData}
            onDelete={(id) => {
              setOpenDeleteAlert({ show: true, data: id });
            }}
            onDownload={handleDownloadIncomeDetails}
          />
        </div>
        <Modal
          isOpen={openAddIncomeModel}
          onClose={() => setOpenAddIncomeModel(false)}
          title="Add Income"
        >
          <AddIncomeForm onAddIncome={handleAddIncome} />
        </Modal>
        <Modal
          isOpen={openDeleteAlert.show}
          onClose={() => setOpenDeleteAlert({ show: false, data: null })}
          title="Delete Income"
        >
          <DeleteAlert
            content="Are you sure you want to delete this income detail?"
            onDelete={() => handleDeleteIncome(openDeleteAlert.data)}
          />
        </Modal>
      </div>
    </DashboardLayout>
  );
};

export default Income;
