import * as yup from 'yup'

const passwordValidation = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@!$%&*?]{8,}$/
const mobileNumber = /^[6-9]\d{9}$/

export const validationSchema = yup.object().shape({
    name:yup.string().min(3,'minimun 3 character required').required('name is required'),
    email:yup.string().email('please enter the valid email').required('email is required'),
    password:yup.string().min(8,'minimum 8 character is required').matches(passwordValidation, 'password must match 2- uppercase lowercase symbols & numbers').required('password is required'),
    cpassword:yup.string().oneOf([yup.ref('password'),null],'password and confirm password is not match').required('confirm password is required')
})

export const inpassSchema = yup.object().shape({
    name:yup.string().min(3,'minimun 3 character required').required('name is required'),
    phone:yup.string().matches(mobileNumber, 'invalid mobile number').required('phone is required'),
    address:yup.string().min(10, 'minimum 10 character needed').required('address is required'),
    vechileNo:yup.string().required('This field is required'),
    purpose:yup.string().required('This field is required')
})