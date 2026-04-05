import React from 'react'
import  CARD_2 from '../../assets/images/loginBar.png'
import {LuTrendingUpDown} from 'react-icons/lu'

const Auth_layout = ({children}) => {
  return (
    <div className='flex'>

    <div className='w-screen md:w-[60vw] px-12 pt-8 pb-12 h-screen'>
        <h2 className='text-3xl font-bold text-gray-900'>Expense Tracker</h2>
        {children}
    </div>

    <div className='hidden md:block w-[40vw] bg-violet-50 bg-cover bg-no-repeat bg-auth-bg-img h-screen bg-center p-8 relative overflow-hidden'>
        <div className='w-48 h-48 rounded-[40px] bg-purple-600 absolute -top-7 -left-5'/>
        <div className='w-48 h-48 rounded-[40px] border-20 border-fuchsia-600 absolute top-[30%] -right-10'/>
        <div className='w-48 h-48 rounded-[40px] bg-violet-500 absolute -bottom-7 -left-5'/>
        <div className='grid grid-cols-1 z-20'>
            <StatsInfoCard
            icon={<LuTrendingUpDown />}
            label ="Track Your Income & Expenses"
            value="430,000"
            color="bg-primary"
            />

        </div>
        <img src={CARD_2}
         className='w-64 rounded-2xl lg:w-[90%] absolute bottom-10 shadow-2xl shadow-blue-400/15'
        alt="loginImg" />
    </div>
    </div>
  )
}

export default Auth_layout;

const StatsInfoCard = ({icon, label, value, color})=>{
    return (<div className='flex gap=4 bg-white p-4 z-10 rounded-xl shadow-md shadow-purple-400/10 border border-gray-200/50'>

        <div className={`w-12 h-12 flex items-center justify-center text-[26px] text-white ${color} rounded-full drop-shadow-xl `}>
            {icon}
        </div>
        <div>
            <h6 className='text-xl text-gray-500 mb-1'>{label}</h6>
            <span className='text-[20px] '>${value}</span>
        </div>
    </div>
    )
}