import React from "react";
import "../App.css";
import { toast } from "react-toastify";
import api from "../API/axios";
import { useFormik } from "formik";
import { inpassSchema } from "../schema/validationSchema";
import { FaPaperPlane } from "react-icons/fa";
import {useNavigate} from 'react-router-dom'


// onSubmit :
const onSubmit = async (value, action) => {
  
  try {
    const res = await api.post("/gate-pass", {
      name: value.name,
      phone: value.phone,
      visitorAddress: value.address,
      purpose: value.purpose,
      vechileNo: value.vechileNo,
    });
    navigate('record')

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

    action.resetForm();
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

  action.setSubmitting(false);
};

const Inpass = () => {
  const navigate = useNavigate()
  const {
    values,
    handleBlur,
    handleChange,
    handleSubmit,
    errors,
    touched,
    isSubmitting,
  } = useFormik({
    initialValues: {
      name: "",
      phone: "",
      purpose: "",
      address: "",
      vechileNo: "",
    },
    validationSchema: inpassSchema,
    onSubmit,
  });

  const option = [
    "Admission",
    "Interview",
    "Project Review",
    "Meet Staff",
    "Meet Student",
    "Event",
    "Others",
  ];

  return (
    <div className="bg-dark d-flex justify-content-center align-items-start py-4 px-3 min-vh-100">

      <div
        className="card shadow-lg p-4 w-100"
        style={{
          maxWidth: "550px",
          borderRadius: "14px",
        }}
      >
        <h3 className="text-center mb-1 fw-bold" style={{ color: "yellowgreen" }}>
          In-Pass
        </h3>
        <p className="text-center text-secondary mb-4">
          Track visitor entry using the In-pass form
        </p>

        <form onSubmit={handleSubmit}>

          {/* NAME */}
          <div className="mb-3">
            <label className="fw-semibold mb-1">Visitor Name</label>
            <input
              placeholder="Surya"
              className={`form-control ${
                errors.name && touched.name ? "is-invalid" : ""
              }`}
              name="name"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.name}
            />
            {errors.name && touched.name && (
              <div className="invalid-feedback">{errors.name}</div>
            )}
          </div>

          {/* PHONE */}
          <div className="mb-3">
            <label className="fw-semibold mb-1">Phone Number</label>
            <input
              placeholder="+91 9876543210"
              className={`form-control ${
                errors.phone && touched.phone ? "is-invalid" : ""
              }`}
              name="phone"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.phone}
            />
            {errors.phone && touched.phone && (
              <div className="invalid-feedback">{errors.phone}</div>
            )}
          </div>

          {/* ADDRESS */}
          <div className="mb-3">
            <label className="fw-semibold mb-1">Visitor Address</label>
            <textarea
              placeholder="Chennai - 600028, Tamil Nadu"
              className={`form-control ${
                errors.address && touched.address ? "is-invalid" : ""
              }`}
              name="address"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.address}
              rows={2}
            />
            {errors.address && touched.address && (
              <div className="invalid-feedback">{errors.address}</div>
            )}
          </div>

          {/* PURPOSE */}
          <div className="mb-3">
            <label className="fw-semibold mb-1">Visiting Purpose</label>
            <select
              className={`form-select ${
                errors.purpose && touched.purpose ? "is-invalid" : ""
              }`}
              name="purpose"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.purpose}
            >
              <option value="">Select Purpose</option>
              {option.map((p, i) => (
                <option key={i} value={p}>
                  {p}
                </option>
              ))}
            </select>
            {errors.purpose && touched.purpose && (
              <div className="invalid-feedback">{errors.purpose}</div>
            )}
          </div>

          {/* VEHICLE NO */}
          <div className="mb-3">
            <label className="fw-semibold mb-1">Vehicle Number</label>
            <input
              placeholder="TN 38 BB 1234"
              className={`form-control ${
                errors.vechileNo && touched.vechileNo ? "is-invalid" : ""
              }`}
              name="vechileNo"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.vechileNo}
            />
            {errors.vechileNo && touched.vechileNo && (
              <div className="invalid-feedback">{errors.vechileNo}</div>
            )}
          </div>

          {/* SUBMIT BUTTON */}
          <button
            className="btn w-100 mt-2 text-white"
            style={{
              background: "yellowgreen",
              fontWeight: "700",
              padding: "10px",
            }}
            disabled={isSubmitting}
            type="submit"
          >
            {isSubmitting ? (
              <>
                <FaPaperPlane /> Submitting...
              </>
            ) : (
              "Submit"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Inpass;
