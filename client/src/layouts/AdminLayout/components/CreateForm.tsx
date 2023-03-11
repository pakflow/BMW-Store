import { IProduct } from 'db/db'
import { FC } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { createProductThunk } from 'store/slices/productSlice'
import { useThunkDispatch } from 'utils/hooks'
import { uuidv4 } from '@firebase/util'

const CreateForm: FC = () => {
  const { register, handleSubmit } = useForm<IProduct>()

  const dispatch = useThunkDispatch()

  const handleCreateProduct: SubmitHandler<IProduct> = (data) => {
    console.log(data)
    dispatch(
      createProductThunk({
        name: data.name,
        price: data.price,
        capacity: data.capacity,
        buildYear: data.buildYear,
        id: uuidv4(),
        imageUrl: data.imageUrl,
        description: data.description,
        rating: 0,
        category: { id: uuidv4(), name: data.category.name },
      })
    )
  }

  return (
    <div>
      <div className="card-body">
        <form onSubmit={handleSubmit(handleCreateProduct)}>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Name</span>
            </label>
            <input
              type="text"
              placeholder="Name"
              className="input input-bordered"
              {...register('name')}
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Price</span>
            </label>
            <input
              type="number"
              placeholder="price"
              className="input input-bordered"
              {...register('price')}
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Year</span>
            </label>
            <input
              type="number"
              placeholder="year"
              className="input input-bordered"
              {...register('buildYear')}
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Image</span>
            </label>
            <input
              type="url"
              placeholder="image"
              className="input input-bordered"
              {...register('imageUrl')}
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Engine</span>
            </label>
            <select
              className="select select-bordered"
              {...register('category.name')}
            >
              <option disabled selected>
                choose one
              </option>
              <option>petrol</option>
              <option>hybrid</option>
              <option>electro</option>
              <option>diesel</option>
            </select>
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Engine capacity</span>
            </label>
            <select
              className="select select-bordered"
              {...register('capacity')}
            >
              <option disabled selected>
                choose one
              </option>
              <option>2</option>
              <option>2.5</option>
              <option>2.8</option>
              <option>3.5</option>
            </select>
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Description</span>
            </label>
            <input
              type="text"
              placeholder="description"
              className="input input-bordered"
              {...register('description')}
            />
          </div>
          <div className="form-control mt-6">
            <button type="submit" className="btn btn-primary">
              Add Product
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default CreateForm
