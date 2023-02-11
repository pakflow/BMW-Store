import { FC, PropsWithChildren } from 'react'
import ProductCard from 'ui/ProductCard/ProductCard'
import Search from 'ui/Search/Search'
import Pagination from 'ui/Pagination/Pagination'

const ProductList: FC<PropsWithChildren> = () => {
  return (
    <div>
      <Search />
      <div className="grid grid-cols-4 ">
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
      </div>
      <Pagination />
    </div>
  )
}

export default ProductList
