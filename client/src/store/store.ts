import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { authSlice } from './slices/authSlice'
import { categoriesSlice } from './slices/categoriesSlice'
import { productSlice } from './slices/productSlice'
import { singleProductSlice } from './slices/singleProductSlice'
import { cartSlice } from './slices/cartSlice'

const rootReducers = combineReducers({
  auth: authSlice.reducer,
  products: productSlice.reducer,
  product: singleProductSlice.reducer,
  categories: categoriesSlice.reducer,
  cart: cartSlice.reducer,
})

const store = configureStore({
  reducer: rootReducers,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
})

export type RootState = ReturnType<typeof rootReducers>

export type AppDispatch = typeof store.dispatch

export default store
