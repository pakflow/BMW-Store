import AdminCategoryList from '@components/AdminCategoryList/AdminCategoryList'
import AdminProductList from '@components/AdminProductList/AdminProductList'
import AdminLayout from 'layouts/AdminLayout/AdminLayout'
import { FC } from 'react'

const AdminPage: FC = () => {
  return (
    <AdminLayout>
      <AdminProductList />
      <AdminCategoryList />
    </AdminLayout>
  )
}

export default AdminPage
