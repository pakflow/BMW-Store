import { FC, PropsWithChildren } from 'react'
import MainLayout from 'layouts/MainLayout/MainLayout'
import ProductList from '@components/ProductList/ProductList'
import Filterbar from '@components/Filterbar/Filterbar'

const MainPage: FC<PropsWithChildren> = () => {
  return (
    <MainLayout>
      <Filterbar />
      <ProductList />
    </MainLayout>
  )
}

export default MainPage
