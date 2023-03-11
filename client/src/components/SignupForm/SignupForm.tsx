import { useForm, SubmitHandler } from 'react-hook-form'
import { FormData } from '@components/LoginForm/LoginForm'
import { yupResolver } from '@hookform/resolvers/yup'
import { schema } from 'utils/yup/yup'
import { useThunkDispatch } from 'utils/hooks'
import { signUpUserThunk } from 'store/slices/authSlice'

const SigninForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      email: '',
      password: '',
    },
    resolver: yupResolver(schema),
  })
  const dispatch = useThunkDispatch()

  const handleSignup: SubmitHandler<FormData> = (data) => {
    dispatch(
      signUpUserThunk({
        email: data.email,
        password: data.password,
      })
    )
  }

  return (
    <div>
      <div className="card-body">
        <form onSubmit={handleSubmit(handleSignup)}>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <input
              type="email"
              placeholder="email"
              className="input input-bordered"
              {...register('email', { required: true })}
            />
            <p role="alert">{errors.email?.message}</p>
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Password</span>
            </label>
            <input
              type="password"
              placeholder="password"
              className="input input-bordered"
              {...register('password', { required: true })}
            />
            <p>{errors.password?.message}</p>
          </div>
          <div className="form-control mt-6">
            <button type="submit" className="btn btn-primary">
              Sign Up
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default SigninForm
