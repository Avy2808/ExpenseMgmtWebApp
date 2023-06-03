import { Timestamp, collection, onSnapshot, query, where } from 'firebase/firestore';
import React, { useState } from 'react'
import { db } from '../../firebaseConfig';

const Filter = ({user, setlist, alllist}) => {

    const [site, setsite]=useState('');
    const [usr, setusr]=useState('');
    const [startdate, setstartdate]=useState('');
    const [enddate, setenddate]=useState('');

    const reset=()=>{
        setusr('');
        setsite('');
        setstartdate('');
        setenddate('');
        alllist();
    }

    const dateFilter=async()=>{
        var a='';
        const time1=Timestamp.fromMillis(Date.parse(startdate));
        const time2=Timestamp.fromMillis(Date.parse(enddate));
        if(user.usr_level==='0' || user.usr_level==='2'){
          a=query(collection(db, 'SiteExpense'), where('exp_date', '>=', time1), where('exp_date', '<=', time2));
        }
        else{
          a=query(collection(db, 'SiteExpense'), where('exp_date2', '!=', null), where('exp_date', '>=', time1), where('exp_date', '<=', time2));
        }
        const q=a;
        const unsubscribe=onSnapshot(q, (querySnapshot)=>{
          const arr=[];
          querySnapshot.forEach((doc)=>{
            arr.push({...doc.data(), id:doc.id});
          });
          setlist(arr);
        })
        return ()=>unsubscribe()
    }

    const siteFilter=async()=>{
        var a='';
        if(user.usr_level==='0' || user.usr_level==='2'){
          a=query(collection(db, 'SiteExpense'), where('exp_site', '==', site));
        }
        else{
          a=query(collection(db, 'SiteExpense'), where('exp_date2', '!=', null), where('exp_site', '==', site));
        }
        const q=a;
        const unsubscribe=onSnapshot(q, (querySnapshot)=>{
          const arr=[];
          querySnapshot.forEach((doc)=>{
            arr.push({...doc.data(), id:doc.id});
          });
          setlist(arr);
        })
        return ()=>unsubscribe()
    }

    const userFilter=async()=>{
        var a='';
        if(user.usr_level==='0' || user.usr_level==='2'){
          a=query(collection(db, 'SiteExpense'), where('exp_usr', '==', usr));
        }
        else{
          a=query(collection(db, 'SiteExpense'), where('exp_date2', '!=', null), where('exp_usr', '==', usr));
        }
        const q=a;
        const unsubscribe=onSnapshot(q, (querySnapshot)=>{
          const arr=[];
          querySnapshot.forEach((doc)=>{
            arr.push({...doc.data(), id:doc.id});
          });
          setlist(arr);
        })
        return ()=>unsubscribe()
      }

  return (
    <div className='request-wrapper' style={{marginBottom:0}}>
        <div className='header-row'>
            <div className='header-cell headi'>Date</div>
            <div className='header-cell headi'>Site</div>
            <div className='header-cell headi'>User</div>
        </div>
        <div className='header-row'>
            <div className='header-cell headi date'>
                <input type='date' className='header-cell' placeholder='From' onChange={(e)=>setstartdate(e.target.value)} value={startdate}/>
                <input type='date' className='header-cell' placeholder='To' onChange={(e)=>setenddate(e.target.value)} value={enddate}/>
            </div>
            <input type='text' className='header-cell' value={site} onChange={(e)=>setsite(e.target.value)} />
            <input type='text' className='header-cell' value={usr} onChange={(e)=>setusr(e.target.value)} />
        </div>
        <div className='header-row'>
            <div className='header-cell headi add-btn' style={{background:"green", color:"white"}} onClick={()=>dateFilter()}>Filter</div>
            <div className='header-cell headi add-btn' style={{background:"red", color:"white"}} onClick={()=>reset()}>Reset</div>
            <div className='header-cell headi add-btn' style={{background:"green", color:"white"}} onClick={()=>siteFilter()}>Filter</div>
            <div className='header-cell headi add-btn' style={{background:"red", color:"white"}} onClick={()=>reset()}>Reset</div>
            <div className='header-cell headi add-btn' style={{background:"green", color:"white"}} onClick={()=>userFilter()}>Filter</div>
            <div className='header-cell headi add-btn' style={{background:"red", color:"white"}} onClick={()=>reset()}>Reset</div>
        </div>
    </div>
  )
}

export default Filter
