import { addDoc, collection, deleteDoc, doc, onSnapshot, query, updateDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { db } from '../../firebaseConfig';
import Expense from './Expense';
import Table from './Table';

const ExpenseHead = () => {
  const [list, setlist]=useState([]);
  const [userid, setuserid]=useState('');
  const [exname, setexname]=useState('');
  const [exsub, setexsub]=useState('');
  const [active, setactive]=useState('True');
  const [id, setid]=useState('');

  const deleteEntry=async(id)=>{
    await deleteDoc(doc(db, 'ExpenseHead', id))
  }

  const handleClick=async()=>{
    console.log("Hello");
    if(userid==='' || exname===''){
      alert("Enter values in all the fields");
      return;
    }
    if(id===''){
      await addDoc(collection(db, 'ExpenseHead'), {
        ex_code:userid,
        ex_name:exname,
        ex_active:(active==='True')?true:false,
        ex_sub:exsub,
        ex_date:new Date(),
        ex_by:'+918792942504'
    })
    }
    else{
      await updateDoc(doc(db, 'ExpenseHead', id), {
        ex_code:userid,
        ex_name:exname,
        ex_active:(active==='True')?true:false,
        ex_sub:exsub,
        ex_date:new Date(),
        ex_by:'+918792942504'
      })
      console.log(id);
    }
    setid('');
    setuserid('');
    setexname('');
    setexsub('');
    setactive('True');
  }

  useEffect(()=>{
    const q=query(collection(db, 'ExpenseHead'));
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
    <>
    <div className='user-master'>
        <div className='table'>
            <Table userid={userid} setuserid={setuserid} exname={exname} setexname={setexname} exsub={exsub} setexsub={setexsub} active={active} setactive={setactive} handleClick={handleClick} setid={setid} />
        </div>
        <div className='request-wrapper' style={{marginTop:"36px"}}>
          <div className='header-row'>
              <div className='header-cell headi'>Expense Name</div>
              <div className='header-cell headi'>Expense Code</div>
              <div className='header-cell headi'>Expense Sub-Code</div>
              <div className='header-cell headi'>Expense Active</div>
              <div className='header-cell headi' style={{maxWidth:"68px"}} >Modify</div>
              <div className='header-cell headi' style={{maxWidth:"68px"}} >Delete</div>
          </div>
              {list.map((data, index)=>{
                return <Expense data={data} deleteEntry={deleteEntry} id={data.id} setuserid={setuserid} setexname={setexname} setexsub={setexsub} setactive={setactive} setid={setid} />
              })}
        </div>
    </div>
    </>
  )
}

export default ExpenseHead
