import React, { useContext } from 'react';
import "./Profile.css";
import Man from "../../assets/man.png" 
import { data } from '../../App';

const Profile = () => {

  const {user}=useContext(data);

  const logout=()=>{
    window.localStorage.removeItem('isLoggedIn');
    window.localStorage.removeItem('User');
    window.location.reload(false)
  }

  return (
      <div className='request-wrapper container'>
        <div className='inner-container'>
          <div className='heading'>Welcome</div>
          <img src={Man} className='img' alt='profile icon'></img>
          <div className='uinfo'>Name : {user.usr_name}</div>
          <div className='uinfo'>ID : {user.usr_id}</div>
          <div className='uinfo'>Authority Level : {user.usr_level}</div>
          <div className='logout' onClick={()=>logout()}>Logout</div>
        </div>
      </div>
  )
}

export default Profile
