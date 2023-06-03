import React from 'react'

const CompanyInfo = ({data}) => {
    return (
        <div>
        <div className='detpar'>
                <div className='triangle'></div>
                <div className='details'>
                    <p>Company Name: {data.com_name}</p>
                    <p>Company Address: {data.com_add}</p>
                    <p>Company Pin: {data.com_pin}</p>
                    <p>Company Phone: {data.com_contact}</p>
                    <p>Company By: {data.com_by}</p>
                    <p>Company Email: {data.com_mail}</p>
                </div>
            </div>
        </div>
    )
}

export default CompanyInfo
