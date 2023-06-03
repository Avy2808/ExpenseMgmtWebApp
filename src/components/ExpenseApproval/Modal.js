import React, { useEffect } from 'react'

const Modal = ({setshowmodal, handleClick}) => {

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
              <p className='para'>Are you sure you want to make these changes ?</p>
              <div>
                  <button className='okay-btn' onClick={()=>handleClick()}>Yes</button>
                  <button className='cancel-btn' onClick={()=>setshowmodal(false)}>No</button>
              </div>
          </div>
      </div>
    )
  }

export default Modal
