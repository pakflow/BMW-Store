import { AdminPage } from 'pages'
import { MainPage } from 'pages'
import { ProductPage } from 'pages/'
import { createBrowserRouter } from 'react-router-dom'

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainPage />,
    errorElement: <div>Not Found</div>,
  },
  {
    path: '/admin',
    element: <AdminPage />,
    errorElement: <div>Not Found</div>,
  },
  {
    path: '/product/:id',
    element: <ProductPage />,
  },
])

export default router
