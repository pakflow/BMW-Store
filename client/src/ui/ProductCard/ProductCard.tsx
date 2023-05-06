import { ProductEntity } from 'entities/ProductEntity'
import { FC, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
interface ProductCardProps {
  product: ProductEntity
  addToCart: (product: ProductEntity) => void
}

const ProductCard: FC<ProductCardProps> = ({ product, addToCart }) => {
  const navigate = useNavigate()
  const goToProductPage = useCallback(() => {
    navigate(`/product/${product.id}`)
  }, [product, navigate])

  return (
    <div className="card w-96 h-80 m-4 bg-base-100 shadow-xl">
      <figure className="cursor-pointer" onClick={goToProductPage}>
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
