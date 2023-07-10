import React, { useContext, useState } from 'react'
import "./ExpenseApproval.css";
import Request from './Request';
import { doc, updateDoc} from "firebase/firestore";
import {db} from "../../firebaseConfig";
import { data } from '../../App';
import Filter from '../Report/Filter';
import Modal from './Modal';
import { storage} from "../../firebaseConfig";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

const ExpenseApproval = () => {

    const {user, list, lists, setlists, alllist}=useContext(data);

    const [showmodal, setshowmodal]=useState(false);

    const [acc, setacc]=useState([]);
    const [rej, setrej]=useState([]);

    const [total, settotal]=useState(0);

    const handleClick=async()=>{
      var datas=[];
      setshowmodal(false);
      console.log(acc);
      console.log(rej);
      for(let i=0;i<acc.length;i++) {
          const element1=acc[i];
          let flag=true;
          for(let j=0;j<rej.length;j++) {
              const element2=rej[j];
              if(element1===element2){
                  flag=false;
                  break;
              }
          }
          if(!flag)continue;
          if(user.usr_level==='3'){
              await updateDoc(doc(db, 'SiteExpense', element1), {
                  exp_approved:true,
                  exp_apr_date: new Date(),
                  exp_rejected:false,
                  exp_rej_date:null,
                  exp_by3:user.usr_id,
                  exp_date3: new Date(),
                  exp_status:3
              })
              datas.push({
                  id:element1,
                  exp_approved:true,
                  exp_apr_date: new Date(),
                  exp_rejected:false,
                  exp_rej_date:null,
                  exp_by3:user.usr_id,
                  exp_date3: new Date(),
                  exp_status:3
              })
          }
          else{
              await updateDoc(doc(db, 'SiteExpense', element1), {
                  exp_approved:true,
                  exp_apr_date: new Date(),
                  exp_rejected:false,
                  exp_rej_date:null,
                  exp_by2:user.usr_id,
                  exp_date2: new Date(),
                  exp_status:2
              })
              datas.push({
                id:element1,
                exp_approved:true,
                exp_apr_date: new Date(),
                exp_rejected:false,
                exp_rej_date:null,
                exp_by2:user.usr_id,
                exp_date2: new Date(),
                exp_status:2
            })
          }
      }

      for (let i=0;i<rej.length;i++) {
          const element1=rej[i];
          let flag=true;
          for (let j=0;j<acc.length;j++) {
              const element2=acc[j];
              if(element1===element2){
                  flag=false;
                  break;
              }
          }
          if(!flag)continue;
          if(user.usr_level==='3'){
              await updateDoc(doc(db, 'SiteExpense', element1), {
                  exp_rejected:true,
                  exp_rej_date: new Date(),
                  exp_approved:false,
                  exp_app_date:null,
                  exp_by3:user.usr_id,
                  exp_date3: new Date(),
              })
              datas.push({
                id:element1,
                exp_rejected:true,
                exp_rej_date: new Date(),
                exp_approved:false,
                exp_app_date:null,
                exp_by3:user.usr_id,
                exp_date3: new Date()
            })
        }
        else{
            await updateDoc(doc(db, 'SiteExpense', element1), {
                exp_rejected:true,
                exp_rej_date: new Date(),
                exp_approved:false,
                exp_app_date:null,
                exp_by2:user.usr_id,
                exp_date2: new Date()
            })
            datas.push({
              id:element1,
              exp_rejected:true,
                exp_rej_date: new Date(),
                exp_approved:false,
                exp_app_date:null,
                exp_by2:user.usr_id,
                exp_date2: new Date()
          })
        }
      }
      const filedata=JSON.stringify(datas);
      const blob=new Blob([filedata], {type:'text/plain;charset=utf-8'});
    //   const url=URL.createObjectURL(blob);
    //   const link=document.createElement('a');
    //   link.download='NewDocument.txt';
    //   link.href=url;
        const storageRef = ref(storage, 'TextFiles/' + Date.now());
        const uploadTask = uploadBytesResumable(storageRef, blob);

        // Listen for state changes, errors, and completion of the upload.
        uploadTask.on('state_changed',
        (snapshot) => {
            // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log('Upload is ' + progress + '% done');
            switch (snapshot.state) {
            case 'paused':
                console.log('Upload is paused');
                break;
            case 'running':
                console.log('Upload is running');
                break;
            default :
                break;
            }
        }, 
        (error) => {
            // A full list of error codes is available at
            // https://firebase.google.com/docs/storage/web/handle-errors
            switch (error.code) {
            case 'storage/unauthorized':
                // User doesn't have permission to access the object
                break;
            case 'storage/canceled':
                // User canceled the upload
                break;

            // ...

            case 'storage/unknown':
                // Unknown error occurred, inspect error.serverResponse
                break;
            default :
                break;
            }
        }, 
        () => {
            // Upload completed successfully, now we can get the download URL
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                console.log('File available at', downloadURL);
            });
        }
        );

  }
    
    return (
      <>
      <Filter list={list} lists={lists} setlists={setlists} alllist={alllist}/>
      <div className='request-wrapper' style={{marginTop:"50px"}}>
        <div className='header-row'>
            <div className='header-cell headi'>User Name</div>
            <div className='header-cell headi'>Description</div>
            <div className='header-cell headi' style={{maxWidth:"160px"}}>Amount</div>
            <div className='header-cell headi' style={{maxWidth:"80px"}}>GST</div>
            <div className='header-cell headi'>Link</div>
            <div className='header-cell headi' style={{maxWidth:"160px"}}>Approve/Reject</div>
            <div className='header-cell headi'>Reason for Rejection</div>
        </div>
        {lists.map((data)=>{
          return <Request datai={data} id={data.id} showmodal={showmodal} acc={acc} rej={rej} total={total} settotal={settotal} setacc={setacc} setrej={setrej} />
        })}
      </div>
      <div className='request-wrapper amt' style={{marginTop:0, paddingTop:"8px"}}>
        <div className='header-cell headi' style={{marginTop:"16px"}}>Total Approved Cost: {total}</div>
        <div className='header-row btn-container'>
            <div className='add-btn' style={{background:"green", color:"white"}} onClick={()=>setshowmodal(true)}>Submit</div>
            <div className='add-btn' style={{background:"red", color:"white"}}>Cancel</div>
        </div>
      </div>
      {showmodal && <Modal setshowmodal={setshowmodal} handleClick={handleClick}/>}
      </>
    )

}

export default ExpenseApproval;
