import React, { useEffect } from 'react';
import "../Modal.css";

const Modal = ({handleClick, setshowmodal}) => {

    useEffect(()=>{
        document.body.style.overflowY='hidden';
        return ()=>{
            document.body.style.overflowY='scroll';
        };
    }, []);

  return (
    <div>
        <div className='modal-wrapper' onClick={()=>setshowmodal(false)}></div>
        <div className='modal-container'>
            <h3 className='head'>Warning</h3>
            <p className='para'>This record will be deleted permanently</p>
            <div>
                <button className='okay-btn' onClick={()=>handleClick()}>Okay</button>
                <button className='cancel-btn' onClick={()=>setshowmodal(false)}>Cancel</button>
            </div>
        </div>
    </div>
  )
}

export default Modal;
