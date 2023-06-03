import { Timestamp, collection, onSnapshot, query, where } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { db } from '../../firebaseConfig';
import Select from 'react-select';

const Filter = ({list, setlists, alllist}) => {

    const [userlist, setuserlist]=useState([]);
    const [sitelist, setsitelist]=useState([]);
    const [site, setsite]=useState({value:'None', label:'None'});
    const [name, setname]=useState({value:'None', label:'None'});
    const [startdate, setstartdate]=useState('');
    const [enddate, setenddate]=useState('');
    const [id, setid]=useState('id');

    useEffect(()=>{
        const q=query(collection(db, 'UserMaster'));
        onSnapshot(q, (querySnapshot)=>{
            const arr=[{value:'None', label:'None'}];
            querySnapshot.forEach((doc)=>{
                arr.push({value:doc.data().usr_name, label:doc.data().usr_name});
            });
            setuserlist(arr);
        })
        const q1=query(collection(db, 'SiteMaster'));
        onSnapshot(q1, (querySnapshot)=>{
            const arr=[{value:'None', label:'None'}];
            querySnapshot.forEach((doc)=>{
                arr.push({value:doc.data().site_name, label:doc.data().site_name});
            });
            setsitelist(arr);
        })
    })

    

    const filter=()=>{
        // console.log(site.value);
        // console.log(name.value);
        // console.log(startdate);
        // console.log(enddate);
        const q=setquery();
        onSnapshot(q, (querySnapshot)=>{
            const arr=[];
            querySnapshot.forEach((doc)=>{
                arr.push({...doc.data(), id:doc.id});
            });
            setlists(arr);
        })
    }

    const setquery=()=>{
        console.log(name.value);
        console.log(id);
        if(name.value==='None' && site.value==='None' && startdate==='' && enddate===''){
            return query(collection(db, 'SiteExpense'));
        }
        if(name.value==='None'){
            if(site.value==='None'){
                if(startdate===''){
                    if(enddate===''){
                        return query(collection(db, 'SiteExpense'));
                    }
                    else{
                        const time1=Timestamp.fromMillis(Date.parse(enddate));
                        return query(collection(db, 'SiteExpense'), where('exp_date1', '<=', time1));
                    }
                }
                else{
                    const time2=Timestamp.fromMillis(Date.parse(startdate));
                    if(enddate===''){
                        return query(collection(db, 'SiteExpense'), where('exp_date1', '>=', time2));
                    }
                    else{
                        const time1=Timestamp.fromMillis(Date.parse(enddate));
                        return query(collection(db, 'SiteExpense'), where('exp_date1', '<=', time1), where('exp_date1', '>=', time2));
                    }
                }
            }
            else{
                if(startdate===''){
                    if(enddate===''){
                        return query(collection(db, 'SiteExpense'), where('exp_site', '==', site.value));
                    }
                    else{
                        const time1=Timestamp.fromMillis(Date.parse(enddate));
                        return query(collection(db, 'SiteExpense'), where('exp_date1', '<=', time1), where('exp_site', '==', site.value));
                    }
                }
                else{
                    const time2=Timestamp.fromMillis(Date.parse(startdate));
                    if(enddate===''){
                        return query(collection(db, 'SiteExpense'), where('exp_date1', '>=', time2), where('exp_site', '==', site.value));
                    }
                    else{
                        const time1=Timestamp.fromMillis(Date.parse(enddate));
                        return query(collection(db, 'SiteExpense'), where('exp_date1', '<=', time1), where('exp_date1', '>=', time2), where('exp_site', '==', site.value));
                    }
                }
            }
        }
        else{
            if(site.value==='None'){
                if(startdate===''){
                    if(enddate===''){
                        return query(collection(db, 'SiteExpense'), where('exp_usr', '==', id));
                    }
                    else{
                        const time1=Timestamp.fromMillis(Date.parse(enddate));
                        return query(collection(db, 'SiteExpense'), where('exp_usr', '==', id), where('exp_date1', '==', time1));
                    }
                }
                else{
                    const time2=Timestamp.fromMillis(Date.parse(startdate));
                    if(enddate===''){
                        return query(collection(db, 'SiteExpense'), where('exp_usr', '==', id), where('exp_date1', '>=', time2));
                    }
                    else{
                        const time1=Timestamp.fromMillis(Date.parse(enddate));
                        return query(collection(db, 'SiteExpense'), where('exp_usr', '==', id), where('exp_date1', '<=', time1), where('exp_date1', '>=', time2));
                    }
                }
            }
            else{
                if(startdate===''){
                    if(enddate===''){
                        return query(collection(db, 'SiteExpense'), where('exp_usr', '==', id), where('exp_site', '==', site.value));
                    }
                    else{
                        const time1=Timestamp.fromMillis(Date.parse(enddate));
                        return query(collection(db, 'SiteExpense'), where('exp_usr', '==', id), where('exp_date1', '==', time1), where('exp_site', '==', site.value));
                    }
                }
                else{
                    const time2=Timestamp.fromMillis(Date.parse(startdate));
                    if(enddate===''){
                        return query(collection(db, 'SiteExpense'), where('exp_usr', '==', id), where('exp_date1', '>=', time2), where('exp_site', '==', site.value));
                    }
                    else{
                        const time1=Timestamp.fromMillis(Date.parse(enddate));
                        return query(collection(db, 'SiteExpense'), where('exp_usr', '==', id), where('exp_date1', '<=', time1), where('exp_date1', '>=', time2), where('exp_site', '==', site.value));
                    }
                }

            }
        }
    }

    const reset=async()=>{
        setname({value:'None', label:'None'});
        setsite({value:'None', label:'None'});
        setstartdate('');
        setenddate('');
        setid('id');
        setlists(list);
    }

    const nameChange=(e)=>{
        setname(e);
        console.log(e.value);
        const q=query(collection(db, 'UserMaster'), where('usr_name', '==', e.value));
        const unsubscribe=onSnapshot(q, (querySnapshot)=>{
            const arr=[];
            querySnapshot.forEach((doc)=>{
              arr.push({...doc.data(), id:doc.id});
            });
            console.log(arr);
            if(arr.length){
                setid(arr[0].usr_id);
            }
          })
          return ()=>unsubscribe()
    }

  return (
    <div className='request-wrapper'>
        <div className='header-row'>
            <div className='header-cell headi'>Site</div>
            <div className='header-cell headi'>User</div>
            <div className='header-cell headi'>Date</div>
        </div>
        <div className='header-row'>
            <Select options={sitelist} className='select-cell' value={site} onChange={(e)=>setsite(e)} />
            <Select options={userlist} className='select-cell' value={name} onChange={(e)=>nameChange(e)} />
            <div className='header-cell headi date'>
                <input type='date' className='header-cell' style={{backgroundColor:'white'}} placeholder='From' value={startdate} onChange={(e)=>setstartdate(e.target.value)}/>
                <input type='date' className='header-cell' style={{backgroundColor:'white'}} placeholder='To' value={enddate} onChange={(e)=>setenddate(e.target.value)}/>
            </div>
        </div>
        <div className='header-row'>
            <div className='header-cell headi add-btn' style={{background:"green", color:"white"}} onClick={filter}>Filter</div>
            <div className='header-cell headi add-btn' style={{background:"red", color:"white"}} onClick={reset}>Reset</div>
        </div>
    </div>
  )
}

export default Filter
