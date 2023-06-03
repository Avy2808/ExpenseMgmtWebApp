import React from 'react'

const Table = ({userid, setuserid, exname, setexname, exsub, setexsub, active, setactive, handleClick, setid}) => {

    const handleChange=(e)=>{
        setactive(e.target.value)
    }

    const cancel=()=>{
        setid('');
        setuserid('');
        setexname('');
        setexsub('');
        setactive('True');
    }

    return (
        <>
        <div className='header-row'>
            <div className='header-cell'>Expense Name</div>
            <div className='header-cell'>Expense Code</div>
            <div className='header-cell'>Expense Sub-Code</div>
            <div className='header-cell'>Expense Active</div>
        </div>
        <div className='header-row'>
            <input type='text' className='header-cell input-cell' onChange={(e)=>setexname(e.target.value)} value={exname} />
            <input type='text' className='header-cell input-cell' onChange={(e)=>setuserid(e.target.value)} value={userid}/>
            <input type='text' className='header-cell input-cell' onChange={(e)=>setexsub(e.target.value)} value={exsub}/>
            <select value={active} className='header-cell input-cell' id='opt' onChange={(e)=>handleChange(e)}>
                <option className='header-cell' value='True'>True</option>
                <option className='header-cell' value='False'>False</option>
            </select>
        </div>
        <div className='btns'>
            <div className='add-btn' onClick={()=>handleClick()}>Add to Site List</div>
            <div className='add-btn' style={{background:"red"}} onClick={()=>cancel()}>Cancel</div>
        </div>
        </>
      )
}

export default Table
