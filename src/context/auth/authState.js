import React, { useReducer } from 'react'
import AuthContext from './authContext'
import AuthReducer from './authReducer'

import {
  LOGIN,
  REGISTER,
  AUTH_LOADING,
  USER_LOADING,
  SET_USER,
  AUTH_ERROR,
  LOGOUT,
  RESET_PASSWORD,
  SET_PERSONAL_INFORMATION,
} from '../types'
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
  sendPasswordResetEmail,
} from 'firebase/auth'
import { auth, db } from '../../firebase/config'
import {
  collection,
  doc,
  getDocs,
  query,
  setDoc,
  where,
} from 'firebase/firestore'
import AsyncStorage from '@react-native-async-storage/async-storage'

const AuthState = ({ children }) => {
  const initialState = {
    user: null,
    personalInformation: null,
    isAuthenticated: false,
    loading: false,
    userLoading: false,
    errors: null,
  }
  const [state, dispatch] = useReducer(AuthReducer, initialState)
  const adminsCollection = collection(db, 'admins')
  const personalInformationCollection = collection(db, 'personalInformation')

  // Register
  const register = async (user) => {
    setAuthLoading()
    createUserWithEmailAndPassword(auth, user.email, user.password)
      .then((credentials) => {
        updateProfile(credentials.user, { displayName: user.name })
          .then(() => console.log('name saved'))
          .catch((error) => console.log(error))

        setDoc(doc(db, 'chats', credentials.user.uid), { username: user.name })
          .then(() => console.log('chat saved'))
          .catch((error) => console.log(error))

        dispatch({ type: REGISTER })
      })
      .catch((err) => {
        if (err.code === 'auth/email-already-in-use') {
          console.error('That email address is already in use!')
          // Snackbar.show({
          //   text: 'That email address is already in use!',
          //   // duration: Snackbar.LENGTH_LONG,
          //   textColor: 'tomato',
          // })
        }

        if (err.code === 'auth/invalid-email') {
          console.error('That email address is invalid!')
          // Snackbar.show({
          //   text: 'Email address is invalid!',
          //   // duration: Snackbar.LENGTH_LONG,
          //   textColor: 'tomato',
          // })
        }

        dispatch({ type: AUTH_ERROR })
      })
  }

  // Login
  const login = (user) => {
    setAuthLoading()
    signInWithEmailAndPassword(auth, user.email, user.password)
      .then(() => dispatch({ type: LOGIN }))
      .catch((err) => {
        if (err.code === 'auth/user-not-found') {
          console.error('well user not found')
          // Snackbar.show({
          //   text: 'well user not found',
          //   // duration: Snackbar.LENGTH_LONG,
          //   textColor: 'tomato',
          // })
        }
        if (err.code === 'auth/wrong-password') {
          console.error('You have enter the wrong password')
          // Snackbar.show({
          //   text: 'You have enter the wrong password',
          //   // duration: Snackbar.LENGTH_LONG,
          //   textColor: 'tomato',
          // })
        }
        if (err.code === 'auth/invalid-email') {
          console.error('That email address is invalid!')
          // Snackbar.show({
          //   text: 'Email address is invalid!',
          //   // duration: Snackbar.LENGTH_LONG,
          //   textColor: 'tomato',
          // })
        }
        dispatch({ type: AUTH_ERROR })
        // console.log(err.code)
        // console.log(err.message)
      })
  }

  // Set User
  const setUser = async (user) => {
    // setUserLoading()
    if (user) {
      const { email, displayName, uid } = user
      try {
        // get admin
        const q = query(adminsCollection, where('email', '==', email))
        const res = await getDocs(q)
        const admin = res.docs.map((doc) => ({ ...doc.data(), id: doc.id }))

        // Get user personal information
        const personalInformation = await AsyncStorage.getItem('personalInfo')

        dispatch({
          type: SET_USER,
          payload: {
            name: displayName,
            email,
            id: uid,
            role: admin.length ? 'admin' : 'user',
          },
        })

        dispatch({
          type: SET_PERSONAL_INFORMATION,
          payload:
            personalInformation != null
              ? JSON.parse(personalInformation)
              : null,
        })
      } catch (error) {
        console.log(error)
      }
    } else {
      dispatch({ type: AUTH_ERROR })
    }
  }

  // Reset password
  const resetPassword = (email) => {
    setAuthLoading()
    sendPasswordResetEmail(auth, email)
      .then(() => {
        console.log('Password reset email sent')
        dispatch({ type: RESET_PASSWORD })
      })
      .catch((err) => {
        if (err.code === 'auth/user-not-found') {
          console.error('well user not found')
          // Snackbar.show({
          //   text: `well user not found with email: ${email}`,
          //   duration: Snackbar.LENGTH_LONG,
          //   textColor: 'tomato',
          // })
        }

        if (err.code === 'auth/invalid-email') {
          console.error('That email address is invalid!')
          // Snackbar.show({
          //   text: 'Email address is invalid!',
          //   duration: Snackbar.LENGTH_LONG,
          //   textColor: 'tomato',
          // })
        }
        dispatch({ type: AUTH_ERROR })
        // console.log(err.code)
        // console.log(err.message)
      })
  }

  // Logout
  const logout = async () => {
    setAuthLoading()
    try {
      await signOut(auth)
      dispatch({
        type: LOGOUT,
      })
    } catch (err) {
      dispatch({ type: AUTH_ERROR })
      console.log(err)
    }
  }

  const storePersonalInfo = async (info, navigation) => {
    setAuthLoading()
    try {
      const jsonValue = JSON.stringify(info)
      await AsyncStorage.setItem('personalInfo', jsonValue)
      dispatch({ type: SET_PERSONAL_INFORMATION, payload: info })
      navigation.goBack()
    } catch (e) {
      dispatch({ type: AUTH_ERROR })
      console.log(e)
    }
  }

  // Set Loading
  const setAuthLoading = () => dispatch({ type: AUTH_LOADING })
  const setUserLoading = () => dispatch({ type: USER_LOADING })

  return (
    <AuthContext.Provider
      value={{
        user: state.user,
        isAuthenticated: state.isAuthenticated,
        loading: state.loading,
        userLoading: state.userLoading,
        personalInformation: state.personalInformation,
        setUser,
        register,
        login,
        dispatch,
        logout,
        resetPassword,
        storePersonalInfo,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export default AuthState
