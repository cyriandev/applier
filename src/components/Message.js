import { Dimensions, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import moment from 'moment'

const { width } = Dimensions.get('window')

const Message = ({ message, user }) => {
  return (
    <View
      style={{
        marginVertical: 5,
        flexDirection: 'row',
        justifyContent: message.senderId == user.id ? 'flex-end' : 'flex-start',
      }}
    >
      <View
        style={{
          width: width / 2,
          backgroundColor: message.senderId == user.id ? '#036552' : 'gray',
          borderRadius: 5,
          padding: 5,
          fontSize: 13,
          elevation: 5,
        }}
      >
        <Text
          style={{
            color: 'white',
            textAlign: message.senderId == user.id ? 'right' : 'left',
          }}
        >
          {message.text}
        </Text>

        <Text
          style={{
            color: 'white',
            textAlign: message.senderId == user.id ? 'right' : 'left',
            fontSize: 12,
          }}
        >
          {moment(message.date.toDate()).format('h:mm')}
        </Text>
      </View>
    </View>
  )
}

export default Message

const styles = StyleSheet.create({})
