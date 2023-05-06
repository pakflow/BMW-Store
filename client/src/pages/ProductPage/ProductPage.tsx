import { ProductLayout } from 'layouts'
import { FC, useCallback, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { getSingleProductAsyncThunk } from 'store/slices/singleProductSlice'
import { ProductProfile } from 'ui'
import { useThunkDispatch } from 'utils/hooks'

const ProductPage: FC = () => {
  const { productId } = useParams()
  const dispatch = useThunkDispatch()
  const getProduct = useCallback(() => {
    if (productId) {
      dispatch(getSingleProductAsyncThunk(productId))
    }
  }, [productId, dispatch])

  useEffect(() => {
    getProduct()
  }, [getProduct])

  return (
    <ProductLayout>
      <ProductProfile />
    </ProductLayout>
  )
}

export default ProductPage
