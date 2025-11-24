import React from 'react'
import '../App.css'
import { useFormik } from 'formik'
import { FaPaperPlane } from 'react-icons/fa'
import api from '../API/axios'
import { toast } from 'react-toastify'
import { validationSchema } from '../schema/validationSchema'
import { Link, useNavigate } from 'react-router-dom'

const Register = () => {

  const navigate = useNavigate()

  const onSubmit = async (value, action) => {
    try {
      const res = await api.post('/user/register', value)
      localStorage.setItem('token', res.data.token)

      toast.success('User Registered Successfully!', {
        position: 'top-center',
        autoClose: 3000,
        style: {
          backgroundColor: "black",
          color: "white",
          fontSize: "18px",
          borderRadius: "10px",
        }
      })

      action.resetForm()
      navigate('/inpass') // redirect after register
    } catch (error) {
      toast.error(error.response?.data?.message || 'Something went wrong', {
        position: 'top-center',
        autoClose: 3000,
        style: {
          backgroundColor: "black",
          color: "white",
          fontSize: "18px",
          borderRadius: "10px",
        }
      })
    }
    action.setSubmitting(false)
  }

  const { values, handleChange, handleBlur, errors, handleSubmit, touched, isSubmitting } = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: '',
      cpassword: ''
    },
    validationSchema: validationSchema,
    onSubmit
  })

  return (
    <div className="body bg-dark ">
      
      <h2 className="text-center fw-bold" style={{color:'yellowgreen'}}>Create an Account</h2>
      <p className="text-center">Register to access visitor management system</p>

      <form onSubmit={handleSubmit}
        className="container p-5"
        style={{
          maxWidth: "40%",
          borderRadius: "10px",
          boxShadow: "0px 5px 10px rgba(0,0,0,0.3)",
          background: "#fff"
        }}>

        {/* Name */}
        <div className="form-group">
          <label className="form-label mt-2 fw-bold">Full Name</label>
          <input className={`form-control ${touched.name && errors.name ? "is-invalid" : ""}`}
            type="text" name="name" placeholder="Enter your name"
            value={values.name} onChange={handleChange} onBlur={handleBlur} />
          {touched.name && errors.name && <p className="invalid-feedback">{errors.name}</p>}
        </div>

        {/* Email */}
        <div className="form-group">
          <label className="form-label mt-2 fw-bold">Email Address</label>
          <input className={`form-control ${touched.email && errors.email ? "is-invalid" : ""}`}
            type="email" name="email" placeholder="example@gmail.com"
            value={values.email} onChange={handleChange} onBlur={handleBlur} />
          {touched.email && errors.email && <p className="invalid-feedback">{errors.email}</p>}
        </div>

        {/* Password */}
        <div className="form-group">
          <label className="form-label mt-2 fw-bold">Password</label>
          <input className={`form-control ${touched.password && errors.password ? "is-invalid" : ""}`}
            type="password" name="password" placeholder="Enter password"
            value={values.password} onChange={handleChange} onBlur={handleBlur} />
          {touched.password && errors.password && <p className="invalid-feedback">{errors.password}</p>}
        </div>

        {/* Confirm Password */}
        <div className="form-group">
          <label className="form-label mt-2 fw-bold">Confirm Password</label>
          <input className={`form-control ${touched.cpassword && errors.cpassword ? "is-invalid" : ""}`}
            type="password" name="cpassword" placeholder="Re-enter password"
            value={values.cpassword} onChange={handleChange} onBlur={handleBlur} />
          {touched.cpassword && errors.cpassword && <p className="invalid-feedback">{errors.cpassword}</p>}
        </div>

        {/* Submit Button */}
        <button type="submit"
          className="btn mt-4 w-100 fw-bold"
          style={{ backgroundColor: "yellowgreen",color:'black' }}>
          {isSubmitting ? <><FaPaperPlane /> Submitting...</> : <>Register</>}
        </button>

        {/* Navigation */}
        <p className="text-center mt-3">
          Already have an account? <Link to="/" style={{ color: "yellowgreen",textDecoration:'none'}}>Login</Link>
        </p>

      </form>
    </div>
  )
}

export default Register
