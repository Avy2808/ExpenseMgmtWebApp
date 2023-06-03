import React, { useState } from 'react'
import Modal from '../Modal';

const User = ({data, deleteEntry, id, setuserid, setusername, setlvl, setactive, setpwd, setid}) => {

    const [showmodal, setshowmodal]=useState(false);

    const modifyEntry=()=>{
        setuserid(data.usr_id);
        setusername(data.usr_name);
        setlvl(data.usr_level);
        setactive(data.usr_active?'True':'False');
        setpwd(data.usr_pwd);
        setid(id);
    }

    const handleClick=()=>{
        deleteEntry(id);
        setshowmodal(false);
    }

    return (
        <>
            <div className='header-row'>
                <div className='header-cell'>{data.usr_name}</div>
                <div className='header-cell'>{data.usr_id}</div>
                <div className='header-cell'>{data.usr_level}</div>
                <div className='header-cell'>{data.usr_active?'Yes':'No'}</div>
                <div className='approved' onClick={()=>modifyEntry()} >Modify</div>
                <div className='reject' onClick={()=>setshowmodal(true)} >Delete</div>
            </div>
            {showmodal && <Modal handleClick={handleClick} setshowmodal={setshowmodal}/>}
        </>
    )
}

export default User
