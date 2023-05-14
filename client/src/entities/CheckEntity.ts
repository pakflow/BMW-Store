import { OrderStatusEntity } from './OrderStatusEntity'
import { ProductEntity } from './ProductEntity'

export interface CheckEntity {
  id: string
  products: ProductEntity[]
  totalPrice: number
  email: string
  status: OrderStatusEntity
  firstName: string
  lastName: string
  country: string
  city: string
  adress: string
  phoneNumber: string
}
