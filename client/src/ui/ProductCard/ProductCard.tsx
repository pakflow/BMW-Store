import { ProductEntity } from 'entities/ProductEntity'
import { FC } from 'react'
interface ProductCardProps {
  product: ProductEntity
  addToCart: (product: ProductEntity) => void
}

const ProductCard: FC<ProductCardProps> = ({ product, addToCart }) => {
  return (
    <div className="card w-80 h-72 m-4 bg-base-100 shadow-xl">
      <figure>
        <img src={product.imageUrl} alt="bmw" className="w-15 h-15" />
      </figure>
      <div className="card-body">
        <h2 className="card-title text-lg">{product.name}</h2>
        <p className="text-sm">{product.price} USD</p>
        <div className="card-actions justify-end">
          <button className="btn w-15" onClick={() => addToCart(product)}>
            Buy
          </button>
        </div>
      </div>
    </div>
  )
}

export default ProductCard
