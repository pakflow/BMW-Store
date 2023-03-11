import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  updateDoc,
} from 'firebase/firestore'
import { app } from 'firebaseSetup'

const db = getFirestore(app)

export interface IProductCategory {
  id: string
  name: string
}

export interface IProduct {
  id: string
  name: string
  category: IProductCategory
  rating: number
  price: number
  imageUrl: string
  description: string
  buildYear: number
  capacity: number
}

//Create
export const createProduct = (product: IProduct) => {
  const docRef = collection(db, 'products')

  return addDoc(docRef, {
    name: product.name,
    price: product.price,
    imageUrl: product.imageUrl,
    description: product.description,
    rating: product.rating,
    id: product.id,
    category: product.category,
    buildYear: product.buildYear,
    capacity: product.capacity,
  })
}

//Read
export const getProducts = () => {
  const docRef = collection(db, 'products')

  return getDocs(docRef)
}

export const getSingleProduct = (id: string) => {
  const docRef = doc(db, 'products', id)

  return getDoc(docRef)
}

//Delete
export const deleteProduct = (id: string) => {
  const docRef = doc(db, 'products', id)

  return deleteDoc(docRef)
}

//Update
// export const updateProduct = (id: string, updatedProduct: IProduct) => {
//   const docRef = doc(db, 'products', id)

//   return updateDoc(docRef, updatedProduct)
// }
