import { InjectionToken } from 'tsyringe'
import CartManager from './CartManager'

export const cartManagerToken = Symbol(
  'cartManager'
) as InjectionToken<CartManager>
