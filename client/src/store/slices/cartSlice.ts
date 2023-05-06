import { PayloadAction, createSelector, createSlice } from '@reduxjs/toolkit'
import { ProductEntity } from 'entities/ProductEntity'

interface CartSliceInitialState {
  cartProducts: ProductEntity[]
}

const initialState: CartSliceInitialState = {
  cartProducts: JSON.parse(localStorage.getItem('cart_products') ?? 'null'),
}

const STORE_KEY = 'cart'

export const cartSlice = createSlice({
  name: STORE_KEY,
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<ProductEntity>) => {
      state.cartProducts = [...state.cartProducts, action.payload]
      localStorage.setItem('cart_products', JSON.stringify(state.cartProducts))
    },
    removeFromCart: (state, action: PayloadAction<ProductEntity>) => {
      state.cartProducts = state.cartProducts.filter(
        (product: ProductEntity) => product.id !== action.payload.id
      )
      localStorage.setItem('cart_products', JSON.stringify(state.cartProducts))
    },
  },
})

export const { addToCart, removeFromCart } = cartSlice.actions

const selectSlice = (state: { [STORE_KEY]: CartSliceInitialState }) =>
  state[STORE_KEY]

export const cartSelectors = {
  cartProducts: createSelector(selectSlice, (state) => state.cartProducts),
}
