import React, { useEffect, useState } from "react";
import { prepareIncomeChartData } from "../../utils/helper";
import { LuPlus } from "react-icons/lu";
import CustomeBarChart from "../Charts/CustomeBarChart";

const IncomeOverview = ({ transactions, onAddIncome }) => {
  const [chartData, setChartData] = useState([]);
  useEffect(() => {
    const result = prepareIncomeChartData(transactions ||[]);
    setChartData(result);
    return () => {};
  }, [transactions]);

  return (
    <div className="card">
      <div className="flex items-center justify-between">
        <div className="">
          <h5 className="text-lg">Income Overview</h5>
          <p className="text-xs ext-gray-400 mt-0.5">
            Track your earnings over time and analyze your income to trands.
          </p>
        </div>
        <button
        onClick={onAddIncome}
        className="add-btn">
          <LuPlus className="text-lg" />
          Add Income
        </button>
      </div>
      <div className="mt-10">
        <CustomeBarChart data={chartData} />
      </div>
    </div>
  );
};

export default IncomeOverview;
