import { DocumentData } from 'firebase/firestore'
import AdminLayout from 'layouts/AdminLayout/AdminLayout'
import { FC, useCallback, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { getProductsThunk } from 'store/slices/productSlice'
import { RootState } from 'store/store'
import { useThunkDispatch } from 'utils/hooks'

const AdminPage: FC = () => {
  const products = useSelector((state: RootState) => state.api.products)

  const dispatch = useThunkDispatch()

  useEffect(() => {
    dispatch(getProductsThunk())
  }, [dispatch])

  const openCreateProduct = useCallback(() => {
    window.dispatchEvent(new Event('BS:open_createProduct'))
  }, [])

  return (
    <AdminLayout>
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
              <th>Name</th>
              <th>Description</th>
              <th>Price</th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {products.map((prod: DocumentData) => {
              return (
                <tr>
                  <th>
                    <label>
                      <input type="checkbox" className="checkbox" />
                    </label>
                  </th>
                  <td>
                    <div className="flex items-center space-x-3">
                      <div className="avatar">
                        <div className="mask mask-squircle w-12 h-12">
                          <img
                            src={prod.imageUrl}
                            alt="Avatar Tailwind CSS Component"
                          />
                        </div>
                      </div>
                      <div>
                        <div className="font-bold">{prod.name}</div>
                        <div className="text-sm opacity-50">
                          {prod.category.name}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td>
                    {prod.description.slice(0, 20)}...
                    <br />
                    <span className="badge badge-ghost badge-sm">
                      {prod.capacity}
                    </span>
                    <span className="badge badge-ghost badge-sm">
                      {prod.buildYear}
                    </span>
                  </td>
                  <td>{prod.price}$</td>
                  <th>
                    <button className="btn btn-ghost btn-xs">details</button>
                  </th>
                  <th>
                    <button className="btn btn-ghost btn-xs">delete</button>
                  </th>
                </tr>
              )
            })}
          </tbody>
          {/* foot */}
          <tfoot>
            <tr>
              <th></th>
              <th>Name</th>
              <th>Description</th>
              <th>Price</th>
              <th></th>
              <th></th>
            </tr>
          </tfoot>
        </table>
        <button className="btn" onClick={openCreateProduct}>
          Create Product
        </button>
      </div>
    </AdminLayout>
  )
}

export default AdminPage
