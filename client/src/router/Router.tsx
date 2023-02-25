import MainPage from 'pages/MainPage/MainPage'
import { createBrowserRouter } from 'react-router-dom'

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainPage />,
    errorElement: <div>Not Found</div>,
  },
])

export default router
