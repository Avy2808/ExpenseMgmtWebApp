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
                    <p>Site Name: {data.site_name}</p>
                    <p>Site Company: {data.site_com}</p>
                    <p>Site CC: {data.site_cc}</p>
                    <p>Site Date: {`${toDateTime(data.site_date.seconds).toLocaleString()}`}</p>
                    <p>Site Start: {`${toDateTime(data.site_start.seconds).toLocaleString()}`}</p>
                    <p>Site By: {data.site_by}</p>
                    <p>User Active: {data.site_active?'True':'False'}</p>
                </div>
            </div>
        </div>
    )
}

export default SiteInfo
