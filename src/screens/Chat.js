import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { Feather } from '@expo/vector-icons'

const Chat = ({ navigation }) => {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: 'white',
        paddingTop: 30,
      }}
    >
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Feather
            name='arrow-left'
            size={24}
            color='black'
            style={{ padding: 20 }}
          />
        </TouchableOpacity>
        <Text style={{ fontSize: 16, fontWeight: '800', color: 'black' }}>
          Talk to us
        </Text>
      </View>
    </View>
  )
}

export default Chat

const styles = StyleSheet.create({})
