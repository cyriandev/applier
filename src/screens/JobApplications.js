import { View, Text, StyleSheet } from 'react-native'
import React from 'react'

const JobApplications = () => {
  return (
    <View style={styles.container}>
      <View style={{ paddingTop: 20 }}>
        <Text style={{ fontSize: 20, fontWeight: '700', color: 'black' }}>
          Job Applications
        </Text>
      </View>
    </View>
  )
}

export default JobApplications
const styles = StyleSheet.create({
  container: { padding: 20, flex: 1, backgroundColor: 'white' },
})
