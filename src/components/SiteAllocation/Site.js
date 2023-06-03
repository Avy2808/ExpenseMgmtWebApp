import React, { useEffect, useState } from 'react'
import Modal from '../Modal';
import { collection, onSnapshot, query, where } from 'firebase/firestore';
import { db } from '../../firebaseConfig';

const Site = ({data, deleteEntry, id, setuserid, setalcsite, setactive, setid}) => {

    const [showmodal, setshowmodal]=useState(false);
    const [namelist, setnamelist]=useState('');

    useEffect(()=>{
      const q=query(collection(db, 'UserMaster'), where('usr_id', '==', data.alc_user));
      const unsubscribe=onSnapshot(q, (querySnapshot)=>{
        const arr=[];
        querySnapshot.forEach((doc)=>{
          arr.push({...doc.data(), id:doc.id});
        });
        setnamelist(arr);
      })
      return ()=>unsubscribe()
    }, [data])

    const modifyEntry=()=>{
        setid(id);
        setuserid(data.alc_user);
        setalcsite(data.alc_site);
        setactive(data.alc_active?'True':'False');
    }

    const handleClick=()=>{
        deleteEntry(id);
        setshowmodal(false);
    }

    return (
        <>
        <div className='header-row'>
        <div type='text' className='header-cell'>{data.alc_site}</div>
        <div type='text' className='header-cell'>{namelist.length?namelist[0].usr_name:data.alc_user}</div>
        <div type='text' className='header-cell'>{data.alc_active?'Yes':'No'}</div>
        <div type='text' className='header-cell approved' style={{minWidth:"80px", maxWidth:"80px"}} onClick={()=>modifyEntry()}>Modify</div>
        <div type='text' className='header-cell reject' style={{minWidth:"80px", maxWidth:"80px"}} onClick={()=>setshowmodal(true)} >Delete</div>
      </div>
      {showmodal && <Modal handleClick={handleClick} setshowmodal={setshowmodal}/>}
        </>
    )
}

export default Site
