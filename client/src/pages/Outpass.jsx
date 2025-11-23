import React, { useState } from 'react'
import '../App.css'

const Outpass = () => {
    const option = ['Admission','Interview','Project Review','Meet Staff','Meet Student','Event','others']
    const [inpass,setInpass] =useState({
        name:'',
        phone:'',
        purpose:'',
        address:'',
        vechileNo:''
    })

    const {name,phone,purpose,address,vechileNo} = inpass
    //onchange :
    const onchange=(e)=>{
        setInpass({...inpass,[e.target.name]:e.target.value})
    }

    //onsubmit :
    const onsubmit =(e)=>{
        e.preventDefault()
        console.log(inpass)
        setInpass({
        name:'',
        phone:'',
        purpose:'',
        address:'',
        vechileNo:''
        })
    }


  return (
    <div className='body'>
        <h3 className='text-center mt-2' style={{fontWeight:'800'}}><span style={{color:'yellowgreen'}}>Out-</span>pass</h3>
        <p className='text-center text-muted'>Track visitors Entry by Out-pass</p>
      <form onSubmit={onsubmit} className="form" >
        <div className="form-group" >
            <label style={{fontWeight:'700',margin:'9px'}} className='form-label' htmlFor="name">Enter Visitor's Name</label>
            <input placeholder='Surya' onChange={onchange} className='form-control' type="text" name='name' id='name' value={name} />
        </div>
        <div className="form-group">
            <label style={{fontWeight:'700',margin:'5px'}} className='form-label' htmlFor="phone">Enter Visitor's Phone</label>
            <input placeholder='+91 0967542109' onChange={onchange} className='form-control' type="phone" name='phone' id='phone' value={phone} />
        </div>
        <div className="form-group">
            <label style={{fontWeight:'700',margin:'5px'}} className='form-label' htmlFor="address">Enter Visitor's Address</label>
            <textarea placeholder='Chennai-60028,Tamilnadu' onChange={onchange} className='form-control' type="text" name='address' id='address' value={address} />
        </div>
        <div className="form-group">
            <label style={{fontWeight:'700',margin:'5px'}} className='form-label' htmlFor="name">Enter Visiting Purpose</label>
            <select onChange={onchange} className='form-select' type="text" name='purpose' id='name' value={purpose}>
                <option value="">Select Purpose</option>
                {option.map((data,index)=><>
                <option key={index} value={data}>{data}</option>
                </>)}
            </select>
        </div>
        <div className="form-group">
            <label style={{fontWeight:'700',margin:'5px'}} className='form-label' htmlFor="vechileNo">Enter Visitor's Vechile Number</label>
            <input placeholder='TN38 BB1234' onChange={onchange} className='form-control' type="text" name='vechileNo' id='vechileNo' value={vechileNo} />
        </div>
        <div className="text-center mt-2" >
            <button className='btn' type='submit' style={{background:'yellowgreen',width:'100%',fontWeight:'500'}}>Submit</button>
        </div>
      </form>
    </div>
  )
}

export default Outpass
