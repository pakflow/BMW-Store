import { CategoryEntity } from 'entities/CategoryEntity'
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  QueryDocumentSnapshot,
  updateDoc,
} from 'firebase/firestore'
import { app } from 'firebaseSetup'

const db = getFirestore(app)

//converter
const categoryConverter = {
  toFirestore: (category: CategoryEntity) => {
    return {
      category: category.category,
    }
  },
  fromFirestore: (
    snapshot: QueryDocumentSnapshot
  ): Omit<CategoryEntity, 'id'> => {
    const data = snapshot.data()

    return {
      category: data.category,
    }
  },
}

const STORE_PATH = 'categories'

//Create
export const createCategory = async (
  category: CategoryEntity
): Promise<CategoryEntity> => {
  const docRef = collection(db, STORE_PATH).withConverter(categoryConverter)

  const response = await addDoc(docRef, category)

  return {
    ...category,
    id: response.id,
  }
}

//Read
export const getCategories = async (): Promise<CategoryEntity[]> => {
  const docRef = collection(db, STORE_PATH).withConverter(categoryConverter)

  const response = await getDocs(docRef)

  return response.docs.map((doc) => ({
    ...doc.data(),
    id: doc.id,
  }))
}

export const getSingleCategory = async (
  id: string
): Promise<CategoryEntity> => {
  const docRef = doc(db, STORE_PATH, id).withConverter(categoryConverter)

  const response = await getDoc(docRef)

  const category = response.data()

  if (category === undefined) {
    throw new Error('has not products')
  } else {
    return { ...category, id: response.id }
  }
}

//Update
export const updateCategory = async (
  id: string,
  category: CategoryEntity
): Promise<CategoryEntity> => {
  const docRef = doc(db, STORE_PATH, id).withConverter(categoryConverter)

  await updateDoc(docRef, category)

  return category
}

//Delete
export const deleteCategory = async (id: string) => {
  const docRef = doc(db, STORE_PATH, id).withConverter(categoryConverter)

  return await deleteDoc(docRef)
}
