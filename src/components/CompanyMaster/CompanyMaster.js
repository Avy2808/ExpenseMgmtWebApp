import { addDoc, collection, deleteDoc, doc, onSnapshot, query, updateDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { db } from '../../firebaseConfig';
import Table from './Table';
import Companies from './Companies';

const CompanyMaster = () => {
  const [list, setlist]=useState([]);
  const [add, setadd]=useState('');
  const [cont, setcont]=useState('');
  const [name, setname]=useState('');
  const [pin, setpin]=useState('');
  const [active, setactive]=useState('True');
  const [email, setemail]=useState('');
  const [id, setid]=useState('');

  const deleteEntry=async(id)=>{
    await deleteDoc(doc(db, 'CompanyMaster', id))
  }

  const handleClick=async()=>{
    if(name==='' || add==='' || cont==='' || pin==='' || email===''){
        alert("Enter values in all the fields");
        return;
    }
    if(id===''){
      await addDoc(collection(db, 'CompanyMaster'), {
        com_name:name,
        com_active:(active==='True')?true:false,
        com_add:add,
        com_contact:cont,
        com_by:'+918792942504',
        com_pin:pin,
        com_mail:email
      })
    }
    else{
      await updateDoc(doc(db, 'CompanyMaster', id), {
        com_name:name,
        com_active:(active==='True')?true:false,
        com_add:add,
        com_contact:cont,
        com_by:'+918792942504',
        com_pin:pin,
        com_mail:email
    })
    }
    setid('');
    setname('');
    setadd('');
    setcont('');
    setpin('');
    setactive('True');
    setemail('');
}

  useEffect(()=>{
    const q=query(collection(db, 'CompanyMaster'));
    const unsubscribe=onSnapshot(q, (querySnapshot)=>{
      const arr=[];
      querySnapshot.forEach((doc)=>{
        // console.log(doc.data());
        arr.push({...doc.data(), id:doc.id});
      });
      setlist(arr);
      // console.log(list.length);
      // console.log(arr.length);
    })
    return ()=>unsubscribe()
  }, [])

  return (
    <div className='user-master'>
        <div className='table'>
            <Table name={name} setname={setname} add={add} setadd={setadd} cont={cont} setcont={setcont} active={active} setactive={setactive} pin={pin} setpin={setpin} email={email} setemail={setemail} handleClick={handleClick} setid={setid} />
        </div>
        <div className='request-wrapper' style={{marginTop: '30px'}}>
            <div className='header-row'>
              <div className='header-cell headi'>Company Name</div>
              <div className='header-cell headi'>Company Email</div>
              <div className='header-cell headi'>Company Contact</div>
              <div className='header-cell headi'>Company Active</div>
              <div className='header-cell headi' style={{maxWidth:"68px"}} >Modify</div>
              <div className='header-cell headi' style={{maxWidth:"68px"}} >Delete</div>
          </div>
            {list.map((data, index)=>{
              return <Companies data={data} deleteEntry={deleteEntry} id={data.id} setname={setname} setcont={setcont} setadd={setadd} setpin={setpin} setactive={setactive} setemail={setemail} setid={setid} />
            })}
        </div>
    </div>
  )
}

export default CompanyMaster;
