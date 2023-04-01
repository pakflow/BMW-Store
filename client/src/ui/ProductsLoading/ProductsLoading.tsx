import { FC } from 'react'

const ProductsLoading: FC = () => {
  return (
    <div className="grid grid-cols-4">
      <div className="card w-80 h-72 m-4 bg-base-100 shadow-xl">
        <figure>
          <img src="" alt="bmw" />
        </figure>
        <div className="card-body">
          <div className="card-title text-lg"></div>
          <div className="card-actions justify-end">
            <button className="btn w-15">Buy</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductsLoading
