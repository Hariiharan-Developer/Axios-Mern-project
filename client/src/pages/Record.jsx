import{toast} from 'react-toastify'
import { useEffect, useState } from 'react'
import {Modal,Button} from 'react-bootstrap'
import api from '../API/axios'
const Record =()=>{
    const [data,setData] =useState([])
    const [toggle,setToggle] = useState(false)
    const [show,setShow] =useState(false)
    const [editData,setEditData] =useState({
        name:'',
        phone:'',
        outpass:'',
        status:''
    })
    const {name,phone} = editData
    const handleClose =()=>setShow(false)
    const handleUpdate =()=>{
        const updateData = async()=>{
            try{
            const res = await api.put(`http://localhost:4000/api/gate-pass/${editData._id}`,editData)
            toast.success(res.data.message,{
                position:'top-center',
                autoClose:3000,
                style:{
                    backgroundColor:'black',
                    color:'white'
                }
            })
            getInfo()
            setShow(false)
            
        }catch(error){
            toast.error(error.response?.message?.data || 'Something went wrong',{
                position:'top-center',
                autoClose:3000,
                style:{
                    backgroundColor:'black',
                    color:'white'
                }
            })
            console.log(error.message)
        }
        }
        updateData()
    }
    const getInfo = async()=>{
        try{
            const res = await api.get('http://localhost:4000/api/gate-pass')
                setData(res.data.message)
        }catch(error){
            console.log(error.message)
        }
    }
    useEffect(()=>{
        getInfo()
    },[])

    const deleteFunction =(id)=>{
        const deleteData =async()=>{
            try{
                const res =await api.delete(`http://localhost:4000/api/gate-pass/${id}`)
                setData(prev=>prev.filter(item=>item._id !==id))
                console.log('res:',res.data.message)
                toast.success(res.data.message,{
                    position:'top-center',
                    autoClose:3000,
                    style:{
                        background:'black',
                        color:'white',
                        borderRadius:'20px'
                    }
                })
                    }catch(error){
                        toast.error(res.data.message,{
                            position:'top-center',
                            autoClose:3000,
                            style:{
                        background:'black',
                        color:'white',
                        borderRadius:'20px'
                    }
                        })
                console.log(error.message)
            }
        }
        deleteData()
    }

    //EditFunctin :
    const editFunction =(item)=>{
        setShow(true)
        setEditData(item)
    }
    const editOnchange =(e)=>{
        setEditData({...editData,[e.target.name]:e.target.value})
    }
return(
    < div className=' bg-dark' style={{minHeight:'100vh'}}>
   <h3 className="text-center " style={{fontWeight:'800'}}>Visitor's - <span style={{color:"yellowgreen"}}>Record</span></h3>
   <table className=" table table-bordered table-striped table-hover table-sm table-responsive-sm/md">
        <thead>
    <tr>
            <th>S.no</th>
            <th>Ref.No</th>
            <th>Date</th>
            <th>In Time</th>
            <th>Out Time</th>
            <th>Status</th>
            <th>Visitor Name</th>
            <th>Visitor Mobile</th>
            <th>Visitord Address</th>
            <th>Purose of visiting</th>
            <th>Visitor vechile no</th>
            <th>Action</th>
    </tr>
        </thead>
        <tbody>
        {data.map((info,index)=>(
            <tr key={info._id}>
            <td>{index+1}</td>
            <td style={{color:'yellowgreen'}}>{Date.now()}</td>
            <td>{new Date(Date.now()).toLocaleDateString()}</td>
            <td className='text-success'>{new Date(info.inPass).toLocaleTimeString([],{
                hour:'2-digit',
                minute:'2-digit',
                hour12:true
            }) }</td>
            <td className='text-danger'>{info.outPass ? new Date(info.outPass).toLocaleTimeString([],{
                hour:'2-digit',
                minute:'2-digit',
                hour12:true
            }) :'-- --' }</td>
            <td>{info.status === 'alive' ?(<span className='text-success'>Alive</span>):(<span className='text-danger'>Exist</span>)}</td>
            <td style={{color:'yellowgreen'}}>{info.name}</td>
            <td style={{color:'yellowgreen'}}>{info.phone}</td>
            <td>{info.visitorAddress}</td>
            <td style={{color:'yellowgreen'}}>{info.purpose}</td>
            <td>{info.vechileNo}</td>
            <td>
                <button
                onClick={()=>editFunction(info)}
                className="btn btn-sm mx-1 btn-dark">Exist</button>
            <button onClick={()=>deleteFunction(info._id)} className="btn btn-sm btn-danger">Delete</button></td>
    </tr>
        ))}
        </tbody>
        
   </table>

   <Modal show={show} onHide={handleClose} centered>
    <Modal.Header closeButton>
        <Modal.Title>Edit Gate-Pass Entry</Modal.Title>
    </Modal.Header>
    <Modal.Body>
        <label className='form-label' htmlFor="name">Enter Name</label>
        <input className='form-control' onChange={editOnchange} value={name} type="text" name='name' id='name'/>
        <label className='form-label' htmlFor="phone">Enter Mobile-number</label>
        <input className='form-control' onChange={editOnchange} value={phone} type="phone" name='phone' id='phone' />
        <label htmlFor="outpass">Exist Time</label>
        <input className='form-control'onChange={editOnchange} value={editData.outpass} type="time" id='outpass' />
        <label htmlFor="status">Status</label>
        <select className='form-select' name="status" id="stats" onChange={editOnchange}  value={editData.status}>
            <option value="alive">Alive</option>
            <option value="exit">Exit</option>
        </select>
    </Modal.Body>
    <Modal.Footer>
        <Button variant='secondary' onClick={handleClose}>Cancel</Button>
        <Button variant='success' onClick={handleUpdate}>Update</Button>

    </Modal.Footer>
   </Modal>
    </div>
)
}

export default Record