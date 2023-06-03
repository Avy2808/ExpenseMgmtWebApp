import React, { useContext } from 'react'
import "./Navbar.css";
import {Link} from "react-router-dom";
import Logo from "../../assets/icon.jpg";
import { data } from '../../App';

const Navbar = () => {

  const {alllist}=useContext(data);

  const usr=JSON.parse(window.localStorage.getItem('User'));

  return (
    <div className='nav' id='myDIV'>
      <Link to='/' className='btn'><img src={Logo} className='logo' alt='Logo'/></Link>
      {usr.usr_level==='0' && <Link to='/compm' className='btn'>Company Master</Link>}
      {usr.usr_level==='0' && <Link to='/sitem' className='btn'>Site Master</Link>}
      {usr.usr_level==='0' && <Link to='/userm' className='btn'>User Master</Link>}
      {usr.usr_level==='0' && <Link to='/exph' className='btn'>Expense Head</Link>}
      <Link to='/siteall' className='btn'>Site Allocation</Link>
      <Link to='/expapp' className='btn' onClick={()=>alllist()}>Expense Approval</Link>
      <Link to='/report' className='btn' onClick={()=>alllist()}>Report</Link>
    </div>
  )
}

export default Navbar
