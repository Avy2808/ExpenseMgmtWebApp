import React, { useEffect, useState } from 'react';
import "../../Modal.css";
import Doc from '../../assets/document.png';
import { collection, onSnapshot, query, where } from 'firebase/firestore';
import { db } from '../../firebaseConfig';


const Request = ({datai, id, acc, rej, total, settotal}) => {

    const [namelist, setnamelist]=useState('');
    useEffect(()=>{
      const q=query(collection(db, 'UserMaster'), where('usr_id', '==', datai.exp_usr));
      const unsubscribe=onSnapshot(q, (querySnapshot)=>{
        const arr=[];
        querySnapshot.forEach((doc)=>{
          arr.push({...doc.data(), id:doc.id});
        });
        setnamelist(arr);
      })
      return ()=>unsubscribe()
    }, [datai])

    const tempApp=async(e)=>{
      if(e.target.value==='Approve'){
        var index=acc.indexOf(id);
        if(index<=-1){
          settotal(total+parseInt(datai.exp_amt));
          acc.push(id);
        }
        var ind=rej.indexOf(id);
        if(ind>-1){
          rej.splice(id, 1);
        }
      }
      else if(e.target.value==='Reject'){
        var inde=acc.indexOf(id);
        if(inde>-1){
          settotal(total-parseInt(datai.exp_amt));
          acc.splice(id, 1);
        }
        var indr=rej.indexOf(id);
        if(indr<=-1){
          rej.push(id);
        }
      }
      else{
        var inda=acc.indexOf(id);
        if(inda>-1){
          settotal(total-parseInt(datai.exp_amt));
          acc.splice(id, 1);
        }
        var indre=rej.indexOf(id);
        if(indre>-1){
          rej.splice(id, 1);
        }
      }
    }

    // const tempReject=async(e)=>{
    //   if(e.target.value==='True'){
    //     var index=rej.indexOf(id);
    //     if(index<0){
    //       rej.push(id);
    //     }
    //     var ind=acc.indexOf(id);
    //     if(ind>-1){
    //       settotal(total-parseInt(datai.exp_amt));
    //       acc.splice(id, 1);
    //     }
    //   }
    //   else{
    //     var indi=rej.indexOf(id);
    //     if(indi>-1){
    //       rej.splice(id, 1);
    //     }
    //   }
    // }

    return (
      <>
      <div className='header-row'>
        <div type='text' className='header-cell'>{namelist.length?namelist[0].usr_name:datai.exp_usr}</div>
        <div type='text' className='header-cell'>{datai.exp_desc}</div>
        <div type='text' className='header-cell' style={{maxWidth:"160px"}}>{datai.exp_amt}</div>
        <div type='text' className='header-cell' style={{maxWidth:"80px"}}>{datai.exp_gst}</div>
        <div type='text' className='header-cell'>
          <a href={datai.exp_attach} style={{textDecoration:'none', color:'black', display:'flex', alignItems:'center', justifyContent:'center'}}>
            <img src={Doc} alt='doc img' style={{height:'16px', width:'16px'}}/>
            File Link
          </a>
        </div>
        {/* <select className='header-cell' style={{maxWidth:"80px", paddingRight:0}} onChange={(e)=>tempApprove(e)}>
            <option className='header-cell nothing' value='None'>None</option>
            <option className='header-cell nothing' value='True'>Yes</option>
            <option className='header-cell nothing' value='False'>No</option>
        </select> */}
        <select className='header-cell' style={{maxWidth:"160px", paddingRight:0}} onChange={(e)=>tempApp(e)}>
            <option className='header-cell nothing' value='None'>None</option>
            <option className='header-cell nothing' value='Approve'>Approve</option>
            <option className='header-cell nothing' value='Reject'>Reject</option>
        </select>
        <input type='text' className='header-cell'/>
      </div>
      {/* <div className='request'>
      <div className='ind' onClick={()=>setshowdetails(!showdetails)}>
        <p className='indi'>{datai.exp_desc}</p>
        <p>({datai.exp_usr})</p>
      </div>
      <div className='btns'>
          <div className='approved'onClick={()=>handleAccept()}>{approve?"Approved":"Approve"}</div>
          <div className='reject' onClick={()=>setshowmodal(true)} >{rejected?'Rejected':'Reject'}</div>
      </div>
      {showmodal && <Modal/>}
    </div>
    {showdetails && <Details data={datai} />} */}
    </>
    )
}

export default Request;
