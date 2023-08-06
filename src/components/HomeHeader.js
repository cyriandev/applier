import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import { Ionicons } from '@expo/vector-icons'

const HomeHeader = ({ title, navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={{ fontSize: 20, fontWeight: '700', color: 'black' }}>
        {title}
      </Text>

      <TouchableOpacity onPress={() => navigation.navigate('Chat')}>
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
