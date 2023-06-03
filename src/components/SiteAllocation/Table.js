import React from 'react'

const Table = ({userid, setuserid, alcsite, setalcsite, active, setactive, handleClick, setid}) => {

    const handleChange=(e)=>{
        setactive(e.target.value)
    }

    const cancel=()=>{
        setid('');
        setuserid('');
        setalcsite('');
        setactive('True');
    }

    return (
        <>
        <div className='header-row'>
            <div className='header-cell'>Site Name</div>
            <div className='header-cell'>User ID</div>
            <div className='header-cell'>User Active</div>
        </div>
        <div className='header-row'>
            <input type='text' className='header-cell input-cell' onChange={(e)=>setalcsite(e.target.value)} value={alcsite} />
            <input type='text' className='header-cell input-cell' onChange={(e)=>setuserid(e.target.value)} value={userid}/>
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
