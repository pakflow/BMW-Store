import { PayloadAction, createSelector, createSlice } from '@reduxjs/toolkit'
import { ProductEntity } from 'entities/ProductEntity'

interface CartSliceInitialState {
  cartProducts: ProductEntity[]
  totalPrice: number
}

const initialState: CartSliceInitialState = {
  cartProducts: [],
  totalPrice: 0,
}

const STORE_KEY = 'cart'

export const cartSlice = createSlice({
  name: STORE_KEY,
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<ProductEntity>) => {
      state.cartProducts = [...state.cartProducts, action.payload]
      state.totalPrice += action.payload.price
    },
    removeFromCart: (state, action: PayloadAction<ProductEntity>) => {
      state.cartProducts = state.cartProducts.filter(
        (product: ProductEntity) => product.id !== action.payload.id
      )
      state.totalPrice = state.totalPrice - action.payload.price
    },
  },
})

export const { addToCart, removeFromCart } = cartSlice.actions

const selectSlice = (state: { [STORE_KEY]: CartSliceInitialState }) =>
  state[STORE_KEY]

export const cartSelectors = {
  cartProducts: createSelector(selectSlice, (state) => state.cartProducts),
  totalPrice: createSelector(selectSlice, (state) => state.totalPrice),
}
