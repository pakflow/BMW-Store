import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import {
  IProduct,
  getProducts,
  createProduct,
  getSingleProduct,
  updateProduct,
} from 'db/db'
import { DocumentData } from 'firebase/firestore'

type ProductSliceInitialState = {
  loading: boolean
  products: DocumentData[]
  errors: string
}

const initialState: ProductSliceInitialState = {
  loading: false,
  products: [],
  errors: '',
}

export const getSingleProductThunk = createAsyncThunk(
  'api/getSingle',
  async (id: string) => {
    const response = await getSingleProduct(id)
    return response
  }
)

export const getProductsThunk = createAsyncThunk('api/getAll', async () => {
  const response = (await getProducts()).docs.map((data) => data.data())
  return response
})

export const createProductThunk = createAsyncThunk(
  'api/create',
  async (data: IProduct) => {
    const response = await createProduct(data)
    return response
  }
)

export const updateProductThunk = createAsyncThunk(
  'api/update',
  async (data: IProduct) => {
    const response = await updateProduct(data.id, data)
    return response
  }
)

export const productSlice = createSlice({
  name: 'api',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // builder.addCase(getSingleProductThunk.fulfilled, (state, action) => {
    //   state = action.payload
    // })
    builder.addCase(getProductsThunk.fulfilled, (state, action) => {
      state.products = action.payload
    })
    builder.addCase(createProductThunk.fulfilled, (state, action) => {
      state.products = [...state.products, action.payload]
    })
    builder.addCase(updateProductThunk.fulfilled, (state, action) => {
      state.products = [...state.products, action]
    })
  },
})
