import { CategoryEntity } from './CategoryEntity'

export interface ProductEntity {
  id: string
  name: string
  category: CategoryEntity
  rating: number
  price: number
  imageUrl: string
  description: string
  buildYear: number
  capacity: number
}
