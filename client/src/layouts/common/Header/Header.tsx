import { FC } from 'react'
import basket from '@assets/icons/basket.svg'
import bmwlogo from '@assets/icons/bmwlogo.png'
import profile from '@assets/icons/profile.svg'
import { useCallback } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useThunkDispatch } from 'utils/hooks'
import { logoutUserThunk } from 'store/slices/authSlice'
import { FormData } from '@components/LoginForm/LoginForm'
import { useSelector } from 'react-redux'
import { RootState } from 'store/store'
import { Link } from 'react-router-dom'

const Header: FC = () => {
  const openCart = useCallback(() => {
    window.dispatchEvent(new Event('BS:open_cart'))
  }, [])

  const openAuth = useCallback(() => {
    window.dispatchEvent(new Event('BS:open_auth'))
  }, [])

  const openSignup = useCallback(() => {
    window.dispatchEvent(new Event('BS:open_signup'))
  }, [])

  const { handleSubmit } = useForm<FormData>()

  const dispatch = useThunkDispatch()

  const handleLogout: SubmitHandler<FormData> = () => {
    dispatch(logoutUserThunk())
  }

  const user = useSelector((state: RootState) => state.auth.user)

  return (
    <div className="p-4">
      <div className="navbar bg-slate-300 rounded-lg">
        <div className="flex-1">
          <Link to="/">
            <img className="w-10 h-10 ml-6" src={bmwlogo} alt="logo" />
          </Link>
        </div>
        {user ? <span className="badge mx-2">{user?.email}</span> : null}
        <div className="flex-none mx-3">
          <div className="dropdown dropdown-end mr-2">
            <label tabIndex={0} className="btn btn-ghost btn-circle">
              <div className="indicator flex justify-center">
                <img className="w-8 h-8" src={basket} alt="basket" />
                <span className="badge badge-sm indicator-item">8</span>
              </div>
            </label>
            <div
              tabIndex={0}
              className="mt-3 card card-compact dropdown-content w-52 bg-base-100 shadow"
            >
              <div className="card-body">
                <span className="font-bold text-lg">8 Items</span>
                <span className="text-info">Subtotal: $999</span>
                <div className="card-actions">
                  <button
                    onClick={openCart}
                    className="btn btn-primary btn-block"
                  >
                    View cart
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="dropdown dropdown-end">
            <label tabIndex={0} className="btn btn-ghost btn-circle">
              <div className="w-10 rounded-full flex justify-center">
                <img
                  className="w-8 h-8 rounded-full"
                  src={user && user.photoURL ? user.photoURL : profile}
                  alt="profile"
                />
              </div>
            </label>
            <ul
              tabIndex={0}
              className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
            >
              <li>
                <button onClick={openAuth} className="justify-between">
                  Log In
                </button>
              </li>

              <li>
                <button onClick={openSignup}>Sign Up</button>
              </li>
              <li>
                <button onClick={handleSubmit(handleLogout)}>Logout</button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Header
