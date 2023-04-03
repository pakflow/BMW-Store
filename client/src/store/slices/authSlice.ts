import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { googleAuth, login, logout, signUp } from 'utils/auth/auth'
import { User } from 'firebase/auth'

export const signUpUserAsyncThunk = createAsyncThunk(
  'auth/signUp',
  async (data: { email: string; password: string }) => {
    const response = await signUp(data.email, data.password)
    return response.user
  }
)

export const loginUserAsyncThunk = createAsyncThunk(
  'auth/login',
  async (data: { email: string; password: string }) => {
    const response = await login(data.email, data.password)
    console.log(response.user)
    localStorage.setItem('user', JSON.stringify(response.user))
    return response.user
  }
)

export const googleUserAsyncThunk = createAsyncThunk(
  'auth/google',
  async () => {
    const response = await googleAuth()
    console.log(response)
    localStorage.setItem('user', JSON.stringify(response))
    return response
  }
)

export const logoutUserAsyncThunk = createAsyncThunk(
  'auth/logout',
  async () => {
    const response = await logout()
    localStorage.removeItem('user')
    return response
  }
)

export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: JSON.parse(localStorage.getItem('user') ?? 'null'),
  } as { user: User | null },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(signUpUserAsyncThunk.fulfilled, (state, action) => {
      state.user = action.payload
    })
    builder.addCase(loginUserAsyncThunk.fulfilled, (state, action) => {
      state.user = action.payload
    })
    builder.addCase(logoutUserAsyncThunk.fulfilled, (state) => {
      state.user = null
    })
    builder.addCase(googleUserAsyncThunk.fulfilled, (state, action) => {
      state.user = action.payload
    })
  },
})
