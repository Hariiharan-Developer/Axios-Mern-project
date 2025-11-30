import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import { Modal, Button } from "react-bootstrap";
import api from "../API/axios";

const Record = () => {
  const [data, setData] = useState([]);
  const [show, setShow] = useState(false);

  const [editData, setEditData] = useState({
    name: "",
    phone: "",
    outpass: "",
    status: "",
  });

  const { name, phone } = editData;

  const handleClose = () => setShow(false);

  const handleUpdate = async () => {
    try {
      const res = await api.put(`/gate-pass/${editData._id}`, editData);
      toast.success(res.data.message, {
        position: "top-center",
        autoClose: 3000,
        style: { backgroundColor: "black", color: "white" },
      });

      getInfo();
      setShow(false);
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong", {
        position: "top-center",
        autoClose: 3000,
        style: { backgroundColor: "black", color: "white" },
      });
    }
  };

  const getInfo = async () => {
    try {
      const res = await api.get("/gate-pass");
      setData(res.data.message);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    getInfo();
  }, []);

  const deleteFunction = (id) => {
    const deleteData = async () => {
      try {
        const res = await api.delete(`/gate-pass/${id}`);

        setData((prev) => prev.filter((item) => item._id !== id));

        toast.success(res.data.message, {
          position: "top-center",
          autoClose: 3000,
          style: { background: "black", color: "white", borderRadius: "15px" },
        });
      } catch (error) {
        toast.error("Something went wrong", {
          position: "top-center",
          autoClose: 3000,
          style: { background: "black", color: "white" },
        });
      }
    };
    deleteData();
  };

  const editFunction = (item) => {
    setShow(true);
    setEditData(item);
  };

  const editOnchange = (e) => {
    setEditData({ ...editData, [e.target.name]: e.target.value });
  };

  return (
    <div className="bg-dark py-4" style={{ minHeight: "100vh" }}>
      <h3 className="text-center text-light" style={{ fontWeight: "800" }}>
        Visitor's <span style={{ color: "yellowgreen" }}>Record</span>
      </h3>

      {/* RESPONSIVE WRAPPER */}
      <div
        className="table-responsive mt-4 px-3"
        style={{ overflowX: "auto", borderRadius: "12px" }}
      >
        <table className="table table-hover table-bordered text-center align-middle">
          <thead className="table-dark">
            <tr>
              <th>S.no</th>
              <th>Ref.No</th>
              <th>Date</th>
              <th>In Time</th>
              <th>Out Time</th>
              <th>Status</th>
              <th>Name</th>
              <th>Mobile</th>
              <th>Address</th>
              <th>Purpose</th>
              <th>Vehicle No</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {data.map((info, index) => (
              <tr key={info._id}>
                <td>{index + 1}</td>
                <td style={{ color: "yellowgreen" }}>{info.refNo || Date.now()}</td>
                <td>{new Date().toLocaleDateString()}</td>

                {/* In Time */}
                <td className="text-success">
                  {new Date(info.inPass).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                    hour12: true,
                  })}
                </td>

                {/* Out Time */}
                <td className="text-danger">
                  {info.outPass
                    ? new Date(info.outPass).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                        hour12: true,
                      })
                    : "-- --"}
                </td>

                {/* Status */}
                <td>
                  {info.status === "alive" ? (
                    <span className="badge bg-success">Alive</span>
                  ) : (
                    <span className="badge bg-danger">Exit</span>
                  )}
                </td>

                <td style={{ color: "yellowgreen" }}>{info.name}</td>
                <td style={{ color: "yellowgreen" }}>{info.phone}</td>
                <td>{info.visitorAddress}</td>
                <td style={{ color: "yellowgreen" }}>{info.purpose}</td>
                <td>{info.vechileNo}</td>

                <td>
                  <button
                    onClick={() => editFunction(info)}
                    className="btn btn-sm btn-dark mx-1"
                  >
                    Exit
                  </button>

                  <button
                    onClick={() => deleteFunction(info._id)}
                    className="btn btn-sm btn-danger"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* EDIT MODAL */}
      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Edit Gate-Pass Entry</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <label className="form-label">Enter Name</label>
          <input
            className="form-control mb-2"
            onChange={editOnchange}
            value={name}
            name="name"
            type="text"
          />

          <label className="form-label">Enter Mobile Number</label>
          <input
            className="form-control mb-2"
            onChange={editOnchange}
            value={phone}
            name="phone"
            type="text"
          />

          <label className="form-label">Exit Time</label>
          <input
            className="form-control mb-2"
            onChange={editOnchange}
            name="outpass"
            value={editData.outpass}
            type="time"
          />

          <label className="form-label">Status</label>
          <select
            className="form-select"
            onChange={editOnchange}
            value={editData.status}
            name="status"
          >
            <option value="alive">Alive</option>
            <option value="exit">Exit</option>
          </select>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="success" onClick={handleUpdate}>
            Update
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Record;
