import React from 'react'

const Table = ({userid, setuserid, username, setusername, lvl, setlvl, active, setactive, pwd, setpwd, handleClick, setid}) => {

    console.log(userid);

    const handleChange=(e)=>{
        setactive(e.target.value)
    }

    const cancel=()=>{
        setid('');
        setuserid('');
        setusername('');
        setlvl('');
        setactive('True');
        setpwd('');
    }

  return (
    <>
    <div className='header-row'>
        <div className='header-cell'>User ID</div>
        <div className='header-cell'>Password</div>
        <div className='header-cell'>User Name</div>
        <div className='header-cell'>Access Level</div>
        <div className='header-cell'>User Active</div>
    </div>
    <div className='header-row'>
        <input type='text' className='header-cell input-cell' onChange={(e)=>setuserid(e.target.value)} value={userid}/>
        <input type='text' className='header-cell input-cell' onChange={(e)=>setpwd(e.target.value)} value={pwd}/>
        <input type='text' className='header-cell input-cell' onChange={(e)=>setusername(e.target.value)} value={username} />
        <input type='text' className='header-cell input-cell'  onChange={(e)=>setlvl(e.target.value)} value={lvl} />
        <select value={active} className='header-cell input-cell' id='opt' onChange={(e)=>handleChange(e)}>
            <option className='header-cell' value='True'>True</option>
            <option className='header-cell' value='False'>False</option>
        </select>
    </div>
    <div className='btns'>
        <div className='add-btn' onClick={()=>handleClick()}>Add to Users List</div>
        <div className='add-btn' style={{background:"red"}} onClick={()=>cancel()}>Cancel</div>
    </div>
    </>
  )
}

export default Table
