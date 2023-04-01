import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { CategoryEntity } from 'entities/CategoryEntity'
import {
  createCategory,
  deleteCategory,
  getCategories,
  updateCategory,
} from 'services/CategoryService'

interface CategoriesSliceInitialState {
  loading: boolean
  categories: CategoryEntity[]
  errors: string
}

const initialState: CategoriesSliceInitialState = {
  loading: false,
  categories: [],
  errors: '',
}

const STORE_KEY = 'categories'

export const getCategoriesAsyncThunk = createAsyncThunk(
  `${STORE_KEY}/fetchAll`,
  async () => {
    const response = await getCategories()

    return response
  }
)

export const createCategoryAsyncThunk = createAsyncThunk(
  `${STORE_KEY}/create`,
  async (data: CategoryEntity) => {
    const response = await createCategory(data)

    return response
  }
)

export const updateCategoryAsyncThunk = createAsyncThunk(
  `${STORE_KEY}/update`,
  async ({
    data,
    onSuccess,
  }: {
    data: CategoryEntity
    onSuccess?: () => void
  }) => {
    const response = await updateCategory(data.id, data)
    onSuccess?.()
    return response
  }
)

export const deleteCategoryAsyncThunk = createAsyncThunk(
  `${STORE_KEY}/delete`,
  async (id: string) => {
    await deleteCategory(id)

    return id
  }
)

export const categoriesSlice = createSlice({
  name: STORE_KEY,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getCategoriesAsyncThunk.fulfilled, (state, action) => {
      state.categories = action.payload
    })
    builder.addCase(createCategoryAsyncThunk.fulfilled, (state, action) => {
      state.categories = [...state.categories, action.payload]
    })
    builder.addCase(updateCategoryAsyncThunk.fulfilled, (state, action) => {
      state.categories = state.categories.map((data: CategoryEntity) =>
        data.id !== action.payload.id ? data : action.payload
      )
    })
    builder.addCase(deleteCategoryAsyncThunk.fulfilled, (state, action) => {
      state.categories = state.categories.filter(
        (data: CategoryEntity) => data.id !== action.payload
      )
    })
  },
})
