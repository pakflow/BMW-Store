import { FC, useCallback, useEffect, useMemo, useState } from 'react'
import { ProductCard } from 'ui/ProductCard'
import { Search } from 'ui/Search'
import { Pagination } from 'ui/Pagination'
import { useSelector } from 'react-redux'
import { useThunkDispatch } from 'utils/hooks'
import { getProductsAsyncThunk, selectors } from 'store/slices/productSlice'
import { ProductEntity } from 'entities/ProductEntity'
import { ProductsLoading } from 'ui/ProductsLoading'

const ProductList: FC = () => {
  const products = useSelector(selectors.products)
  const productsLoading = useSelector(selectors.productsLoading)
  const productsLoaded = useSelector(selectors.productsLoaded)

  const dispatch = useThunkDispatch()

  useEffect(() => {
    dispatch(getProductsAsyncThunk())
  }, [dispatch])

  const [page, setPage] = useState(1)

  const OFFSET = 8
  const pagesCount = Math.ceil(products.length / OFFSET)

  const productsSliced = useMemo(() => {
    return products.slice((page - 1) * OFFSET, page * OFFSET)
  }, [page, products])

  const changePage = useCallback((value: number) => {
    setPage(value)
  }, [])

  const productsList = useMemo(() => {
    return products.length ? (
      <div className="grid grid-cols-4">
        {productsSliced.map((product: ProductEntity) => {
          return <ProductCard key={product.id} product={product} />
        })}
      </div>
    ) : (
      <div>Products list empty</div>
    )
  }, [products, productsSliced])

  if (productsLoading) {
    return <ProductsLoading />
  }

  return (
    <div>
      <Search />
      {productsLoaded && productsList}
      {productsLoaded && products.length && (
        <Pagination
          totalCount={pagesCount}
          currentPage={page}
          onPageChange={(value: number) => changePage(value)}
        />
      )}
    </div>
  )
}

export default ProductList
