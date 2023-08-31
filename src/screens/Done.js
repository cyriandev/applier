import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const Done = () => {
  return (
    <View style={{ flex: 1, backgroundColor: 'white' }}>
      <Text>Done</Text>
      <View style={{ padding: 20 }}>
        <Button
          text='Done'
          //   onPress={handleApply}
        />
      </View>
    </View>
  )
}

export default Done

const styles = StyleSheet.create({})
