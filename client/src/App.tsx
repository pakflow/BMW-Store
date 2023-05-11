import { AuthContextProvider } from 'context'
import { Provider } from 'react-redux'
import { store } from 'store'
import { RouterProvider } from 'react-router-dom'
import { router } from 'router'

import 'assets/css/normalize.css'

const App = () => {
  return (
    <Provider store={store}>
      <AuthContextProvider>
        <RouterProvider router={router} />
      </AuthContextProvider>
    </Provider>
  )
}

export default App
