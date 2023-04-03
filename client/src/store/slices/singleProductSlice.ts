import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { getSingleProduct } from 'services/ProductService'
import { ProductEntity } from 'entities/ProductEntity'

type SingleProductSliceInitialState = {
  loading: boolean
  product: ProductEntity | null
  errors: string
}

const initialState: SingleProductSliceInitialState = {
  loading: false,
  product: null,
  errors: '',
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
    builder.addCase(getSingleProductAsyncThunk.fulfilled, (state, action) => {
      state.product = action.payload
    })
  },
})
