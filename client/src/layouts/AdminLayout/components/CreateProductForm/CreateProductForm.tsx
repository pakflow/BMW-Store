import { ProductEntity } from 'entities/ProductEntity'
import { FC, useEffect } from 'react'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import { createProductAsyncThunk } from 'store/slices/productSlice'
import { useThunkDispatch } from 'utils/hooks'
import { useSelector } from 'react-redux'
import {
  categoriesSelectors,
  getCategoriesAsyncThunk,
} from 'store/slices/categoriesSlice'
import { uploadFile } from 'services/FileService'
import { FileUploader } from '@components/index'

const CreateProductForm: FC = () => {
  const { register, handleSubmit, control } = useForm<ProductEntity>()

  const dispatch = useThunkDispatch()

  const categories = useSelector(categoriesSelectors.categories)

  const handleCreateProduct: SubmitHandler<ProductEntity> = (data) => {
    dispatch(
      createProductAsyncThunk({
        name: data.name,
        price: +data.price,
        capacity: +data.capacity,
        buildYear: +data.buildYear,
        imageUrl: data.imageUrl,
        description: data.description,
        rating: +0,
        category: data.category,
      })
    )
  }

  useEffect(() => {
    dispatch(getCategoriesAsyncThunk())
  }, [dispatch])

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
            <Controller
              control={control}
              name="imageUrl"
              render={({ field: { onChange, value } }) => (
                <FileUploader
                  upload={uploadFile}
                  value={value}
                  onChange={onChange}
                />
              )}
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
              {categories.map((data) => {
                return <option>{data.category}</option>
              })}
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

export default CreateProductForm
