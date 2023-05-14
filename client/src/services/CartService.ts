import { CheckEntity } from 'entities/CheckEntity'
import { OrderStatusEntity } from 'entities/OrderStatusEntity'
import {
  QueryDocumentSnapshot,
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  getFirestore,
  query,
  updateDoc,
  where,
} from 'firebase/firestore'
import { app } from 'firebaseSetup'

const db = getFirestore(app)

const STORE_KEY = 'check_list'

//converter
const checkConverter = {
  toFirestore: (check: CheckEntity) => {
    return {
      products: check.products,
      totalPrice: check.totalPrice,
      user: check.email,
      status: OrderStatusEntity,
      firstName: check.firstName,
      lastName: check.lastName,
      country: check.country,
      city: check.city,
      phoneNumber: check.phoneNumber,
      adress: check.adress,
    }
  },
  fromFirestore: (snapshot: QueryDocumentSnapshot): Omit<CheckEntity, 'id'> => {
    const data = snapshot.data()

    return {
      products: data.products,
      totalPrice: data.totalPrice,
      email: data.email,
      status: data.status,
      firstName: data.firstName,
      lastName: data.lastName,
      country: data.country,
      city: data.city,
      phoneNumber: data.phoneNumber,
      adress: data.adress,
    }
  },
}

//create Check in database
export const sendCheck = async (check: CheckEntity) => {
  const docRef = collection(db, STORE_KEY).withConverter(checkConverter)

  const response = await addDoc(docRef, check)

  return {
    ...check,
    id: response.id,
  }
}

//get all checks
export const getChecks = async (): Promise<CheckEntity[]> => {
  const docRef = collection(db, STORE_KEY).withConverter(checkConverter)

  const response = await getDocs(docRef)

  return response.docs.map((doc) => ({
    ...doc.data(),
    id: doc.id,
  }))
}

//get checks by email
export const getChecksByEmail = async (
  email: string
): Promise<CheckEntity[]> => {
  const docRef = collection(db, STORE_KEY).withConverter(checkConverter)

  const q = query(docRef, where('email', '==', email))

  const response = await getDocs(q)

  return response.docs.map((doc) => ({
    ...doc.data(),
    id: doc.id,
  }))
}

//update check or status of check
export const updateCheck = async (
  id: string,
  updatedCheck: CheckEntity
): Promise<CheckEntity> => {
  const docRef = doc(db, STORE_KEY, id).withConverter(checkConverter)

  await updateDoc(docRef, updatedCheck)

  return updatedCheck
}

//delete check
export const deleteCheck = async (id: string) => {
  const docRef = doc(db, STORE_KEY, id).withConverter(checkConverter)

  return await deleteDoc(docRef)
}
