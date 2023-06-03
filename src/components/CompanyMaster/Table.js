import React from 'react'

const Table = ({name, setname, add, setadd, cont, setcont, active, setactive, pin, setpin, email, setemail, handleClick, setid}) => {

    const cancel=()=>{
        setid('');
        setname('');
        setadd('');
        setcont('');
        setpin('');
        setactive('True');
        setemail('');
    }

    return (
        <>
        <div className='header-row'>
            <div className='header-cell'>Company Name</div>
            <div className='header-cell'>Company Address</div>
            <div className='header-cell'>Company Pin</div>
            <div className='header-cell'>Company Contact</div>
            <div className='header-cell'>Company Email</div>
        </div>
        <div className='header-row'>
            <input type='text' className='header-cell input-cell' onChange={(e)=>setname(e.target.value)} value={name} />
            <input type='text' className='header-cell input-cell' onChange={(e)=>setadd(e.target.value)} value={add}/>
            <input type='text' className='header-cell input-cell' onChange={(e)=>setpin(e.target.value)} value={pin}/>
            <input type='text' className='header-cell input-cell' onChange={(e)=>setcont(e.target.value)} value={cont}/>
            <input type='text' className='header-cell input-cell' onChange={(e)=>setemail(e.target.value)} value={email}/>
            {/* <select value={active} className='header-cell input-cell' id='opt' onChange={(e)=>handleChange(e)}>
                <option className='header-cell' value='True'>True</option>
                <option className='header-cell' value='False'>False</option>
            </select> */}
        </div>
        <div className='btns'>
            <div className='add-btn' onClick={()=>handleClick()}>Add to Users List</div>
            <div className='add-btn' style={{background:"red"}} onClick={()=>cancel()}>Cancel</div>
        </div>
        </>
      )
}

export default Table
