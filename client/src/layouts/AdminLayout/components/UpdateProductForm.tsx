import { ProductEntity } from 'entities/ProductEntity'
import { FC, useEffect } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useSelector } from 'react-redux'
import { getCategoriesAsyncThunk } from 'store/slices/categoriesSlice'
import { updateProductThunk } from 'store/slices/productSlice'
import { RootState } from 'store/store'
import { Modal } from 'ui/Modal'
import { useThunkDispatch } from 'utils/hooks'

interface Props {
  product: ProductEntity
  close: () => void
  isOpen: boolean
}

const UpdateProductForm: FC<Props> = ({ product, close, isOpen }) => {
  const { register, handleSubmit } = useForm<ProductEntity>({
    defaultValues: product,
  })

  const dispatch = useThunkDispatch()

  const handleUpdateProduct: SubmitHandler<ProductEntity> = (data) => {
    dispatch(
      updateProductThunk({
        data: {
          name: data.name,
          price: data.price,
          capacity: data.capacity,
          buildYear: data.buildYear,
          imageUrl: data.imageUrl,
          id: data.id,
          description: data.description,
          category: data.category,
          rating: data.rating,
        },
        onSuccess: () => close(),
      })
    )
  }

  const categories = useSelector(
    (state: RootState) => state.categories.categories
  )

  useEffect(() => {
    dispatch(getCategoriesAsyncThunk())
  }, [dispatch])

  return (
    <Modal onClose={close} open={isOpen}>
      <div>
        <div className="card-body">
          <form onSubmit={handleSubmit(handleUpdateProduct)}>
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
                {...register('category')}
              >
                <option disabled selected>
                  choose one
                </option>
                {categories.map((data) => (
                  <option>{data.category}</option>
                ))}
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
                Update Product
              </button>
            </div>
          </form>
        </div>
      </div>
    </Modal>
  )
}

export default UpdateProductForm
