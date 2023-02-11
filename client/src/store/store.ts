import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { authSlice } from './slices/authSlice'

const rootReducers = combineReducers({
  auth: authSlice.reducer,
})

const store = configureStore({
  reducer: rootReducers,
})

export type RootState = ReturnType<typeof rootReducers>

export default store
