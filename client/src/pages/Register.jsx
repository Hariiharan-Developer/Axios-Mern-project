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
          borderRadius: "10px",
        }
      })

      action.resetForm()
      navigate('/')
    } catch (error) {
      toast.error(error.response?.data?.message || 'Something went wrong', {
        position: 'top-center',
        autoClose: 3000,
        style: {
          backgroundColor: "black",
          color: "white",
          borderRadius: "10px",
        }
      })
    }
    action.setSubmitting(false)
  }

  const {
    values, handleChange, handleBlur,
    errors, handleSubmit, touched, isSubmitting
  } = useFormik({
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
    <div className="bg-dark d-flex flex-column justify-content-center align-items-center"
      style={{ minHeight: "100vh", padding: "20px" }}>

      <h2 className="text-center fw-bold text-light mb-1">
        Create an Account
      </h2>
      <p className="text-center text-secondary mb-4">
        Register to access visitor management system
      </p>

      <form
        onSubmit={handleSubmit}
        className="p-4 shadow-lg bg-white rounded"
        style={{
          width: "100%",
          maxWidth: "450px",       // mobile = full width, desktop = 450px
        }}
      >

        {/* Name */}
        <div className="mb-3">
          <label className="form-label fw-bold">Full Name</label>
          <input
            className={`form-control ${touched.name && errors.name ? "is-invalid" : ""}`}
            type="text"
            name="name"
            placeholder="Enter your name"
            value={values.name}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {touched.name && errors.name && (
            <p className="invalid-feedback">{errors.name}</p>
          )}
        </div>

        {/* Email */}
        <div className="mb-3">
          <label className="form-label fw-bold">Email Address</label>
          <input
            className={`form-control ${touched.email && errors.email ? "is-invalid" : ""}`}
            type="email"
            name="email"
            placeholder="example@gmail.com"
            value={values.email}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {touched.email && errors.email && (
            <p className="invalid-feedback">{errors.email}</p>
          )}
        </div>

        {/* Password */}
        <div className="mb-3">
          <label className="form-label fw-bold">Password</label>
          <input
            className={`form-control ${touched.password && errors.password ? "is-invalid" : ""}`}
            type="password"
            name="password"
            placeholder="Enter password"
            value={values.password}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {touched.password && errors.password && (
            <p className="invalid-feedback">{errors.password}</p>
          )}
        </div>

        {/* Confirm Password */}
        <div className="mb-3">
          <label className="form-label fw-bold">Confirm Password</label>
          <input
            className={`form-control ${touched.cpassword && errors.cpassword ? "is-invalid" : ""}`}
            type="password"
            name="cpassword"
            placeholder="Re-enter password"
            value={values.cpassword}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {touched.cpassword && errors.cpassword && (
            <p className="invalid-feedback">{errors.cpassword}</p>
          )}
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="btn w-100 fw-bold mt-2"
          style={{
            backgroundColor: "yellowgreen",
            color: "black",
            padding: "10px",
          }}
        >
          {isSubmitting ? <>
            <FaPaperPlane /> Submitting...
          </> : "Register"}
        </button>

        <p className="text-center mt-3">
          Already have an account?{" "}
          <Link to="/" style={{ color: "yellowgreen", textDecoration: "none" }}>
            Login
          </Link>
        </p>

      </form>
    </div>
  )
}

export default Register
