import { uuidv4 } from '@firebase/util'
import { CategoryEntity } from 'entities/CategoryEntity'
import { FC } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { createCategoryAsyncThunk } from 'store/slices/categoriesSlice'
import { useThunkDispatch } from 'utils/hooks'

interface CreateCategoryFormProps {
  close: () => void
}

const CreateCategoryForm: FC<CreateCategoryFormProps> = ({ close }) => {
  const { handleSubmit, register } = useForm<CategoryEntity>()

  const dispatch = useThunkDispatch()

  const handleCreateCategory: SubmitHandler<CategoryEntity> = (data) => {
    dispatch(
      createCategoryAsyncThunk({
        data: {
          category: data.category,
          id: uuidv4(),
        },
        onSuccess: () => close(),
      })
    )
  }
  return (
    <div className="card-body">
      <form onSubmit={handleSubmit(handleCreateCategory)}>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Category name</span>
          </label>
          <input
            type="text"
            placeholder="Category Name"
            className="input input-bordered"
            {...register('category')}
          />
        </div>
        <div className="form-control mt-6">
          <button type="submit" className="btn btn-primary">
            Add Category
          </button>
        </div>
      </form>
    </div>
  )
}

export default CreateCategoryForm
