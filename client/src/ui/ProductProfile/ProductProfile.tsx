import { FC, useMemo } from 'react'
import { useSelector } from 'react-redux'
import { singleProductSelector } from 'store/slices/singleProductSlice'

const ProductProfile: FC = () => {
  const currentProduct = useSelector(singleProductSelector.singleProduct)
  console.log(currentProduct)
  const data = useMemo(() => {
    if (currentProduct) {
      return (
        <div>
          <img src={currentProduct.imageUrl} alt={currentProduct.name} />
          <p>{currentProduct.name}</p>
        </div>
      )
    }
  }, [currentProduct])
  return <div>{data}</div>
}

export default ProductProfile
