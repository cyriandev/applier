import React, { useContext, useEffect } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import Login from '../screens/auth/Login'
import Register from '../screens/auth/Register'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Home from '../screens/Home'
import AuthContext from '../context/auth/authContext'
import { auth } from '../firebase/config'
import Loading from './Loading'
import Chat from '../screens/Chat'
import ResetPassword from '../screens/auth/ResetPassword'

const Stack = createNativeStackNavigator()

const MainNavigator = () => {
  const { user, setUser, userLoading, dispatch } = useContext(AuthContext)
  useEffect(() => {
    dispatch({ type: 'USER_LOADING' })
    auth.onAuthStateChanged((user) => setUser(user))
  }, [])

  if (userLoading) return <Loading />
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        {user ? (
          <>
            <Stack.Screen name='Home' component={Home} />
            <Stack.Screen name='Chat' component={Chat} />
          </>
        ) : (
          <>
            <Stack.Screen name='Login' component={Login} />
            <Stack.Screen name='Register' component={Register} />
            <Stack.Screen name='ResetPassword' component={ResetPassword} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default MainNavigator
