import { FC, PropsWithChildren } from 'react'
import bmwlogo from '@assets/icons/bmwlogo.png'
import basket from '@assets/icons/basket.svg'
import profile from '@assets/icons/profile.svg'

import s from './styles.module.scss'
import useCartManager from 'utils/cart-manager/hooks/useCartManager'

const Navbar: FC<PropsWithChildren> = () => {
  const { open } = useCartManager()

  return (
    <div className="navbar bg-base-100">
      <div className="flex-1">
        <img className={s.logo} src={bmwlogo} alt="logo" />
      </div>
      <div className="flex-none">
        <div className="dropdown dropdown-end">
          <label tabIndex={0} className="btn btn-ghost btn-circle">
            <div className="indicator">
              <img className={s.basket_logo} src={basket} alt="basket" />
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
                <button onClick={open} className="btn btn-primary btn-block">
                  <label
                    htmlFor="my-drawer-4"
                    className="drawer-button btn btn-primary"
                  >
                    View cart
                  </label>
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="dropdown dropdown-end">
          <label tabIndex={0} className="btn btn-ghost btn-circle">
            <div className="w-10 rounded-full">
              <img className={s.profile_logo} src={profile} alt="profile" />
            </div>
          </label>
          <ul
            tabIndex={0}
            className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
          >
            <label htmlFor="my-modal-5">
              <li>
                <a className="justify-between">
                  Profile
                  <span className="badge">New</span>
                </a>
              </li>
            </label>
            <li>
              <a>Settings</a>
            </li>
            <li>
              <a>Logout</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default Navbar
