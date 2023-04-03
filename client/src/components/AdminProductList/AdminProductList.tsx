import { ProductEntity } from 'entities/ProductEntity'
import UpdateProductForm from 'layouts/AdminLayout/components/UpdateProductForm'
import { FC, useCallback, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import {
  deleteProductAsyncThunk,
  getProductsAsyncThunk,
  selectors,
} from 'store/slices/productSlice'
import { useModal, useThunkDispatch } from 'utils/hooks'

const AdminProductList: FC = () => {
  const products = useSelector(selectors.products)

  const { isOpen, open, close } = useModal()

  const [selectedProduct, setSelectedProduct] = useState<ProductEntity | null>(
    null
  )

  const openCreateProduct = useCallback(() => {
    window.dispatchEvent(new Event('BS:open_createProduct'))
  }, [])

  const openUpdateProduct = useCallback(
    (product: ProductEntity) => {
      open()

      setSelectedProduct(product)
    },
    [open]
  )

  const dispatch = useThunkDispatch()

  useEffect(() => {
    dispatch(getProductsAsyncThunk())
  }, [dispatch])

  useEffect(() => {
    window.addEventListener('BS:open_updateProduct', open)

    return () => {
      window.removeEventListener('BS:open_updateProduct', open)
    }
  }, [open])

  const handleDelete = useCallback(
    (product: ProductEntity) => {
      dispatch(deleteProductAsyncThunk(product.id))
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
              <th>Product</th>
              <th>Description</th>
              <th>Price</th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {products.map((data: ProductEntity) => {
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
                            src={data.imageUrl}
                            alt="Avatar Tailwind CSS Component"
                          />
                        </div>
                      </div>
                      <div>
                        <div className="font-bold">{data.name}</div>
                        <div className="text-sm opacity-50">
                          {data.category.category}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td>
                    {data.description.slice(0, 20)}...
                    <br />
                    <span className="badge badge-ghost badge-sm">
                      {data.capacity}
                    </span>
                    <span className="badge badge-ghost badge-sm">
                      {data.buildYear}
                    </span>
                  </td>
                  <td>{data.price}$</td>
                  <th>
                    <button
                      className="btn btn-ghost btn-xs"
                      onClick={() => openUpdateProduct(data)}
                    >
                      update
                    </button>
                  </th>
                  <th>
                    <button
                      className="btn btn-ghost btn-xs"
                      onClick={() => handleDelete(data)}
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
              <th>Product</th>
              <th>Description</th>
              <th>Price</th>
              <th></th>
              <th></th>
            </tr>
          </tfoot>
        </table>
        <button className="btn mt-2" onClick={openCreateProduct}>
          Create Product
        </button>
      </div>
      {selectedProduct ? (
        <UpdateProductForm
          product={selectedProduct}
          isOpen={isOpen}
          close={close}
        />
      ) : null}
    </>
  )
}

export default AdminProductList
