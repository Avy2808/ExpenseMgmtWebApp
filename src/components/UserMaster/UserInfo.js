import React from 'react'

const UserInfo = ({data}) => {

    function toDateTime(secs) {
        const output = new Date(secs * 1000);
        return output;
    }

    return (
        <div>
        <div className='detpar'>
                <div className='triangle'></div>
                <div className='details'>
                    <p>Name: {data.usr_name}</p>
                    <p>Password: {data.usr_pwd}</p>
                    <p>Phone Number: {data.usr_id}</p>
                    <p>Access Level: {data.usr_level}</p>
                    <p>Date of join: {`${toDateTime(data.usr_date.seconds).toLocaleString()}`}</p>
                    <p>User By: {data.usr_by}</p>
                    <p>User Active: {data.usr_active?'True':'False'}</p>
                </div>
            </div>
        </div>
    )
}

export default UserInfo
