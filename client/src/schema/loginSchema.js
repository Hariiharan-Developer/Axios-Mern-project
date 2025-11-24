import * as yup from 'yup'

export const loginSchema = yup.object().shape({
    email:yup.
        string().email('please enter a valid email').required('email is required'),
    password:yup.
        string().min(8,'minimum 8 character is required').required('password is required')
})

