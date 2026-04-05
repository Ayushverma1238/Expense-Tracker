import React, { useEffect, useState } from 'react'
import DashboardLayout from '../../components/layouts/DashboardLayout'
import { useUserAuth } from '../../hooks/useUserAuth';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../utils/axiosInstance';
import { API_PATH } from '../../utils/apiPath';
import { IoMdCard } from 'react-icons/io'
import { LuHandCoins, LuWalletMinimal } from "react-icons/lu";
import { addThousandSeparator } from '../../utils/helper';
import InfoCard from '../../components/Cards/InfoCard';
import RecentTransections from '../../components/Dashboard/RecentTransections';
import FinanceOverview from '../../components/Dashboard/FinanceOverview';
import ExpenseTranactions from '../../components/Dashboard/ExpenseTranactions';
import Last30DaysExpenses from '../../components/Dashboard/Last30DaysExpenses';
import RecentIncomeWithChart from '../../components/Dashboard/RecentIncomeWithChart';
import RecentIncome from '../../components/Dashboard/RecentIncome';
import Footer from './Footer';
import { Helmet } from 'react-helmet-async';

const Home = () => {
  useUserAuth();
  const navigate = useNavigate();
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchDashboardData = async() =>{
    if(loading) return;

    setLoading(true);

    try {
      const response = await axiosInstance.get(`${API_PATH.DASHBOARD.GET_DASHBOARD_DATA}`);

      if(response?.data?.data){
        setDashboardData(response?.data?.data);
      }
      

    } catch (error) {
      console.error("Something wend wrong. Please try again", error);

    }finally{
      setLoading(false);
    }
  }

  useEffect(() =>{
    fetchDashboardData();
    return () => {};

  },[])

  return (
    <>
 <Helmet>
         <title>Dashboard | Expense Tracker</title>
       </Helmet>
    <DashboardLayout
    activeMenu="Dashboard"
    >
      <div className='my-5 mx-auto'>
          <div className='grid grid-col-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
            <InfoCard 
            icon={<IoMdCard />}
            label={"Total Balance"}
            value={addThousandSeparator(dashboardData?.totalBalance||0)}
            color='bg-primary'
            />

            
            <InfoCard 
            icon={<LuWalletMinimal />}
            label={"Total Income"}
            value={addThousandSeparator(dashboardData?.totalIncome||0)}
            color='bg-green-500'
            />


            <InfoCard 
            icon={<LuHandCoins />}
            label={"Total Expense"}
            value={addThousandSeparator(dashboardData?.totalExpense||0)}
            color='bg-red-500'
            />


          </div>

          <div className='grid mt-6 grid-col-1 md:grid-cols-2 gap-6'>
            <RecentTransections
              transactions = {dashboardData?.recentTransactions}
              onSeeMore ={() => navigate("/expense")}
            />

            <FinanceOverview
            totalBalance= {dashboardData?.totalBalance}
            totalIncome= {dashboardData?.totalIncome}
            totalExpense= {dashboardData?.totalExpense}

            />

            <ExpenseTranactions
              onSeeMore={() =>navigate("/expense")}
              transactions= {dashboardData?.last30DaysExpenses?.transactions}
            />

            <Last30DaysExpenses
              data={dashboardData?.last30DaysExpenses?.transactions || []}
            />

            <RecentIncomeWithChart
            data={dashboardData?.last60DaysIncome?.transactions ||[]}
            totalIncome = {dashboardData?.totalIncome || 0}
            />

            <RecentIncome
            transactions ={dashboardData?.last60DaysIncome?.transactions ||[]}
            onSeeMore= {() => navigate('/income')}
            />


          </div>
        <Footer />
            
      </div>

    </DashboardLayout>
    </>
  )
}

export default Home