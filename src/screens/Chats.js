import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const Chats = () => {
  return (
    <View style={styles.container}>
      <View style={{ paddingTop: 20 }}>
        <Text style={{ fontSize: 20, fontWeight: '700', color: 'black' }}>
          Chats
        </Text>
      </View>
    </View>
  )
}

export default Chats

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: 'white', padding: 30 },
})
