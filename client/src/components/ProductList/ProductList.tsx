import { FC, useEffect, useMemo } from 'react'
import ProductCard from 'ui/ProductCard/ProductCard'
import Search from 'ui/Search/Search'
import Pagination from 'ui/Pagination/Pagination'
import { useSelector } from 'react-redux'
import { RootState } from 'store/store'
import { useThunkDispatch } from 'utils/hooks'
import { getProductsThunk } from 'store/slices/productSlice'
import LoadingSpinner from 'ui/LoadingSpinner/LoadingSpinner'

const ProductList: FC = () => {
  const products = useSelector((state: RootState) => state.products.products)
  const productsLoadingStatus = useSelector(
    (state: RootState) => state.products.loading
  )

  const dispatch = useThunkDispatch()

  useEffect(() => {
    dispatch(getProductsThunk())
  }, [dispatch])

  const productsList = useMemo(() => {
    return products.length ? (
      <div className="grid grid-cols-4">
        {products.map((product) => {
          return <ProductCard product={product} />
        })}
      </div>
    ) : (
      <div>Products list empty</div>
    )
  }, [products])

  if (productsLoadingStatus) {
    return <LoadingSpinner />
  }

  return (
    <div>
      <Search />
      {productsLoadingStatus ? <LoadingSpinner /> : productsList}
      <Pagination />
    </div>
  )
}

export default ProductList
