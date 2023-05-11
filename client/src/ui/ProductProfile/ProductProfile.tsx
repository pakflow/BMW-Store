import { ProductEntity } from 'entities/ProductEntity'
import { FC, useMemo } from 'react'
import { useSelector } from 'react-redux'
import { singleProductSelector } from 'store/slices/singleProductSlice'
import ProductProfileLoading from 'ui/ProductProfileLoading/ProductProfileLoading'
interface ProductProfileProps {
  addToCart: (currentProduct: ProductEntity) => void
}

const ProductProfile: FC<ProductProfileProps> = ({ addToCart }) => {
  const currentProduct = useSelector(singleProductSelector.singleProduct)
  // const currentProductLoading = useSelector(
  //   singleProductSelector.singleProductLoading
  // )
  // const currentProductLoaded = useSelector(
  //   singleProductSelector.singleProductLoaded
  // )
  // const currentProductFailed = useSelector(
  //   singleProductSelector.singleProductFailed
  // )
  const data = useMemo(() => {
    if (currentProduct) {
      return (
        <div className="p-24 grid grid-cols-2">
          <img
            src={currentProduct.imageUrl}
            className="w-full"
            alt={currentProduct.name}
          />
          <div className="product_descriptions mx-24">
            <p className="py-4 text-2xl font-bold">{currentProduct.name}</p>
            <p className="py-2 font-semibold">${currentProduct.price}</p>
            <p>{currentProduct.category.category}</p>
            <p className="py-2 font-semibold">
              Year: {currentProduct.buildYear}
            </p>
            <p className="py-2 font-semibold">
              Engine capacity: {currentProduct.capacity}
            </p>
            <p className="py-2 font-semibold">{currentProduct.description}</p>
            <div className="rating py-2">
              <input type="radio" name="rating-1" className="mask mask-star" />
              <input
                type="radio"
                name="rating-1"
                className="mask mask-star"
                checked
              />
              <input type="radio" name="rating-1" className="mask mask-star" />
              <input type="radio" name="rating-1" className="mask mask-star" />
              <input type="radio" name="rating-1" className="mask mask-star" />
            </div>
            <button
              className="block my-2 btn"
              onClick={() => addToCart(currentProduct)}
            >
              Buy
            </button>
          </div>
        </div>
      )
    }
  }, [currentProduct, addToCart])

  // if (currentProductLoading) return <ProductProfileLoading />
  // if (currentProductFailed) {
  //   return <div>{'smth_went_wrong'}</div>
  // }

  return <div>{data}</div>
}

export default ProductProfile
