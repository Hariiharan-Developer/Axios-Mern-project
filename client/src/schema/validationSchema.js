import * as yup from 'yup'

const passwordValidation = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@!$%&*?]{8,}$/

export const validationSchema = yup.object().shape({
    name:yup.string().min(3,'minimun 3 character required').required('name is required'),
    email:yup.string().email('please enter the valid email').required('email is required'),
    password:yup.string().min(8,'minimum 8 character is required').matches(passwordValidation, 'password must match 2- uppercase lowercase symbols & numbers').required('password is required'),
    cpassword:yup.string().oneOf([yup.ref('password'),null],'password and confirm password is not match').required('confirm password is required')
})