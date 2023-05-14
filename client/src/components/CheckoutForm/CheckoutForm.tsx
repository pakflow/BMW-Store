import { FC } from 'react'
import { useForm } from 'react-hook-form'
import { useThunkDispatch } from 'utils/hooks'

const CheckoutForm: FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      firstName: '',
      lastName: '',
      country: '',
      city: '',
      adress: '',
      phoneNumber: '',
    },
  })

  const dispatch = useThunkDispatch()

  return (
    <div className="card-body">
      <form onSubmit={() => handleSubmit}>
        <div className="form-control">
          <label className="label">
            <span className="label-text">First name</span>
          </label>
          <input
            type="text"
            placeholder="First name"
            className="input input-bordered"
            {...register('firstName', { required: true })}
          />
          <p role="alert">{errors.firstName?.message}</p>
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Last name</span>
          </label>
          <input
            type="text"
            placeholder="Last name"
            className="input input-bordered"
            {...register('lastName', { required: true })}
          />
          <p>{errors.lastName?.message}</p>
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Country</span>
          </label>
          <input
            type="text"
            placeholder="Your country"
            className="input input-bordered"
            {...register('country', { required: true })}
          />
          <p>{errors.country?.message}</p>
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">City</span>
          </label>
          <input
            type="text"
            placeholder="Your city"
            className="input input-bordered"
            {...register('city', { required: true })}
          />
          <p>{errors.city?.message}</p>
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Adress</span>
          </label>
          <input
            type="text"
            placeholder="Your adress"
            className="input input-bordered"
            {...register('adress', { required: true })}
          />
          <p>{errors.adress?.message}</p>
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Phone Number</span>
          </label>
          <input
            type="tel"
            placeholder="Your phone number"
            className="input input-bordered"
            {...register('phoneNumber', { required: true })}
          />
          <p>{errors.phoneNumber?.message}</p>
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
