import React, { useState } from 'react'
import Modal from '../Modal';

const Expense = ({data, deleteEntry, id, setuserid, setexname, setexsub, setactive, setid}) => {
    const [showmodal, setshowmodal]=useState(false);

    const modifyEntry=()=>{
        setuserid(data.ex_code);
        setexname(data.ex_name);
        setactive(data.ex_active?'True':'False');
        setexsub(data.ex_sub);
        setid(id);
    }

    const handleClick=()=>{
        deleteEntry(id);
        setshowmodal(false);
    }

    return (
        <>
            <div className='header-row'>
                <div className='header-cell'>{data.ex_name}</div>
                <div className='header-cell'>{data.ex_code}</div>
                <div className='header-cell'>{data.ex_sub}</div>
                <div className='header-cell'>{data.ex_active?'Yes':'No'}</div>
                <div className='approved' onClick={()=>modifyEntry()} >Modify</div>
                <div className='reject' onClick={()=>setshowmodal(true)} >Delete</div>
            </div>
            {showmodal && <Modal handleClick={handleClick} setshowmodal={setshowmodal}/>}
        </>
    )
}

export default Expense
