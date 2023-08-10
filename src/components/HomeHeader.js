import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native'
import React, { useContext } from 'react'
import { Ionicons } from '@expo/vector-icons'
import logo from '../images/logo.png'
import AuthContext from '../context/auth/authContext'

const HomeHeader = ({ title, navigation }) => {
  const { user } = useContext(AuthContext)
  return (
    <View style={styles.container}>
      <Image
        source={logo}
        style={{ width: 50, height: 50, resizeMode: 'center' }}
      />

      <TouchableOpacity
        onPress={() => navigation.navigate('Chat', { id: user.id })}
      >
        <View style={{ padding: 5 }}>
          <Ionicons name='chatbubble' size={24} color='black' />
        </View>
      </TouchableOpacity>
    </View>
  )
}

export default HomeHeader
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    padding: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
})
