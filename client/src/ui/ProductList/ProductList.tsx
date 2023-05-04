import { FC, useCallback, useMemo } from 'react'
import { ProductCard, Pagination, ProductsLoading } from 'ui'
import { ProductEntity } from 'entities/ProductEntity'
import { cartSlice } from 'store/slices/cartSlice'
import { useThunkDispatch } from 'utils/hooks'

interface ProductsProps {
  products: ProductEntity[]
  loading: boolean
  pagination: {
    totalPages: number
    currentPage: number
  }
  changePage: (page: number) => void
}

const ProductList: FC<ProductsProps> = ({
  products,
  loading,
  pagination,
  changePage,
}) => {
  const OFFSET = 8

  const productsSliced = useMemo(() => {
    return products.slice(
      (pagination.currentPage - 1) * OFFSET,
      pagination.currentPage * OFFSET
    )
  }, [pagination.currentPage, products])

  const dispatch = useThunkDispatch()

  const addToCart = useCallback(
    (product: ProductEntity) => {
      dispatch(cartSlice.actions.addToCart(product))
    },
    [dispatch]
  )

  const productsList = useMemo(() => {
    return products.length ? (
      <div className="grid grid-cols-4">
        {productsSliced.map((product: ProductEntity) => {
          return (
            <ProductCard
              key={product.id}
              product={product}
              addToCart={addToCart}
            />
          )
        })}
      </div>
    ) : (
      <div>Products list empty</div>
    )
  }, [products, productsSliced, addToCart])

  if (loading) {
    return <ProductsLoading />
  }

  return (
    <div>
      {!loading && productsList}
      {!loading && products.length && (
        <Pagination
          totalCount={pagination.totalPages}
          currentPage={pagination.currentPage}
          onPageChange={changePage}
        />
      )}
    </div>
  )
}

export default ProductList
