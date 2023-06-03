import React, { useContext, useRef, useState } from 'react'
import Filter from './Filter'
import Row from './Row';
import { data } from '../../App';
import { useReactToPrint } from 'react-to-print';

const Report = () => {

    const {list, alllist}=useContext(data);
    const componentRef=useRef();

    const [lists, setlists]=useState(list);

    const generatePDF=useReactToPrint({
        content: ()=>componentRef.current,
        documentTitle: 'ExpenseData',
        onAfterPrint: ()=>alert('PDF Generated Successfully')
    });

    return (
        <div>
            <Filter list={list} lists={lists} setlists={setlists} alllist={alllist}/>
            <div ref={componentRef} style={{width:'100%'}}>
                <div className='request-wrapper' style={{marginTop:0}}>
                    <div className='header-row'>
                        <div className='header-cell headi'>Site</div>
                        <div className='header-cell headi'>Company</div>
                        <div className='header-cell headi'>User Name</div>
                        <div className='header-cell headi'>Description</div>
                        <div className='header-cell headi' style={{maxWidth:"160px"}}>Amount</div>
                        <div className='header-cell headi' style={{maxWidth:"80px"}}>Status</div>
                    </div>
                    {lists?.map((data)=>{
                        return <Row data={data}/>
                    })}
                </div>
            </div>
            <div className='request-wrapper' style={{marginTop:0, paddingTop:'0.75rem'}}>
                <div className='add-btn' onClick={generatePDF}>Generate Report</div>
            </div>
        </div>
    )
}

export default Report
