import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { IProduct, getProducts, createProduct, getSingleProduct } from 'db/db'
import { DocumentData } from 'firebase/firestore'

const initialState: DocumentData = []

export const getSingleProductThunk = createAsyncThunk(
  'api/getSingle',
  async (id: string) => {
    const response = await getSingleProduct(id)
    return response
  }
)

export const getProductsThunk = createAsyncThunk(
  'api/getProducts',
  async () => {
    const response = await getProducts()
    return response.docs
  }
)

export const createProductThunk = createAsyncThunk(
  'api/create',
  async (data: IProduct) => {
    console.log(data)
    const response = await createProduct(data)
    console.log(response)
    return response
  }
)

export const productSlice = createSlice({
  name: 'api',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getSingleProductThunk.fulfilled, (state, action) => {
      state = action.payload
    })
    builder.addCase(getProductsThunk.fulfilled, (state, action) => {
      state = action.payload
      console.log(state)
    })
    builder.addCase(createProductThunk.fulfilled, (state, action) => {
      state = { ...state, action }
    })
  },
})
