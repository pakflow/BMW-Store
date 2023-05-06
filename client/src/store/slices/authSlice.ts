import { createAsyncThunk, createSelector, createSlice } from '@reduxjs/toolkit'
import { googleAuth, login, logout, signUp } from 'utils/auth/auth'
import { User } from 'firebase/auth'
import { LoadingStatusEntity } from 'entities/LoadingStatusEntity'

const STORE_KEY = 'auth'

interface UserInitialState {
  user: User | null
  loading: LoadingStatusEntity
  errors: string
}

const initialState: UserInitialState = {
  user: JSON.parse(localStorage.getItem('user') ?? 'null'),
  loading: LoadingStatusEntity.NOT_LOADED,
  errors: '',
}

export const signUpUserAsyncThunk = createAsyncThunk(
  `${STORE_KEY}/signUp`,
  async ({
    data,
    onSuccess,
  }: {
    data: { email: string; password: string }
    onSuccess: () => void
  }) => {
    const response = await signUp(data.email, data.password)
    onSuccess?.()
    return response.user
  }
)

export const loginUserAsyncThunk = createAsyncThunk(
  `${STORE_KEY}/login`,
  async ({
    data,
    onSuccess,
  }: {
    data: { email: string; password: string }
    onSuccess: () => void
  }) => {
    const response = await login(data.email, data.password)
    localStorage.setItem('user', JSON.stringify(response.user))
    onSuccess?.()
    return response.user
  }
)

export const googleUserAsyncThunk = createAsyncThunk(
  `${STORE_KEY}/google`,
  async () => {
    const response = await googleAuth()
    localStorage.setItem('user', JSON.stringify(response))
    return response
  }
)

export const logoutUserAsyncThunk = createAsyncThunk(
  `${STORE_KEY}/logout`,
  async () => {
    const response = await logout()
    localStorage.removeItem('user')
    return response
  }
)

export const authSlice = createSlice({
  name: STORE_KEY,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(signUpUserAsyncThunk.fulfilled, (state, action) => {
      state.user = action.payload
    })
    builder.addCase(loginUserAsyncThunk.pending, (state) => {
      state.loading = LoadingStatusEntity.LOADING
    })
    builder.addCase(loginUserAsyncThunk.fulfilled, (state, action) => {
      state.loading = LoadingStatusEntity.LOADED
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

const selectSlice = (state: { [STORE_KEY]: UserInitialState }) =>
  state[STORE_KEY]

export const userSelectors = {
  user: createSelector(selectSlice, (state) => state.user),
  userLoaded: createSelector(
    selectSlice,
    (state) => state.loading === LoadingStatusEntity.LOADED
  ),
  userLoading: createSelector(
    selectSlice,
    (state) => state.loading === LoadingStatusEntity.LOADING
  ),
  userLoadingFailed: createSelector(
    selectSlice,
    (state) => state.loading === LoadingStatusEntity.ERROR
  ),
}
