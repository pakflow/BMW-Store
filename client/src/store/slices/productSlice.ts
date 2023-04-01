import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import {
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
} from 'services/ProductService'
import { ProductEntity } from 'entities/ProductEntity'

type ProductSliceInitialState = {
  loading: boolean
  products: ProductEntity[]
  errors: string
}

const initialState: ProductSliceInitialState = {
  loading: false,
  products: [],
  errors: '',
}

const STORE_KEY = 'products'

export const getProductsThunk = createAsyncThunk(
  `${STORE_KEY}/getAll`,
  async () => {
    const response = getProducts()
    return response
  }
)

export const createProductThunk = createAsyncThunk(
  `${STORE_KEY}/create`,
  async (data: Omit<ProductEntity, 'id'>) => {
    const response = await createProduct(data)
    return response
  }
)

export const updateProductThunk = createAsyncThunk(
  `${STORE_KEY}/update`,
  async ({
    data,
    onSuccess,
  }: {
    data: ProductEntity
    onSuccess?: () => void
  }) => {
    const response = await updateProduct(data.id, data)
    onSuccess?.()
    return response
  }
)

export const deleteProductThunk = createAsyncThunk(
  `${STORE_KEY}/delete`,
  async (id: string) => {
    await deleteProduct(id)
    return id
  }
)

export const productSlice = createSlice({
  name: STORE_KEY,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getProductsThunk.pending, (state) => {
      state.loading = true
    })
    builder.addCase(getProductsThunk.fulfilled, (state, action) => {
      state.loading = false
      state.products = action.payload
    })
    builder.addCase(createProductThunk.fulfilled, (state, action) => {
      state.products = [...state.products, action.payload]
    })
    builder.addCase(updateProductThunk.fulfilled, (state, action) => {
      state.products = state.products.map((product: ProductEntity) =>
        product.id !== action.payload.id ? product : action.payload
      )
    })
    builder.addCase(deleteProductThunk.fulfilled, (state, action) => {
      state.products = state.products.filter(
        (product: ProductEntity) => product.id !== action.payload
      )
    })
  },
})
