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
} from '../types'
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
  sendPasswordResetEmail,
} from 'firebase/auth'
import { auth, db } from '../../firebase/config'
import { collection, getDocs, query, where } from 'firebase/firestore'

const AuthState = ({ children }) => {
  const initialState = {
    user: null,
    isAuthenticated: false,
    loading: false,
    userLoading: false,
    errors: null,
  }
  const [state, dispatch] = useReducer(AuthReducer, initialState)
  const adminsCollection = collection(db, 'admins')

  // Register
  const register = (user) => {
    setAuthLoading()
    createUserWithEmailAndPassword(auth, user.email, user.password)
      .then((credentials) => {
        updateProfile(credentials.user, { displayName: user.name })
          .then(() => console.log('name saved'))
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
    if (user) {
      const { email, displayName, uid } = user
      try {
        const q = query(adminsCollection, where('email', '==', email))
        const res = await getDocs(q)
        const admin = res.docs.map((doc) => ({ ...doc.data(), id: doc.id }))

        dispatch({
          type: SET_USER,
          payload: {
            name: displayName,
            email,
            id: uid,
            role: admin.length ? 'admin' : 'user',
          },
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
        setUser,
        register,
        login,
        dispatch,
        logout,
        resetPassword,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export default AuthState
