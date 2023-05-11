import { ProductEntity } from 'entities/ProductEntity'
import { ProductLayout } from 'layouts'
import { FC, useCallback, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { cartSlice } from 'store/slices/cartSlice'
import { getSingleProductAsyncThunk } from 'store/slices/singleProductSlice'
import { ProductProfile } from 'ui'
import { useThunkDispatch } from 'utils/hooks'

const ProductPage: FC = () => {
  const { id } = useParams()
  const dispatch = useThunkDispatch()
  const getProduct = useCallback(() => {
    if (id) {
      dispatch(getSingleProductAsyncThunk(id))
    }
  }, [id, dispatch])

  useEffect(() => {
    getProduct()
  }, [getProduct])

  const addToCart = useCallback(
    (currentProduct: ProductEntity) => {
      dispatch(cartSlice.actions.addToCart(currentProduct))
    },
    [dispatch]
  )

  return (
    <ProductLayout>
      <ProductProfile addToCart={addToCart} />
    </ProductLayout>
  )
}

export default ProductPage
