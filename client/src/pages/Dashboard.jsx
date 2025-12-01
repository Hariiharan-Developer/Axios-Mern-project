import React from "react";
import "../App.css";
import { useFormik } from "formik";
import { FaRegPaperPlane } from "react-icons/fa";
import api from "../API/axios";
import { toast } from "react-toastify";
import { loginSchema } from "../schema/loginSchema";
import { Link, useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();

  // onsubmit :
  const onSubmit = async (value, action) => {
    try {
      const res = await api.post("/user/login", value);
      localStorage.setItem("token", res.data.token);
      navigate("/");

      toast.success(res.data.message, {
        position: "top-center",
        autoClose: 3000,
        style: {
          backgroundColor: "black",
          color: "white",
          borderRadius: "10px",
        },
      });

      action.resetForm();
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

  // formik :
  const {
    values,
    handleBlur,
    handleChange,
    handleSubmit,
    isSubmitting,
    errors,
    touched,
  } = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: loginSchema,
    onSubmit,
  });

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-dark px-3">

      <div
        className="card shadow-lg p-4 w-100"
        style={{
          maxWidth: "420px",
          borderRadius: "14px",
        }}
      >
        <h2
          className="text-center mb-2"
          style={{ fontWeight: 800, color: "yellowgreen" }}
        >
          Login
        </h2>

        <p className="text-center text-secondary mb-4">
          Sign in to continue your visitor management system
        </p>

        <form onSubmit={handleSubmit}>
          {/* Email */}
          <div className="mb-3">
            <label htmlFor="email" className="fw-bold">
              Email Address
            </label>
            <input
              className={`form-control ${
                errors.email && touched.email ? "is-invalid" : ""
              }`}
              type="text"
              name="email"
              id="email"
              placeholder="example@gmail.com"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.email}
            />
            {touched.email && errors.email && (
              <p className="invalid-feedback">{errors.email}</p>
            )}
          </div>

          {/* Password */}
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
              placeholder="Enter your password"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.password}
            />
            {touched.password && errors.password && (
              <p className="invalid-feedback">{errors.password}</p>
            )}
          </div>

          {/* Button */}
          <button
            type="submit"
            className="btn w-100 mt-2 text-white"
            style={{
              backgroundColor: "yellowgreen",
              fontWeight: "700",
              padding: "10px",
            }}
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <FaRegPaperPlane /> Submitting...
              </>
            ) : (
              "Login"
            )}
          </button>

          {/* Register Link */}
          <p className="text-center mt-3 fw-semibold">
            Don't have an account?{" "}
            <Link
              to="/register"
              style={{ color: "yellowgreen", textDecoration: "none" }}
            >
              Register
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Dashboard;
