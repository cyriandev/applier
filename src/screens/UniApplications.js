import { View, Text, StyleSheet } from 'react-native'
import React from 'react'

const UniApplications = () => {
  return (
    <View style={styles.container}>
      <View style={{ paddingTop: 20 }}>
        <Text style={{ fontSize: 20, fontWeight: '700', color: 'black' }}>
          University Applications
        </Text>
      </View>
    </View>
  )
}

export default UniApplications
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: 'white', padding: 20 },
})
