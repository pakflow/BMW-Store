import { FC } from 'react'

const CheckoutForm: FC = () => {
  return (
    <div className="card-body">
      <form onSubmit={() => {}}>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Email</span>
          </label>
          <input
            type="email"
            placeholder="email"
            className="input input-bordered"
            // {...register('email', { required: true })}
          />
          {/* <p role="alert">{errors.email?.message}</p> */}
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Password</span>
          </label>
          <input
            type="password"
            placeholder="password"
            className="input input-bordered"
            // {...register('password', { required: true })}
          />
          {/* <p>{errors.password?.message}</p> */}
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
          // onClick={googleLogin}
        />
      </div>
    </div>
  )
}

export default CheckoutForm
