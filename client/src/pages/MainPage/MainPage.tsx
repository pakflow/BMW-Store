import { FC, PropsWithChildren, useCallback, useEffect, useState } from 'react'
import { MainLayout } from 'layouts'
import { Filterbar, ProductList, Search } from 'ui'
import { useSelector } from 'react-redux'
import { useThunkDispatch } from 'utils/hooks'
import { useSearchParams } from 'react-router-dom'
import { categoriesState, productsState } from 'store'
import { categoriesSelectors } from 'store/slices/categoriesSlice'
import { productsSelectors } from 'store/slices/productSlice'

const MainPage: FC<PropsWithChildren> = () => {
  const [search, setSearch] = useState<string>('')
  const handleSearch = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value)
  }, [])

  const [searchParams, setSearchParams] = useSearchParams()

  const products = useSelector(productsSelectors.products)
  const productsLoading = useSelector(productsSelectors.productsLoading)

  const [page, setPage] = useState(parseInt(searchParams.get('page') as string))

  const OFFSET = 8
  const pagesCount = Math.ceil(products.length / OFFSET)

  const changePage = useCallback(
    (value: number) => {
      setPage(value)
      setSearchParams({ page: value.toString() })
    },
    [setSearchParams]
  )

  const dispatch = useThunkDispatch()

  const [priceQuery, setPriceQuery] = useState<number>(0)
  const [yearQuery, setYearQuery] = useState<number>(0)
  const [engineQuery, setEngineQuery] = useState<string>('')
  const [capacityQuery, setCapacityQuery] = useState<number>(0)

  const getProducts = useCallback(() => {
    dispatch(
      productsState.getProductsAsyncThunk({
        search,
        priceQuery,
        yearQuery,
        engineQuery,
        capacityQuery,
      })
    )
  }, [dispatch, search, priceQuery, yearQuery, engineQuery, capacityQuery])

  useEffect(() => {
    getProducts()
  }, [getProducts])

  const getCategories = useCallback(() => {
    dispatch(categoriesState.getCategoriesAsyncThunk())
  }, [dispatch])

  useEffect(() => {
    getCategories()
  }, [getCategories])

  const engineSelector = useSelector(categoriesSelectors.categories)

  const handlePrice = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setPriceQuery(+e.target.value)
  }, [])

  const handleYear = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setYearQuery(+e.target.value)
  }, [])

  const handleEngine = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      setEngineQuery(e.target.value)
    },
    []
  )

  const handleCapacity = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      setCapacityQuery(+e.target.value)
    },
    []
  )

  return (
    <MainLayout>
      <Filterbar
        price={priceQuery.toString()}
        handlePrice={handlePrice}
        year={yearQuery.toString()}
        handleYear={handleYear}
        engine={engineSelector}
        handleEngine={handleEngine}
        handleCapacity={handleCapacity}
      />
      <div>
        <Search onInput={handleSearch} value={search} />
        <ProductList
          products={products}
          loading={productsLoading}
          pagination={{ totalPages: pagesCount, currentPage: page }}
          changePage={changePage}
        />
      </div>
    </MainLayout>
  )
}

export default MainPage
