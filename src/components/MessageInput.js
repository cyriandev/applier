import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native'
import React from 'react'
import { Feather, Ionicons } from '@expo/vector-icons'

const MessageInput = ({ setText, text, send, loading }) => {
  return (
    <View
      style={{
        paddingHorizontal: 10,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'white',
        borderTopWidth: 1,
        borderTopColor: '#f1f1f1',
      }}
    >
      <TextInput
        placeholder='Type a message'
        style={{
          height: 50,
          backgroundColor: 'white',
          flex: 1,
          color: 'black',
          fontWeight: '500',
        }}
        onChangeText={(text) => setText(text)}
        value={text}
      />
      <TouchableOpacity onPress={() => send()} disabled={loading}>
        <View style={{ backgroundColor: 'white', padding: 10 }}>
          {loading ? (
            <ActivityIndicator size='small' color='#036552' />
          ) : (
            <Ionicons name='md-send' size={30} color='black' />
          )}
        </View>
      </TouchableOpacity>
    </View>
  )
}

export default MessageInput

const styles = StyleSheet.create({})
