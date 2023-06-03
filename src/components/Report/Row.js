import { collection, onSnapshot, query, where } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { db } from '../../firebaseConfig';

const Row = ({data}) => {

  const [name, setname]=useState(null);

  useEffect(()=>{
    const q=query(collection(db, 'UserMaster'), where('usr_id', '==', data.exp_usr));
    onSnapshot(q, (querySnapshot)=>{
      const arr=[];
      querySnapshot.forEach((doc)=>{
        arr.push({...doc.data(), id:doc.id});
      });
      setname(arr[0].usr_name);
    })
  }, [data])

  return (
    <div className='header-row'>
        <div className='header-cell'>{data.exp_site}</div>
        <div className='header-cell'>{data.exp_com}</div>
        <div className='header-cell'>{name?name:data.exp_usr}</div>
        <div className='header-cell'>{data.exp_desc}</div>
        <div className='header-cell' style={{maxWidth:"160px"}}>{data.exp_amt}</div>
        <div className='header-cell' style={{maxWidth:"80px"}}>{data.exp_status}</div>
    </div>
  )
}

export default Row
