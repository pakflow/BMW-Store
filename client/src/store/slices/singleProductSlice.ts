import { createAsyncThunk, createSelector, createSlice } from '@reduxjs/toolkit'
import { getSingleProduct } from 'services/ProductService'
import { ProductEntity } from 'entities/ProductEntity'
import { LoadingStatusEntity } from 'entities/LoadingStatusEntity'

type SingleProductSliceInitialState = {
  loading: LoadingStatusEntity
  product: ProductEntity | null
}

const initialState: SingleProductSliceInitialState = {
  loading: LoadingStatusEntity.NOT_LOADED,
  product: null,
}

const STORE_KEY = 'product'

export const getSingleProductAsyncThunk = createAsyncThunk(
  `${STORE_KEY}/getSingleProduct`,
  async (id: string) => {
    const response = await getSingleProduct(id)

    return response
  }
)

export const singleProductSlice = createSlice({
  name: STORE_KEY,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getSingleProductAsyncThunk.pending, (state) => {
      state.loading = LoadingStatusEntity.LOADING
    })
    builder.addCase(getSingleProductAsyncThunk.fulfilled, (state, action) => {
      state.loading = LoadingStatusEntity.LOADED
      state.product = action.payload
    })
    builder.addCase(getSingleProductAsyncThunk.rejected, (state) => {
      state.loading = LoadingStatusEntity.ERROR
    })
  },
})

const selectSlice = (state: { [STORE_KEY]: SingleProductSliceInitialState }) =>
  state[STORE_KEY]

export const singleProductSelector = {
  singleProduct: createSelector(selectSlice, (state) => state.product),
  singleProductLoading: createSelector(
    selectSlice,
    (state) => state.loading === LoadingStatusEntity.LOADING
  ),
  singleProductLoaded: createSelector(
    selectSlice,
    (state) => state.loading === LoadingStatusEntity.LOADED
  ),
  singleProductFailed: createSelector(
    selectSlice,
    (state) => state.loading === LoadingStatusEntity.ERROR
  ),
}
