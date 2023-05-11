import { FC } from 'react'

const CheckoutForm: FC = () => {
  return (
    <div className="card-body">
      <form onSubmit={() => {}}>
        <div className="form-control">
          <label className="label">
            <span className="label-text">First name</span>
          </label>
          <input
            type="text"
            placeholder="First name"
            className="input input-bordered"
            // {...register('email', { required: true })}
          />
          {/* <p role="alert">{errors.email?.message}</p> */}
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Last name</span>
          </label>
          <input
            type="text"
            placeholder="Last name"
            className="input input-bordered"
            // {...register('password', { required: true })}
          />
          {/* <p>{errors.password?.message}</p> */}
        </div>
        <div className="form-control mt-6">
          <button type="submit" className="btn btn-primary">
            Complete purchase
          </button>
        </div>
      </form>
    </div>
  )
}

export default CheckoutForm
