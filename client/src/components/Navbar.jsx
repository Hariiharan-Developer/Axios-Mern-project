import React from 'react'
import {Link}from 'react-router-dom'

const Navbar = () => {
  return (
    <div>
      <div className="navbar navbar-expand-lg navbar-light bg-dark">
        <div className='collapse navbar-collapse'>
        <h2 className='navbar-brand text-light' style={{fontWeight:'700'}}><span style={{color:'yellowgreen'}}>
         University  </span> Main-Gate </h2>
        <ol className="navbar-nav ms-auto">
            <li className='nav-item'>
                <Link className='nav-link' to='/'><button className='btn  btn-sm' style={{background:'yellowgreen'}}>Home</button></Link>
            </li>
            <li className='nav-item'>
                <Link className='nav-link' to='/record'><button className='btn  btn-sm' style={{background:'yellowgreen'}}>Track-Visitor</button></Link>
            </li>
            <li className='nav-item'>
                <Link className='nav-link' to='/inpass'><button className='btn  btn-sm' style={{background:'yellowgreen'}}>In-pass</button></Link>
            </li>
            
        </ol>
      </div>
      </div>
    </div>
  )
}

export default Navbar
