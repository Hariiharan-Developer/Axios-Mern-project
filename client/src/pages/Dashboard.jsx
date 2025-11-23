import React, { useState } from 'react'
import '../App.css'

const Dashboard = () => {
  const [user,setUser] =useState({
    email:'',
    password:''
  })
  const {email,password} =user

  //onchange :
  const onchange =(e)=>{
    setUser({...user,[e.target.name]:e.target.value})
  }

  //onsubmit :
  const onsubmit =(e)=>{
    e.preventDefault()
    console.log(user)
    setUser({
      email:'',
      password:''
    })
  }
  return (
    <div className='body'>
      <h3 className='text-center mt-3'>Welcome Back Login here !..</h3>
      <p className='text-center mt-3'>Every day visitors visiting record are maintained </p>
      <form onSubmit ={onsubmit}className='form container   mt-5' style={{boxShadow:'5px 7px 9px rgba(0,0,0,0.6)',borderRadius:'6px',width:'50%',padding:'30px'}}>
        <h3 style={{ fontWeight:'800',color:'yellowgreen'}} className='text-center mt-3'>Login</h3>
        <div className='text-center'>
          <label className='mt-2 form-label' style={{fontWeight:'700'}} htmlFor="email">Enter E-mail</label>
          <input placeholder='suya@gmail.com' className='form-control' onChange={onchange} style={{width:'100%'}} type="text" name='email' id='email' value={email}/>
        </div>
        <div className='text-center'>
          <label className='mt-2 form-label' style={{fontWeight:'700'}} htmlFor="password">Enter Password</label>
          <input placeholder='password' className='form-control' onChange={onchange} style={{width:'100%'}} type="password" name='password' id='password' value={password}/>
        </div>
        <div  className='text-center mt-2'>
          <button type='submit' className='btn btn-large ' style={{backgroundColor:'yellowgreen'}}>Submit</button>
        </div>
      </form>
      
      
    </div>
  )
}

export default Dashboard
