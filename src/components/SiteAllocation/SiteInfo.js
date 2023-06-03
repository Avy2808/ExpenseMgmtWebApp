import React from 'react'

const SiteInfo = ({data}) => {
    function toDateTime(secs) {
        const output = new Date(secs * 1000);
        return output;
    }

    return (
        <div>
        <div className='detpar'>
                <div className='triangle'></div>
                <div className='details'>
                    <p>Site Name: {data.alc_site}</p>
                    <p>User ID: {data.alc_user}</p>
                    <p>Date of join: {`${toDateTime(data.alc_date.seconds).toLocaleString()}`}</p>
                    <p>User By: {data.alc_by}</p>
                    <p>User Active: {data.alc_active?'True':'False'}</p>
                </div>
            </div>
        </div>
    )
}

export default SiteInfo
