import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useContext } from 'react'
import AuthContext from '../context/auth/authContext'
import { MaterialIcons, Feather } from '@expo/vector-icons'

const Profile = ({ navigation }) => {
  const { logout, loading, user } = useContext(AuthContext)

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: 'white',
        paddingTop: 30,
      }}
    >
      <View style={{ paddingHorizontal: 20 }}>
        <View style={{ flexDirection: 'row', marginTop: 20 }}>
          <Feather name='user' size={30} color='black' />
          <View style={{ marginLeft: 10 }}>
            {user.name && <Text style={styles.username}>{user.name}</Text>}
            <Text
              style={
                user.name ? { fontSize: 16, color: 'gray' } : styles.username
              }
            >
              {user.email}
            </Text>
          </View>
        </View>
        <View
          style={{
            marginTop: 20,
          }}
        >
          <TouchableOpacity onPress={() => logout()}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                backgroundColor: '#f1f1f1',
                padding: 10,
                borderRadius: 5,
              }}
            >
              <MaterialIcons name='logout' size={18} color='black' />
              <Text
                style={{ marginLeft: 5, fontWeight: '600', color: 'black' }}
              >
                Logout
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  )
}

export default Profile

const styles = StyleSheet.create({
  username: { fontSize: 18, color: 'black', fontWeight: '700' },
})
