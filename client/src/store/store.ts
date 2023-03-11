import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { authSlice } from './slices/authSlice'
import { productSlice } from './slices/productSlice'

const rootReducers = combineReducers({
  auth: authSlice.reducer,
  api: productSlice.reducer,
})

const store = configureStore({
  reducer: rootReducers,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
})

export type RootState = ReturnType<typeof rootReducers>

export type AppDispatch = typeof store.dispatch

export default store
