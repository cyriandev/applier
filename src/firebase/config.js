import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'
const config = {
  apiKey: 'AIzaSyDEUpAqYnIK03xQ-pwz4DbOc-oQnaifXKw',
  authDomain: 'applier-f7e71.firebaseapp.com',
  projectId: 'applier-f7e71',
  storageBucket: 'applier-f7e71.appspot.com',
  messagingSenderId: '979588933011',
  appId: '1:979588933011:web:e014370d44be637e967466',
}

const app = initializeApp(config)
const db = getFirestore(app)
const auth = getAuth(app)

export { db, auth }
