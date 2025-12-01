import React from "react";
import "../App.css";
import { useFormik } from "formik";
import { FaRegPaperPlane } from "react-icons/fa";
import api from "../API/axios";
import { toast } from "react-toastify";
import { validationSchema } from "../schema/validationSchema";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {

  const navigate = useNavigate();

  const onSubmit = async (value, action) => {
    try {
      const res = await api.post("/user/register", value);

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
      navigate("/login");
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
    handleBlur,
    handleChange,
    handleSubmit,
    isSubmitting,
    errors,
    touched,
  } = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit,
  });

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-dark">
      <div
        className="card shadow-lg p-4"
        style={{ width: "40%", borderRadius: "12px" }}
      >
        <h2
          className="text-center mb-3"
          style={{ fontWeight: 800, color: "yellowgreen" }}
        >
          Register
        </h2>
        <p className="text-center text-secondary mb-4">
          Create an account to continue
        </p>

        <form onSubmit={handleSubmit}>

          <div className="mb-3">
            <label htmlFor="name" style={{ fontWeight: 700 }}>
              Full Name
            </label>
            <input
              className={`form-control ${
                errors.name && touched.name ? "is-invalid" : ""
              }`}
              type="text"
              id="name"
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

          <div className="mb-3">
            <label htmlFor="email" style={{ fontWeight: 700 }}>
              Email Address
            </label>
            <input
              className={`form-control ${
                errors.email && touched.email ? "is-invalid" : ""
              }`}
              type="email"
              id="email"
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

          <div className="mb-3">
            <label htmlFor="password" style={{ fontWeight: 700 }}>
              Password
            </label>
            <input
              className={`form-control ${
                errors.password && touched.password ? "is-invalid" : ""
              }`}
              type="password"
              id="password"
              name="password"
              placeholder="Enter your password"
              value={values.password}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {touched.password && errors.password && (
              <p className="invalid-feedback">{errors.password}</p>
            )}
          </div>

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
              "Register"
            )}
          </button>

          <p className="text-center mt-3" style={{ fontWeight: "600" }}>
            Already have an account?{" "}
            <Link
              to="/login"
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
