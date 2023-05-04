import { ProductEntity } from 'entities/ProductEntity'
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  query,
  QueryDocumentSnapshot,
  updateDoc,
  where,
} from 'firebase/firestore'
import { app } from 'firebaseSetup'

const db = getFirestore(app)

//converter
const productConverter = {
  toFirestore: (product: ProductEntity) => {
    return {
      name: product.name,
      category: product.category,
      rating: product.rating,
      price: product.price,
      imageUrl: product.imageUrl,
      description: product.description,
      buildYear: product.buildYear,
      capacity: product.capacity,
    }
  },
  fromFirestore: (
    snapshot: QueryDocumentSnapshot
  ): Omit<ProductEntity, 'id'> => {
    const data = snapshot.data()

    return {
      name: data.name,
      category: data.category,
      rating: data.rating,
      price: data.price,
      imageUrl: data.imageUrl,
      description: data.description,
      buildYear: data.buildYear,
      capacity: data.capacity,
    }
  },
}

const STORE_KEY = 'products'

//Create
export const createProduct = async (
  product: Omit<ProductEntity, 'id'>
): Promise<ProductEntity> => {
  const docRef = collection(db, STORE_KEY).withConverter(productConverter)

  const response = await addDoc(docRef, product)
  return {
    ...product,
    id: response.id,
  }
}

//Read
export const getProducts = async (
  search?: string,
  priceQuery?: number,
  yearQuery?: number,
  engineQuery?: string,
  capacityQuery?: number
): Promise<ProductEntity[]> => {
  const docRef = collection(db, STORE_KEY).withConverter(productConverter)

  let response

  const filters = []

  if (search) filters.push(where('name', '>=', search))
  if (priceQuery) filters.push(where('price', '>=', priceQuery))
  if (yearQuery) filters.push(where('buildYear', '>=', yearQuery))
  if (engineQuery) filters.push(where('category', '==', engineQuery))
  if (capacityQuery) filters.push(where('capacity', '==', capacityQuery))

  const q = query(docRef, ...filters)
  response = await getDocs(q)

  return response.docs.map((doc) => ({
    ...doc.data(),
    id: doc.id,
  }))
}

export const getSingleProduct = async (id: string): Promise<ProductEntity> => {
  const docRef = doc(db, STORE_KEY, id).withConverter(productConverter)

  const response = await getDoc(docRef)

  const product = response.data()

  if (product === undefined) {
    throw new Error('has not products')
  } else {
    return { ...product, id: response.id }
  }
}

//Update
export const updateProduct = async (
  id: string,
  updatedProduct: ProductEntity
): Promise<ProductEntity> => {
  const docRef = doc(db, STORE_KEY, id).withConverter(productConverter)

  await updateDoc(docRef, updatedProduct)

  return updatedProduct
}

//Delete
export const deleteProduct = async (id: string) => {
  const docRef = doc(db, STORE_KEY, id).withConverter(productConverter)

  return await deleteDoc(docRef)
}
