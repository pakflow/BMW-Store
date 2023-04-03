import { ProductEntity } from 'entities/ProductEntity'
import { FC } from 'react'
interface Props {
  product: ProductEntity
}

const ProductCard: FC<Props> = ({ product }) => {
  return (
    <div className="card w-80 h-72 m-4 bg-base-100 shadow-xl">
      <figure>
        <img src={product.imageUrl} alt="bmw" className="w-15 h-15" />
      </figure>
      <div className="card-body">
        <h2 className="card-title text-lg">{product.name}</h2>
        <div className="card-actions justify-end">
          <button className="btn w-15">Buy</button>
        </div>
      </div>
    </div>
  )
}

export default ProductCard
