import { FC } from 'react'
import { useSelector } from 'react-redux'
import { RootState } from 'store/store'
import { googleUserThunk, loginUserThunk } from 'store/slices/authSlice'
import { useForm, SubmitHandler } from 'react-hook-form'
// import { Link } from 'react-router-dom'
import { useThunkDispatch } from 'hooks'
import { yupResolver } from '@hookform/resolvers/yup'
import { schema } from 'utils/yup/yup'

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
  const user = useSelector((state: RootState) => state.auth.user)

  // const handleSignup = handleSubmit((data) => {
  //   dispatch(
  //     signUpUserThunk({
  //       email: data.email,
  //       password: data.password,
  //     })
  //   )
  // })

  const handleLogin: SubmitHandler<FormData> = (data) => {
    dispatch(
      loginUserThunk({
        email: data.email,
        password: data.password,
      })
    )
  }

  const googleLogin = () => {
    dispatch(googleUserThunk())
  }

  return (
    <div className="card-body">
      <div className="py-5">
        User: <br />
        {JSON.stringify(user?.email)}
      </div>
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
          <label className="label">
            {/* <a href="#" className="label-text-alt link link-hover">
            Forgot password?
          </a> */}
          </label>
        </div>
        <div className="form-control mt-6">
          <button type="submit" className="btn btn-primary">
            Login
          </button>
        </div>
      </form>
      <div>
        <label className="label flex justify-center">or</label>
        <span>Continue with</span>
        <img
          src="https://cdn-icons-png.flaticon.com/512/2875/2875404.png"
          alt="googleAuth"
          className="w-8 h-8 flex"
          onClick={googleLogin}
        />
      </div>
    </div>
  )
}

export default LoginForm
