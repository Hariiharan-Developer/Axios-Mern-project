import React from "react";
import "../App.css";
import { useFormik } from "formik";
import { FaPaperPlane } from "react-icons/fa";
import api from "../API/axios";
import { toast } from "react-toastify";
import { validationSchema } from "../schema/validationSchema";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();

  const onSubmit = async (value, action) => {
    try {
      const res = await api.post("/user/register", value);
      localStorage.setItem("token", res.data.token);

      toast.success("User Registered Successfully!", {
        position: "top-center",
        autoClose: 3000,
        style: {
          backgroundColor: "black",
          color: "white",
          borderRadius: "10px",
        },
      });

      action.resetForm();
      navigate("/inpass");
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong", {
        position: "top-center",
        autoClose: 3000,
        style: {
          backgroundColor: "black",
          color: "white",
          borderRadius: "10px",
        },
      });
    }
    action.setSubmitting(false);
  };

  const {
    values,
    handleChange,
    handleBlur,
    errors,
    handleSubmit,
    touched,
    isSubmitting,
  } = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      cpassword: "",
    },
    validationSchema: validationSchema,
    onSubmit,
  });

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-dark p-3">
      <div
        className="card shadow-lg p-4"
        style={{
          width: "100%",
          maxWidth: "450px",
          borderRadius: "12px",
        }}
      >
        <h2
          className="text-center mb-2"
          style={{ fontWeight: 800, color: "yellowgreen" }}
        >
          Register
        </h2>
        <p className="text-center text-secondary mb-4">
          Create your account to continue using visitor management system
        </p>

        <form onSubmit={handleSubmit}>
          {/* NAME */}
          <div className="mb-3">
            <label htmlFor="name" className="fw-bold">
              Full Name
            </label>
            <input
              className={`form-control ${
                errors.name && touched.name ? "is-invalid" : ""
              }`}
              type="text"
              name="name"
              id="name"
              placeholder="Enter your name"
              value={values.name}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {touched.name && errors.name && (
              <p className="invalid-feedback">{errors.name}</p>
            )}
          </div>

          {/* EMAIL */}
          <div className="mb-3">
            <label htmlFor="email" className="fw-bold">
              Email Address
            </label>
            <input
              className={`form-control ${
                errors.email && touched.email ? "is-invalid" : ""
              }`}
              type="email"
              name="email"
              id="email"
              placeholder="example@gmail.com"
              value={values.email}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {touched.email && errors.email && (
              <p className="invalid-feedback">{errors.email}</p>
            )}
          </div>

          {/* PASSWORD */}
          <div className="mb-3">
            <label htmlFor="password" className="fw-bold">
              Password
            </label>
            <input
              className={`form-control ${
                errors.password && touched.password ? "is-invalid" : ""
              }`}
              type="password"
              name="password"
              id="password"
              placeholder="Enter password"
              value={values.password}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {touched.password && errors.password && (
              <p className="invalid-feedback">{errors.password}</p>
            )}
          </div>

          {/* CONFIRM PASSWORD */}
          <div className="mb-3">
            <label htmlFor="cpassword" className="fw-bold">
              Confirm Password
            </label>
            <input
              className={`form-control ${
                errors.cpassword && touched.cpassword ? "is-invalid" : ""
              }`}
              type="password"
              name="cpassword"
              id="cpassword"
              placeholder="Re-enter password"
              value={values.cpassword}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {touched.cpassword && errors.cpassword && (
              <p className="invalid-feedback">{errors.cpassword}</p>
            )}
          </div>

          {/* SUBMIT BUTTON */}
          <button
            type="submit"
            className="btn w-100 mt-2 text-white"
            style={{
              backgroundColor: "yellowgreen",
              fontWeight: "700",
              padding: "10px",
            }}
          >
            {isSubmitting ? (
              <>
                <FaPaperPlane /> Submitting...
              </>
            ) : (
              "Register"
            )}
          </button>

          {/* NAVIGATE */}
          <p className="text-center mt-3" style={{ fontWeight: "600" }}>
            Already have an account?{" "}
            <Link
              to="/"
              style={{ color: "yellowgreen", textDecoration: "none" }}
            >
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Register;
