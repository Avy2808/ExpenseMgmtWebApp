import React from 'react'

const Details = ({data}) => {

    function toDateTime(secs) {
        const output = new Date(secs * 1000);
        return output;
    }

    return (
        <div className='detpar'>
            <div className='triangle'></div>
            <div className='details'>
                <p>Expense Code: {data.exp_code}</p>
                <p>Expense Sub Code: {data.exp_sub}</p>
                <p>Description: {data.exp_desc}</p>
                <p>User ID: {data.exp_usr}</p>
                <p>Expense Amount: {data.exp_amt}</p>
                <p>Expense Date: {`${toDateTime(data.exp_date.seconds).toLocaleString()}`}</p>
                <p>GST ?: {data.exp_gst}</p>
                <p>Expense Company: {data.exp_com}</p>
                <p>Expense CC: {data.exp_cc}</p>
            </div>
        </div>
    )
}

export default Details
