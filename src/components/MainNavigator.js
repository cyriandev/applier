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
import APSCalculator from '../screens/APSCalculator'
import Search from '../screens/Search'
import Apply from '../screens/Apply'
import AddPersonalInfo from '../screens/AddPersonalInfo'
import Pay from '../screens/Pay'

const Stack = createNativeStackNavigator()

const MainNavigator = () => {
  const { user, setUser, userLoading, dispatch } = useContext(AuthContext)
  useEffect(() => {
    dispatch({ type: 'USER_LOADING' })
    auth.onAuthStateChanged((user) => setUser(user))
  }, [])

  if (userLoading) return <Loading />
  // if (!personalInformation) return <AddPersonalInfo />

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
            <Stack.Screen name='APS' component={APSCalculator} />
            <Stack.Screen name='Search' component={Search} />
            <Stack.Screen name='Apply' component={Apply} />
            <Stack.Screen name='AddPersonalInfo' component={AddPersonalInfo} />
            <Stack.Screen name='Pay' component={Pay} />
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
