import { addDoc, collection, deleteDoc, doc, onSnapshot, query, updateDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { db } from '../../firebaseConfig';
import Site from './Site';
import Table from './Table';

const SiteAllocation = () => {

  const [list, setlist]=useState([]);
  const [userid, setuserid]=useState('');
  const [alcsite, setalcsite]=useState('');
  const [active, setactive]=useState('True');
  const [id, setid]=useState('');

  const deleteEntry=async(id)=>{
    await deleteDoc(doc(db, 'SiteAllocate', id))
  }

  const handleClick=async()=>{
    console.log("Hello");
    if(userid==='' || alcsite===''){
      alert("Enter values in all the fields");
      return;
  }
    if(id===''){
      await addDoc(collection(db, 'SiteAllocate'), {
        alc_user:userid,
        alc_site:alcsite,
        alc_active:(active==='True')?true:false,
        alc_date:new Date(),
        alc_by:'+918792942504'
    })
    }
    else{
      await updateDoc(doc(db, 'SiteAllocate', id), {
        alc_user:userid,
        alc_site:alcsite,
        alc_active:(active==='True')?true:false,
        alc_date:new Date(),
        alc_by:'+918792942504'
      })
      console.log(id);
    }
    setid('');
    setuserid('');
    setalcsite('');
    setactive('True');
  }

  useEffect(()=>{
    const q=query(collection(db, 'SiteAllocate'));
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
            <Table userid={userid} setuserid={setuserid} alcsite={alcsite} setalcsite={setalcsite} active={active} setactive={setactive} handleClick={handleClick} setid={setid} />
        </div>
        <div className='request-wrapper' style={{marginTop: '30px'}} >
        <div className='header-row'>
            <div className='header-cell headi'>Site Name</div>
            <div className='header-cell headi'>User Name</div>
            <div className='header-cell headi'>User Active</div>
            <div className='header-cell headi' style={{minWidth:"80px", maxWidth:"80px"}} >Modify</div>
            <div className='header-cell headi' style={{minWidth:"80px", maxWidth:"80px"}} >Delete</div>
        </div>
            {list.map((data, index)=>{
              return <Site data={data} deleteEntry={deleteEntry} id={data.id} setuserid={setuserid} setalcsite={setalcsite} setactive={setactive} setid={setid} />
            })}
        </div>
    </div>
  )
}

export default SiteAllocation
