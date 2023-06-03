import { addDoc, collection, deleteDoc, doc, onSnapshot, query, updateDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { db } from '../../firebaseConfig';
import Table from './Table';
import Sites from './Sites';

const SiteMaster = () => {
  const [list, setlist]=useState([]);
  const [cc, setcc]=useState('');
  const [com, setcom]=useState('');
  const [name, setname]=useState('');
  const [active, setactive]=useState('True');
  const [id, setid]=useState('');

  const deleteEntry=async(id)=>{
    await deleteDoc(doc(db, 'SiteMaster', id))
  }

  const handleClick=async()=>{
    console.log("Hello");
    if(name==='' || cc==='' || com===''){
        alert("Enter values in all the fields");
        return;
    }
    if(id===''){
      await addDoc(collection(db, 'SiteMaster'), {
        site_name:name,
        site_active:(active==='True')?true:false,
        site_cc:cc,
        site_com:com,
        site_date:new Date(),
        site_by:'+918792942504',
        site_start:new Date()
    })
    }
    else{
      await updateDoc(doc(db, 'SiteMaster', id), {
        site_name:name,
        site_active:(active==='True')?true:false,
        site_cc:cc,
        site_com:com,
        site_date:new Date(),
        site_by:'+918792942504',
        site_start:new Date()
      })
      console.log(id);
    }
    setid('');
    setname('');
    setcc('');
    setcom('');
    setactive('True');
}


  useEffect(()=>{
    const q=query(collection(db, 'SiteMaster'));
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
            <Table name={name} setname={setname} cc={cc} setcc={setcc} com={com} setcom={setcom} active={active} setactive={setactive} handleClick={handleClick} setid={setid} />
        </div>
        <div className='request-wrapper' style={{marginTop: '30px'}} >
            <div className='header-row'>
              <div className='header-cell headi'>Site Name</div>
              <div className='header-cell headi'>Site Company</div>
              <div className='header-cell headi'>Site CC</div>
              <div className='header-cell headi'>Site Active</div>
              <div className='header-cell headi' style={{maxWidth:"68px"}} >Modify</div>
              <div className='header-cell headi' style={{maxWidth:"68px"}} >Delete</div>
          </div>
            {list.map((data, index)=>{
              return <Sites data={data} deleteEntry={deleteEntry} id={data.id} setname={setname} setcom={setcom} setcc={setcc} setactive={setactive} setid={setid} />
            })}
        </div>
    </div>
  )
}

export default SiteMaster
