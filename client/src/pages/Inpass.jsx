import React, { useState } from "react";
import "../App.css";
import { toast } from "react-toastify";
import api from "../API/axios";
import{useFormik} from 'formik'
import { inpassSchema } from "../schema/validationSchema";
import {FaPaperPlane} from 'react-icons/fa'
import { useNavigate } from "react-router-dom";
 //onsubmit :
  const onSubmit = (value,action) => {
    const navigate =useNavigate()
    const createInfo = async () => {
      try {
        const res = await api.post("/gate-pass",{
          name:value.name,
          phone:value.phone,
          visitorAddress:value.address,
          purpose:value.purpose,
          vechileNo:value.vechileNo
        });
        navigate('/record')
    
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
        action.resetForm()
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
    };

    createInfo();
  };


const Inpass = () => {
  const {values,handleBlur,handleChange,handleSubmit,errors,touched,isSubmitting} = useFormik({
    initialValues :{
    name: "",
    phone: "",
    purpose: "",
    address: "",
    vechileNo: "",
    },
    validationSchema:inpassSchema,
    onSubmit
  })
  const [message, setMessage] = useState("");
  const option = [
    "Admission",
    "Interview",
    "Project Review",
    "Meet Staff",
    "Meet Student",
    "Event",
    "others",
  ];
  return (
    <div className="body bg-dark">
      <h3 className="text-center text-light " style={{ fontWeight: "800" }}>
        <span style={{ color: "yellowgreen" }}>In-</span>pass
      </h3>
      <p className="text-center text-light">Track visitors Entry by In-pass</p>
      <form onSubmit={handleSubmit} className="form bg-light">
        <div className="form-group">
          <label
            style={{ fontWeight: "700", margin: "9px" }}
            className="form-label"
            htmlFor="name"
          >
            Enter Visitor's Name
          </label>
          <input
            placeholder="Surya"
            onChange={handleChange}
            onBlur={handleBlur}
            className={`form-control ${errors.name && touched.name ? 'is-invalid':''}`}
            type="text"
            name="name"
            id="name"
            value={values.name}
          />
          {errors.name && touched.name && <p className="invalid-feedback">{errors.name}</p>}
        </div>
        <div className="form-group">
          <label
            style={{ fontWeight: "700", margin: "5px" }}
            className="form-label"
            htmlFor="phone"
          >
            Enter Visitor's Phone
          </label>
          <input
            placeholder="+91 0967542109"
            onChange={handleChange}
            onBlur={handleBlur}
            className={`form-control ${errors.phone && touched.phone ? 'is-invalid':''}`}
            type="phone"
            name="phone"
            id="phone"
            value={values.phone}
          />
        {errors.phone && touched.phone && <p className="invalid-feedback">{errors.phone}</p>}

        </div>
        <div className="form-group">
          <label
            style={{ fontWeight: "700", margin: "5px" }}
            className="form-label"
            htmlFor="address"
          >
            Enter Visitor's Address
          </label>
          <textarea
            placeholder="Chennai-60028,Tamilnadu"
            onChange={handleChange}
            onBlur={handleBlur}
            className={`form-control ${errors.address && touched.address ? 'is-invalid':''}`}
            type="text"
            name="address"
            id="address"
            value={values.address}
          />
        {errors.addredd && touched.address && <p className="invalid-feedback">{errors.addredd}</p>}

        </div>
        <div className="form-group">
          <label
            style={{ fontWeight: "700", margin: "5px" }}
            className="form-label"
            htmlFor="name"
          >
            Enter Visiting Purpose
          </label>
          <select
            onChange={handleChange}
            onBlur={handleBlur}
            className={`form-select ${errors.purpose && touched.purpose ? 'is-invalid' : ''}`}
            type="text"
            name="purpose"
            id="name"
            value={values.purpose}
          >
            <option value="">Select Purpose</option>
            {option.map((data, index) => (
                <option key={index} value={data}>
                  {data}
                </option>
            ))}
          </select>
        {errors.purpose && touched.purpose && <p className="invalid-feedback">{errors.purpose}</p>}

        </div>
        <div className="form-group">
          <label
            style={{ fontWeight: "700", margin: "5px" }}
            className="form-label"
            htmlFor="vechileNo"
          >
            Enter Visitor's Vechile Number
          </label>
          <input
            placeholder="TN38 BB1234"
            onChange={handleChange}
            onBlur={handleBlur}
            className={`form-control ${errors.vechileNo && touched.vechileNo ? 'is-invalid':''}`}
            type="text"
            name="vechileNo"
            id="vechileNo"
            value={values.vechileNo}
          />
        {errors.vechileNo && touched.vechileNo && <p className="invalid-feedback">{errors.vechileNo}</p>}

        </div>
        <div className="text-center mt-2">
          <button
            className="btn"
            type="submit"
            style={{
              background: "yellowgreen",
              color:'black',
              width: "100%",
              fontWeight: "500",
            }}
          >
            {isSubmitting ?(<><FaPaperPlane/> Submiting...</>) : (<>Submit</>)}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Inpass;
