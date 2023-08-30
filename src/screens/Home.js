import React, { useContext } from 'react'
import {
  MaterialCommunityIcons,
  Ionicons,
  MaterialIcons,
  Feather,
} from '@expo/vector-icons'
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs'
import Welcome from './Welcome'
import UniApplications from './UniApplications'
import JobApplications from './JobApplications'
import Profile from './Profile'
import Chats from './Chats'
import AuthContext from '../context/auth/authContext'

const Tab = createMaterialBottomTabNavigator()
const Home = () => {
  const { logout, loading, user } = useContext(AuthContext)
  return (
    <Tab.Navigator
      initialRouteName='Welcome'
      activeColor='black'
      barStyle={{
        backgroundColor: '#f1f1f1',
        // height: 70,
      }}
      // labeled={user.role == 'admin' ? true : false}
      inactiveColor='#bdbdbd'
      shifting={true}
    >
      {user.role == 'admin' ? (
        <Tab.Screen
          name='Chats'
          component={Chats}
          options={{
            labelStyle: { fontSize: 12 },
            tabBarLabel: 'Chats',
            tabBarIcon: ({ color }) => (
              <Ionicons name='chatbubble' size={24} color={color} />
            ),
          }}
        />
      ) : (
        <>
          <Tab.Screen
            name='Welcome'
            component={Welcome}
            options={{
              labelStyle: { fontSize: 12 },
              tabBarLabel: 'Home',
              tabBarIcon: ({ color }) => (
                <MaterialCommunityIcons
                  name='home-variant'
                  color={color}
                  size={25}
                />
              ),
            }}
          />
          <Tab.Screen
            name='UniApplications'
            component={UniApplications}
            options={{
              tabBarLabel: 'University Application',
              tabBarIcon: ({ color }) => (
                <Ionicons name='school' color={color} size={25} />
              ),
            }}
          />
          <Tab.Screen
            name='JobApplications'
            component={JobApplications}
            options={{
              tabBarLabel: 'Job Application',
              tabBarIcon: ({ color }) => (
                <MaterialIcons name='work' color={color} size={25} />
              ),
            }}
          />
        </>
      )}
      <Tab.Screen
        name='Profile'
        component={Profile}
        options={{
          tabBarLabel: 'Profile',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name='account' size={30} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  )
}

export default Home
