import { initializeApp } from 'firebase/app'

const firebaseConfig = {
  apiKey: 'AIzaSyCEIfx9dPZ_5VZ3unbbYVhTZsh2GLROZ9w',
  authDomain: 'bmw-store-af03d.firebaseapp.com',
  projectId: 'bmw-store-af03d',
  storageBucket: 'bmw-store-af03d.appspot.com',
  messagingSenderId: '173576219794',
  appId: '1:173576219794:web:e694575b774c21258d8a4b',
  measurementId: 'G-W89PN9FJ7L',
}

export const app = initializeApp(firebaseConfig)
