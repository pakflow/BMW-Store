import MainPage from 'pages/MainPage/MainPage'

import 'assets/css/normalize.css'
import AuthContextProvider from 'context/AuthContextProvider'
import { Provider } from 'react-redux'
import store from 'store/store'

const App = () => {
  return (
    <>
      <Provider store={store}>
        <AuthContextProvider>
          <MainPage />
        </AuthContextProvider>
      </Provider>
    </>
  )
}

export default App
