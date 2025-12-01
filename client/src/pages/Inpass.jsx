import React, { useState } from "react";
import "../App.css";
import { toast } from "react-toastify";
import api from "../API/axios";
import { useFormik } from "formik";
import { inpassSchema } from "../schema/validationSchema";
import { FaPaperPlane } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Inpass = () => {
  const navigate = useNavigate();

  // Formik handling
  const {
    values,
    handleBlur,
    handleChange,
    handleSubmit,
    errors,
    touched,
    isSubmitting,
    setSubmitting,
    resetForm,
  } = useFormik({
    initialValues: {
      name: "",
      phone: "",
      purpose: "",
      address: "",
      vechileNo: "",
    },
    validationSchema: inpassSchema,
    onSubmit: async (value) => {
      try {
        const res = await api.post("/gate-pass", {
          name: value.name,
          phone: value.phone,
          visitorAddress: value.address,
          purpose: value.purpose,
          vechileNo: value.vechileNo,
        });

        toast.success(res.data.message, {
          position: "top-center",
          autoClose: 2000,
          style: {
            backgroundColor: "black",
            color: "white",
            fontSize: "18px",
            borderRadius: "10px",
          },
        });

        resetForm();
        navigate("/record");
      } catch (error) {
        toast.error(error.response?.data?.message || "Something went wrong", {
          position: "top-center",
          autoClose: 2000,
          style: {
            backgroundColor: "black",
            color: "white",
            fontSize: "18px",
            borderRadius: "10px",
          },
        });
      }

      setSubmitting(false);
    },
  });

  const purposeOptions = [
    "Admission",
    "Interview",
    "Project Review",
    "Meet Staff",
    "Meet Student",
    "Event",
    "Others",
  ];

  return (
    <div className="body bg-dark">
      <h3 className="text-center text-light" style={{ fontWeight: "800" }}>
        <span style={{ color: "yellowgreen" }}>In-</span>pass
      </h3>
      <p className="text-center text-light">Track visitors entry by In-pass</p>

      <form onSubmit={handleSubmit} className="form bg-light">

        {/* Name */}
        <div className="form-group">
          <label className="form-label fw-bold" htmlFor="name">
            Enter Visitor's Name
          </label>
          <input
            className={`form-control ${
              errors.name && touched.name ? "is-invalid" : ""
            }`}
            type="text"
            name="name"
            id="name"
            placeholder="Surya"
            value={values.name}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {errors.name && touched.name && (
            <p className="invalid-feedback">{errors.name}</p>
          )}
        </div>

        {/* Phone */}
        <div className="form-group">
          <label className="form-label fw-bold" htmlFor="phone">
            Enter Visitor's Phone
          </label>
          <input
            className={`form-control ${
              errors.phone && touched.phone ? "is-invalid" : ""
            }`}
            type="text"
            name="phone"
            id="phone"
            placeholder="+91 9876543210"
            value={values.phone}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {errors.phone && touched.phone && (
            <p className="invalid-feedback">{errors.phone}</p>
          )}
        </div>

        {/* Address */}
        <div className="form-group">
          <label className="form-label fw-bold" htmlFor="address">
            Enter Visitor's Address
          </label>
          <textarea
            className={`form-control ${
              errors.address && touched.address ? "is-invalid" : ""
            }`}
            name="address"
            id="address"
            placeholder="Chennai - 600028, Tamil Nadu"
            value={values.address}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {errors.address && touched.address && (
            <p className="invalid-feedback">{errors.address}</p>
          )}
        </div>

        {/* Purpose */}
        <div className="form-group">
          <label className="form-label fw-bold" htmlFor="purpose">
            Enter Visiting Purpose
          </label>
          <select
            className={`form-select ${
              errors.purpose && touched.purpose ? "is-invalid" : ""
            }`}
            name="purpose"
            id="purpose"
            value={values.purpose}
            onChange={handleChange}
            onBlur={handleBlur}
          >
            <option value="">Select Purpose</option>
            {purposeOptions.map((p, i) => (
              <option key={i} value={p}>
                {p}
              </option>
            ))}
          </select>
          {errors.purpose && touched.purpose && (
            <p className="invalid-feedback">{errors.purpose}</p>
          )}
        </div>

        {/* Vehicle */}
        <div className="form-group">
          <label className="form-label fw-bold" htmlFor="vechileNo">
            Enter Visitor's Vehicle Number
          </label>
          <input
            className={`form-control ${
              errors.vechileNo && touched.vechileNo ? "is-invalid" : ""
            }`}
            type="text"
            name="vechileNo"
            id="vechileNo"
            placeholder="TN38 BB1234"
            value={values.vechileNo}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {errors.vechileNo && touched.vechileNo && (
            <p className="invalid-feedback">{errors.vechileNo}</p>
          )}
        </div>

        {/* Button */}
        <div className="text-center mt-3">
          <button
            className="btn text-white"
            type="submit"
            style={{
              background: "yellowgreen",
              width: "100%",
              fontWeight: "600",
            }}
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <FaPaperPlane /> Submitting...
              </>
            ) : (
              "Submit"
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Inpass;
