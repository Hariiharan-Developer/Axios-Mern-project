import {useFormik} from 'formik'
import{FaPaperPlane} from 'react-icons/fa'
import '../App.css'
import { validationSchema } from '../schema/validationSchema'
const onSubmit =async(value,action)=>{
    console.log('value:',value)
    console.log('action:',action)
    console.log('123')
    await new Promise(resolve=>(resolve,1000))

}
const Register =()=>{

    const {values,handleChange,handleBlur,errors,handleSubmit,touched,isSubmitting,resetForm} = useFormik({
        initialValues :{
            name:'',
            email:'',
            password:'',
            cpassword:''
        },
        validationSchema:validationSchema,
        onSubmit
    })
    
    console.log(touched)
    return(
        <div className='body' >
            <h3>Register...</h3>
            <form action="" className='form ' onSubmit={handleSubmit}>
                <div className="form-group">
                    <label className='form-label' htmlFor="name">Enter Name</label>
                    <input className={`form-control ${touched.name && errors.name ? 'is-invalid' :''}`} id="name" name="name" type="text" 
                    value={values.name}
                    onChange={handleChange}
                    onBlur={handleBlur}/>
                {touched.name && errors.name && <p className='invalid-feedback'>{errors.name}</p>}

                </div>
                <div className="form-group">
                    <label className='form-label' htmlFor="email">Enter Email</label>
                    <input className={`form-control ${touched.email && errors.email ? 'is-invalid' :''}`} id="email" name="email" type="email" 
                    value={values.email}
                    onChange={handleChange}
                    onBlur={handleBlur}/>
                {touched.email && errors.email && <p className='invalid-feedback'>{errors.email}</p>}

                </div>
                <div className="form-group">
                    <label className='form-label' htmlFor="password">Enter Password</label>
                    <input className={`form-control ${touched.password && errors.password ? 'is-invalid' :''}`} id="password" name="password" type="password" 
                    value={values.password}
                    onChange={handleChange}
                    onBlur={handleBlur}/>
                {touched.password && errors.password && <p className='invalid-feedback'>{errors.password}</p>}
                </div>
                <div className="form-group">
                    <label className='form-label' htmlFor="cpassword">Confirm Password</label>
                    <input className={`form-control ${touched.cpassword && errors.cpassword ? 'is-invalid' :''}`} id="cpassword" name="cpassword" type="password" 
                    value={values.cpassword}
                    onChange={handleChange}
                    onBlur={handleBlur}/>
                {touched.cpassword && errors.cpassword && <p className='invalid-feedback'>{errors.cpassword}</p>}

                </div>
                <button type='submit' className='btn mt-3' style={{backgroundColor:'yellowgreen',width:'100%'}}>{isSubmitting ?(<><FaPaperPlane/> submiting...</>):(<>submit</>)}</button>
            </form>
            </div>
    )
}

export default Register