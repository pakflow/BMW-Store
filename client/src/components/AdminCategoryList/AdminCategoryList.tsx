import { CategoryEntity } from 'entities/CategoryEntity'
import { UpdateCategoryForm } from 'layouts/AdminLayout/components'
import { useCallback, useState } from 'react'
import { useSelector } from 'react-redux'
import {
  categoriesSelectors,
  deleteCategoryAsyncThunk,
} from 'store/slices/categoriesSlice'
import { useModal, useThunkDispatch } from 'utils/hooks'

const AdminCategoryList = () => {
  const categories = useSelector(categoriesSelectors.categories)

  const dispatch = useThunkDispatch()

  const [selectedCategory, setSelectedCategory] =
    useState<CategoryEntity | null>(null)

  const { isOpen, open, close } = useModal()

  const openCreateCategory = useCallback(() => {
    window.dispatchEvent(new Event('BS:open_createCategory'))
  }, [])

  const openUpdateCategory = useCallback(
    (category: CategoryEntity) => {
      open()

      setSelectedCategory(category)
    },
    [open]
  )

  const handleDeleteCategory = useCallback(
    (category: CategoryEntity) => {
      dispatch(deleteCategoryAsyncThunk(category.id))
    },
    [dispatch]
  )

  return (
    <>
      <div className="overflow-x-auto w-full">
        <table className="table w-full">
          {/* head */}
          <thead>
            <tr>
              <th>
                <label>
                  <input type="checkbox" className="checkbox" />
                </label>
              </th>
              <th>Category</th>
              <th>Description</th>
              <th>Price</th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {categories.map((category: CategoryEntity) => {
              return (
                <tr>
                  <th>
                    <label>
                      <input type="checkbox" className="checkbox" />
                    </label>
                  </th>
                  <td>
                    <div className="flex items-center space-x-3">
                      <div className="font-bold">{category.category}</div>
                    </div>
                  </td>
                  <th>
                    <button
                      className="btn btn-ghost btn-xs"
                      onClick={() => openUpdateCategory(category)}
                    >
                      update
                    </button>
                  </th>
                  <th>
                    <button
                      className="btn btn-ghost btn-xs"
                      onClick={() => handleDeleteCategory(category)}
                    >
                      delete
                    </button>
                  </th>
                </tr>
              )
            })}
          </tbody>
          {/* foot */}
          <tfoot>
            <tr>
              <th></th>
              <th>Category</th>
              <th>Description</th>
              <th>Price</th>
              <th></th>
              <th></th>
            </tr>
          </tfoot>
        </table>
        <button className="btn" onClick={openCreateCategory}>
          Create Category
        </button>
      </div>
      {selectedCategory ? (
        <UpdateCategoryForm
          category={selectedCategory}
          isOpen={isOpen}
          onClose={close}
        />
      ) : null}
    </>
  )
}

export default AdminCategoryList
