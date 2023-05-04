import { FC } from 'react'
import { AdminCategoryList, AdminProductList } from '@components/index'
import { AdminLayout } from 'layouts'

const AdminPage: FC = () => {
  return (
    <AdminLayout>
      <AdminProductList />
      <AdminCategoryList />
    </AdminLayout>
  )
}

export default AdminPage
