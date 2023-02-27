import * as yup from 'yup'

export const schema = yup.object().shape({
  email: yup.string().email('incoorect email').required('required email'),
  password: yup
    .string()
    .min(4, 'password must contain at least 4 characters')
    .required('password is required'),
})
