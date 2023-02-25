import AuthContextProvider from 'context/AuthContextProvider'
import { Provider } from 'react-redux'
import store from 'store/store'
import { RouterProvider } from 'react-router-dom'
import router from 'router/Router'

import 'assets/css/normalize.css'

const App = () => {
  return (
    <>
      <Provider store={store}>
        <AuthContextProvider>
          <RouterProvider router={router} />
        </AuthContextProvider>
      </Provider>
    </>
  )
}

export default App
