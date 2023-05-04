import { createAsyncThunk, createSelector, createSlice } from '@reduxjs/toolkit'
import {
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
} from 'services/ProductService'
import { ProductEntity } from 'entities/ProductEntity'
import { LoadingStatusEntity } from 'entities/LoadingStatusEntity'

interface QueryData {
  search: string
  priceQuery: number
  yearQuery: number
  engineQuery: string
  capacityQuery: number
}

interface ProductSliceInitialState {
  loading: LoadingStatusEntity
  products: ProductEntity[]
  errors: string
}

const initialState: ProductSliceInitialState = {
  loading: LoadingStatusEntity.NOT_LOADED,
  products: [],
  errors: '',
}

const STORE_KEY = 'products'

export const getProductsAsyncThunk = createAsyncThunk(
  `${STORE_KEY}/getAll`,
  async (filters: Partial<QueryData>) => {
    const { search, priceQuery, yearQuery, engineQuery, capacityQuery } =
      filters
    const response = getProducts(
      search,
      priceQuery,
      yearQuery,
      engineQuery,
      capacityQuery
    )
    return response
  }
)

export const createProductAsyncThunk = createAsyncThunk(
  `${STORE_KEY}/create`,
  async (data: Omit<ProductEntity, 'id'>) => {
    const response = await createProduct(data)
    return response
  }
)

export const updateProductAsyncThunk = createAsyncThunk(
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

export const deleteProductAsyncThunk = createAsyncThunk(
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
    builder.addCase(getProductsAsyncThunk.pending, (state) => {
      state.loading = LoadingStatusEntity.LOADING
    })
    builder.addCase(getProductsAsyncThunk.fulfilled, (state, action) => {
      state.loading = LoadingStatusEntity.LOADED
      state.products = action.payload
    })
    builder.addCase(createProductAsyncThunk.fulfilled, (state, action) => {
      state.products = [...state.products, action.payload]
    })
    builder.addCase(updateProductAsyncThunk.fulfilled, (state, action) => {
      state.products = state.products.map((product: ProductEntity) =>
        product.id !== action.payload.id ? product : action.payload
      )
    })
    builder.addCase(deleteProductAsyncThunk.fulfilled, (state, action) => {
      state.products = state.products.filter(
        (product: ProductEntity) => product.id !== action.payload
      )
    })
  },
})

const selectSlice = (state: { [STORE_KEY]: ProductSliceInitialState }) =>
  state[STORE_KEY]

export const productsSelectors = {
  products: createSelector(selectSlice, (state) => state.products),
  productsLoaded: createSelector(
    selectSlice,
    (state) => state.loading === LoadingStatusEntity.LOADED
  ),
  productsLoading: createSelector(
    selectSlice,
    (state) => state.loading === LoadingStatusEntity.LOADING
  ),
  productsLoadingFailed: createSelector(
    selectSlice,
    (state) => state.loading === LoadingStatusEntity.ERROR
  ),
}
