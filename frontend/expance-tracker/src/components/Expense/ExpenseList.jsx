import React from 'react'
import { LuDownload } from 'react-icons/lu'
import TransactionsInfoCard from '../Cards/TransactionsInfoCard'
import moment from 'moment'

const ExpenseList = ({transactions, onDelete,onDownload}) => {
  return (
    <div className='card mt-4'>
        <div className='flex items-center justify-between'>
            <h5 className='text-lg'>expense Source</h5>
            <button className='card-btn' onClick={onDownload}>
                <LuDownload className='text-base' />Download
            </button>
        </div>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
            {transactions.map((expense, index) => (
                <TransactionsInfoCard
                key={expense?.id || index}
                title={expense.source}
                icon = {expense?.icon}
                date = {moment(expense.date).format("Do MMM YYYY")}
                amount={expense?.amount}
                type="expense"
                onDelete={() =>onDelete(expense.id)}
                />
            ))}

        </div>

    </div>
  )
}

export default ExpenseList