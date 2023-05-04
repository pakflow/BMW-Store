import { FC } from 'react'
import {
  googleUserAsyncThunk,
  loginUserAsyncThunk,
  userSelectors,
} from 'store/slices/authSlice'
import { useForm, SubmitHandler } from 'react-hook-form'
import { useThunkDispatch } from 'utils/hooks'
import { yupResolver } from '@hookform/resolvers/yup'
import { schema } from 'utils/yup/yup'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

export type FormData = {
  email: string
  password: string
}

const LoginForm: FC = () => {
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

  const user = useSelector(userSelectors.user)

  const handleLogin: SubmitHandler<FormData> = (data) => {
    dispatch(
      loginUserAsyncThunk({
        email: data.email,
        password: data.password,
      })
    )
  }

  const googleLogin = () => {
    dispatch(googleUserAsyncThunk())
  }

  return (
    <div className="card-body">
      <form onSubmit={handleSubmit(handleLogin)}>
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
            Login
          </button>
        </div>
      </form>
      <div>
        <label className="label flex justify-center">or</label>
        <span className="label-text">Continue with</span>
        <img
          src="https://cdn-icons-png.flaticon.com/512/2875/2875404.png"
          alt="googleAuth"
          className="w-6 h-6 inline-block mx-4 cursor-pointer"
          onClick={googleLogin}
        />
      </div>
      {user?.email === 'bboy.mars.97@gmail.com' ? (
        <button>
          <Link to={'/admin'}>Admin Page</Link>
        </button>
      ) : null}
    </div>
  )
}

export default LoginForm
