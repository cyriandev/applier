import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ActivityIndicator,
} from 'react-native'
import React from 'react'

const Button = ({ text, onPress, loading }) => {
  return (
    <TouchableOpacity onPress={onPress} disabled={loading}>
      <View
        style={{
          backgroundColor: '#036552',
          paddingHorizontal: 20,
          paddingVertical: 15,
          borderRadius: 5,
        }}
      >
        {loading ? (
          <View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <ActivityIndicator size='small' color='white' />
              <Text
                style={{
                  textAlign: 'center',
                  color: 'white',
                  fontWeight: '500',
                  fontSize: 12,
                  marginLeft: 5,
                }}
              >
                Loading...
              </Text>
            </View>
          </View>
        ) : (
          <Text
            style={{
              textAlign: 'center',
              color: 'white',
              fontWeight: '500',
              fontSize: 15,
            }}
          >
            {text}
          </Text>
        )}
      </View>
    </TouchableOpacity>
  )
}

export default Button

const styles = StyleSheet.create({})
