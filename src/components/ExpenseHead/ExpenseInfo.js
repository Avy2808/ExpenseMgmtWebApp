import React from 'react'

const ExpenseInfo = ({data}) => {
    function toDateTime(secs) {
        const output = new Date(secs * 1000);
        return output;
    }

    console.log(data.ex_date);

    return (
        <div>
        <div className='detpar'>
                <div className='triangle'></div>
                <div className='details'>
                    <p>Expense Name: {data.ex_name}</p>
                    <p>Expense Code: {data.ex_code}</p>
                    <p>Expense Sub Code: {data.ex_sub}</p>
                    <p>Date: {`${toDateTime(data.ex_date.seconds).toLocaleString()}`}</p>
                    <p>Expense By: {data.ex_by}</p>
                    <p>User Active: {data.ex_active?'True':'False'}</p>
                </div>
            </div>
        </div>
    )
}

export default ExpenseInfo
