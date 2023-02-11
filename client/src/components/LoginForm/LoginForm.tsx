import { ChangeEvent, FC, useCallback, useState, MouseEvent } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from 'store/store'
import { loginUserThunk, signUpUserThunk } from 'store/slices/authSlice'

const LoginForm: FC = () => {
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')

  const user = useSelector((state: RootState) => state.auth.user)

  const dispatch = useDispatch<AppDispatch>()
  // const handleSignup = useCallback(
  //   (event: ChangeEvent<HTMLInputElement>) => {
  //     event.preventDefault()
  //     dispatch(
  //       signUpUserThunk({
  //         email: email,
  //         password: password,
  //       })
  //     )
  //   },
  //   [dispatch, email, password]
  // )

  // const handleLogin = (e: MouseEvent<HTMLElement>) => {
  //   e.preventDefault()

  //   dispatch(
  //     loginUserThunk({
  //       email: email,
  //       password: password,
  //     })
  //   )

  //   console.log(email, password)
  // }

  const handleLogin = useCallback(
    (event: MouseEvent<HTMLElement>) => {
      event.preventDefault()
      dispatch(
        loginUserThunk({
          email: email,
          password: password,
        })
      )
    },
    [dispatch, email, password]
  )

  return (
    <div className="card-body">
      <div className="py-5">
        User: <br />
        {JSON.stringify(user?.email)}
      </div>
      <div className="form-control">
        <label className="label">
          <span className="label-text">Email</span>
        </label>
        <input
          type="email"
          placeholder="email"
          className="input input-bordered"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className="form-control">
        <label className="label">
          <span className="label-text">Password</span>
        </label>
        <input
          type="password"
          placeholder="password"
          className="input input-bordered"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <label className="label">
          {/* <a href="#" className="label-text-alt link link-hover">
            Forgot password?
          </a> */}
        </label>
      </div>
      <div className="form-control mt-6">
        <button type="submit" onClick={handleLogin} className="btn btn-primary">
          Login
        </button>
      </div>
    </div>
  )
}

export default LoginForm
