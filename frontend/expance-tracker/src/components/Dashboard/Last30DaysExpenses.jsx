import React, { useEffect, useState } from 'react'
import { prepareExpenseBarChart } from '../../utils/helper';
import CustomeBarChart from '../Charts/CustomeBarChart';

const Last30DaysExpenses = ({data}) => {

    const [chartData, setChartData] = useState([])
    useEffect(() =>{
        const result = prepareExpenseBarChart(data);
        setChartData(result);
        return () =>{};
    },[data])

  return (
    <div className='card col-span-1'>
        <div className='flex items-center justify-between'>
            <h5>Last 30 Days Expenses</h5>

        </div>

        <CustomeBarChart data={chartData} />
    </div>
  )
}

export default Last30DaysExpenses