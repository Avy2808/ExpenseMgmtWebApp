import React, { useState } from 'react'
import Modal from '../Modal';

const Companies = ({data, deleteEntry, id, setname, setadd, setcont, setpin, setactive, setemail}) => {
    const [showmodal, setshowmodal]=useState(false);

    const modifyEntry=()=>{
        setname(data.com_name);
        setadd(data.com_add);
        setactive(data.com_active?'True':'False');
        setcont(data.com_contact);
        setpin(data.com_pin);
        setemail(data.com_mail);
        deleteEntry(id);
    }

    const handleClick=()=>{
        deleteEntry(id);
        setshowmodal(false);
    }

    return (
        <>
            <div className='header-row'>
                <div className='header-cell'>{data.com_name}</div>
                <div className='header-cell'>{data.com_mail}</div>
                <div className='header-cell'>{data.com_contact}</div>
                <div className='header-cell'>{data.com_active?'Yes':'No'}</div>
                <div className='approved' onClick={()=>modifyEntry()} >Modify</div>
                <div className='reject' onClick={()=>setshowmodal(true)} >Delete</div>
            </div>
            {showmodal && <Modal handleClick={handleClick} setshowmodal={setshowmodal}/>}

        </>
    )
}

export default Companies
