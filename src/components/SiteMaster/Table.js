import React from 'react'

const Table = ({name, setname, cc, setcc, com, setcom, active, setactive, handleClick, setid}) => {

    const handleChange=(e)=>{
        setactive(e.target.value)
    }

    const cancel=()=>{
        setid('');
        setname('');
        setcc('');
        setcom('');
        setactive('True');
    }

    return (
        <>
        <div className='header-row'>
            <div className='header-cell'>Site Name</div>
            <div className='header-cell'>Site Company</div>
            <div className='header-cell'>Site CC</div>
            <div className='header-cell'>Site Active</div>
        </div>
        <div className='header-row'>
            <input type='text' className='header-cell input-cell' onChange={(e)=>setname(e.target.value)} value={name} />
            <input type='text' className='header-cell input-cell' onChange={(e)=>setcom(e.target.value)} value={com}/>
            <input type='text' className='header-cell input-cell' onChange={(e)=>setcc(e.target.value)} value={cc}/>
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
