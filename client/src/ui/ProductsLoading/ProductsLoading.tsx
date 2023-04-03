import { FC } from 'react'
import { Search } from 'ui/Search'

const ProductsLoading: FC = () => {
  const totalPulseCards = Array.from({ length: 8 }, (_, k) => k)
  return (
    <div>
      <Search />
      <div className="grid grid-cols-4">
        {totalPulseCards.map(() => (
          <div className="card w-80 h-72 m-4 bg-base-100 shadow-xl">
            <figure className="">
              <div className="animate-pulse" />
            </figure>
            <div className="card-body">
              <p className="card-title w-15 h-2 text-lg animate-pulse"></p>
              <div className="card-actions justify-end animate-pulse">
                <button className="btn w-16 animate-pulse"></button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ProductsLoading
