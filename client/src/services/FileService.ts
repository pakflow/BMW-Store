import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage'
import { app } from '../firebaseSetup'

const storage = getStorage(app)

export const uploadFile = async (file: File): Promise<string> => {
  const dataRef = ref(storage, Date.now() + '.' + file.name.split('.').pop())
  const result = await uploadBytes(dataRef, file)
  return getDownloadURL(result.ref)
}
