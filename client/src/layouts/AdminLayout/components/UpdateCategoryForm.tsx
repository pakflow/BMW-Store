import { CategoryEntity } from 'entities/CategoryEntity'
import { FC } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { updateCategoryAsyncThunk } from 'store/slices/categoriesSlice'
import { Modal } from 'ui/Modal'
import { useThunkDispatch } from 'utils/hooks'

interface Props {
  category: CategoryEntity
  onClose: () => void
  isOpen: boolean
}

const UpdateCategoryForm: FC<Props> = ({ category, onClose, isOpen }) => {
  const { handleSubmit, register } = useForm<CategoryEntity>({
    defaultValues: category,
  })

  const dispatch = useThunkDispatch()

  const handleUpdateCategory: SubmitHandler<CategoryEntity> = (data) => {
    dispatch(
      updateCategoryAsyncThunk({
        data: {
          category: data.category,
          id: data.id,
        },
        onSuccess: onClose,
      })
    )
  }

  return (
    <Modal onClose={onClose} open={isOpen}>
      <div className="card-body">
        <form onSubmit={handleSubmit(handleUpdateCategory)}>
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
              Update Category
            </button>
          </div>
        </form>
      </div>
    </Modal>
  )
}

export default UpdateCategoryForm
