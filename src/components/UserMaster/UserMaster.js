import { addDoc, collection, deleteDoc, doc, onSnapshot, query, updateDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { db } from '../../firebaseConfig';
import User from './User';
import "./UserMaster.css";
import Table from './Table';

const UserMaster = () => {

    const [list, setlist]=useState([]);
    const [userid, setuserid]=useState('');
    const [username, setusername]=useState('');
    const [lvl, setlvl]=useState('');
    const [active, setactive]=useState('True');
    const [pwd, setpwd]=useState('');
    const [id, setid]=useState('');

    const deleteEntry=async(id)=>{
      await deleteDoc(doc(db, 'UserMaster', id))
    }

    const handleClick=async()=>{
      console.log("Hello");
      if(userid==='' || username==='' || lvl===''){
          alert("Enter values in all the fields");
          return;
      }
      if(id===''){
          await addDoc(collection(db, 'UserMaster'), {
            usr_id:userid,
            usr_pwd:pwd,
            usr_name:username,
            usr_level:lvl,
            usr_active:(active==='True')?true:false,
            usr_date:new Date(),
            usr_by:'+918792942504'
        })
      }
      else{
        await updateDoc(doc(db, 'UserMaster', id), {
            usr_id:userid,
            usr_pwd:pwd,
            usr_name:username,
            usr_level:lvl,
            usr_active:(active==='True')?true:false,
            usr_date:new Date(),
            usr_by:'+918792942504'
        })
        console.log(id);
      }
      setid('');
      setuserid('');
      setusername('');
      setlvl('');
      setactive('True');
      setpwd('');
  }

    useEffect(()=>{
      const q=query(collection(db, 'UserMaster'));
      const unsubscribe=onSnapshot(q, (querySnapshot)=>{
        const arr=[];
        querySnapshot.forEach((doc)=>{
          arr.push({...doc.data(), id:doc.id});
        });
        setlist(arr);
      })
      return ()=>unsubscribe()
    }, [])

  return (
    <div className='user-master'>
        <div className='table'>
            <Table userid={userid} setuserid={setuserid} username={username} setusername={setusername} lvl={lvl} setlvl={setlvl} active={active} setactive={setactive} pwd={pwd} setpwd={setpwd} handleClick={handleClick} setid={setid} />
        </div>
        <div className='request-wrapper' style={{marginTop: '30px'}} >
            <div className='header-row'>
              <div className='header-cell headi'>User Name</div>
              <div className='header-cell headi'>User ID</div>
              <div className='header-cell headi'>Access Level</div>
              <div className='header-cell headi'>User Active</div>
              <div className='header-cell headi' style={{maxWidth:"68px"}} >Modify</div>
              <div className='header-cell headi' style={{maxWidth:"68px"}} >Delete</div>
          </div>
            {list.map((data, index)=>{
              return <User data={data} deleteEntry={deleteEntry} id={data.id} setuserid={setuserid} setusername={setusername} setlvl={setlvl} setactive={setactive} setpwd={setpwd} handleClick={handleClick} setid={setid} />
            })}
        </div>
    </div>
  )
}

export default UserMaster
