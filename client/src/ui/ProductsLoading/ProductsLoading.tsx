import { FC } from 'react'

const ProductsLoading: FC = () => {
  const totalPulseCards = Array.from({ length: 8 }, (_, k) => k)
  return (
    <div>
      <div className="grid grid-cols-4 mr-4">
        {totalPulseCards.map(() => (
          <div className="card w-96 h-80 m-4 bg-base-100 shadow-xl animate-pulse">
            <div className="bg-gray-700 rounded-xl w-full h-36"></div>
            <div className="card-body">
              <div className="bg-gray-700 rounded-xl w-48 h-8"></div>
              <div className="card-actions justify-end">
                <button className="bg-gray-700 rounded-xl w-14 h-10"></button>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="bg-gray-700 rounded-xl w-48 h-12 mx-auto animate-pulse"></div>
    </div>
  )
}

export default ProductsLoading
