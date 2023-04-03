import { FC, PropsWithChildren } from 'react'
import { MainLayout } from 'layouts/MainLayout'
import { ProductList } from '@components/ProductList'
import { Filterbar } from '@components/Filterbar'

const MainPage: FC<PropsWithChildren> = () => {
  return (
    <MainLayout>
      <Filterbar />
      <ProductList />
    </MainLayout>
  )
}

export default MainPage
