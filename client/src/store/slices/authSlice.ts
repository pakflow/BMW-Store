import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { googleAuth, login, logout, signUp } from 'utils/auth/auth'
import { User } from 'firebase/auth'

export const signUpUserThunk = createAsyncThunk(
  'auth/signUp',
  async (data: { email: string; password: string }) => {
    const response = await signUp(data.email, data.password)
    return response.user
  }
)

export const loginUserThunk = createAsyncThunk(
  'auth/login',
  async (data: { email: string; password: string }) => {
    const response = await login(data.email, data.password)
    console.log(response.user)
    localStorage.setItem('user', JSON.stringify(response.user))
    return response.user
  }
)

export const googleUserThunk = createAsyncThunk(
  'auth/google',
  async (data: { email: string }) => {
    const response = await googleAuth()
    localStorage.setItem('user', JSON.stringify(response))
    return response
  }
)

export const logoutUserThunk = createAsyncThunk('auth/logout', async () => {
  const response = await logout()
  localStorage.removeItem('user')
  return response
})

export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: JSON.parse(localStorage.getItem('user') ?? 'null'),
  } as { user: User | null },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(signUpUserThunk.fulfilled, (state, action) => {
      state.user = action.payload
    })
    builder.addCase(loginUserThunk.fulfilled, (state, action) => {
      state.user = action.payload
    })
    builder.addCase(logoutUserThunk.fulfilled, (state) => {
      state.user = null
    })
    builder.addCase(googleUserThunk.fulfilled, (state, action) => {
      state.user = action.payload
    })
  },
})
