import { ProductEntity } from 'entities/ProductEntity'
import { FC, useCallback } from 'react'

interface CartProps {
  cartProducts: ProductEntity[]
  onDeletePosition: (product: ProductEntity) => void
  totalPrice: number
  close: () => void
}

const Cart: FC<CartProps> = ({
  cartProducts,
  onDeletePosition,
  totalPrice,
  close,
}) => {
  const openCheckout = useCallback(() => {
    window.dispatchEvent(new Event('BS:open_checkout'))
    close()
  }, [close])
  return (
    <div className="menu p-4 bg-base-100 text-base-content">
      <div className="overflow-x-auto w-full my-4">
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
              <th>Price</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            {cartProducts.map((product) => (
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
                          src={product.imageUrl}
                          alt="Avatar Tailwind CSS Component"
                        />
                      </div>
                    </div>
                    <div>
                      <div className="font-bold">{product.name}</div>
                    </div>
                  </div>
                </td>
                <td>{product.price}</td>
                <th>
                  <button
                    className="btn btn-ghost btn-xs"
                    onClick={() => onDeletePosition(product)}
                  >
                    delete position
                  </button>
                </th>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="stats text-primary-content justify-end">
        <div className="stat">
          <div className="stat-title">Total Price</div>
          <div className="stat-value">${totalPrice}</div>
          <div className="stat-actions">
            <button className="btn btn-sm btn-success" onClick={openCheckout}>
              Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Cart
