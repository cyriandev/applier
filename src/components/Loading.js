import { ActivityIndicator, StyleSheet, Text, View } from 'react-native'
import React from 'react'

const Loading = () => {
  return (
    <View style={{ alignItems: 'center', justifyContent: 'center', flex: 1 }}>
      <View style={{ justifyContent: 'center' }}>
        <ActivityIndicator color='#036552' size='large' />
        <Text
          style={{
            textAlign: 'center',
            color: 'black',
            fontWeight: '500',
            fontSize: 12,
            marginTop: 10,
          }}
        >
          Loading...
        </Text>
      </View>
    </View>
  )
}

export default Loading

const styles = StyleSheet.create({})
