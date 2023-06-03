import React, { useState } from 'react'
import "../UserMaster/UserMaster.css";
import Modal from '../Modal';

const Sites = ({data, deleteEntry, id, setname, setcc, setcom, setactive, setid}) => {
    const [showmodal, setshowmodal]=useState(false);

    const modifyEntry=()=>{
        setname(data.site_name);
        setcc(data.site_cc);
        setactive(data.site_active?'True':'False');
        setcom(data.site_com);
        setid(id);
    }

    const handleClick=()=>{
        deleteEntry(id);
        setshowmodal(false);
    }

    return (
        <>
            <div className='header-row'>
                <div className='header-cell'>{data.site_name}</div>
                <div className='header-cell'>{data.site_com}</div>
                <div className='header-cell'>{data.site_cc}</div>
                <div className='header-cell'>{data.site_active?'Yes':'No'}</div>
                <div className='approved' onClick={()=>modifyEntry()} >Modify</div>
                <div className='reject' onClick={()=>setshowmodal(true)} >Delete</div>
            </div>
            {showmodal && <Modal handleClick={handleClick} setshowmodal={setshowmodal}/>}
        </>
    )
}

export default Sites
