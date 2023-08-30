import { StyleSheet, Text, TextInput, View } from 'react-native'
import React from 'react'
import { MaterialCommunityIcons } from '@expo/vector-icons'

const Input = ({
  label,
  placeholder,
  icon,
  setValue,
  value,
  secureTextEntry,
  keyboardType,
}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.inputContainer}>
        <MaterialCommunityIcons
          name={icon}
          size={20}
          color='black'
          style={{ paddingHorizontal: 10 }}
        />
        <TextInput
          placeholder={placeholder}
          style={styles.input}
          onChangeText={(text) => setValue(text)}
          value={value}
          secureTextEntry={secureTextEntry}
          keyboardType={keyboardType}
        />
      </View>
    </View>
  )
}

export default Input

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
  },
  input: {
    height: 50,
    backgroundColor: 'white',
    flex: 1,
    borderRadius: 5,
    color: 'black',
    fontWeight: '500',
  },
  label: {
    marginBottom: 10,
    fontSize: 15,
    color: 'black',
    fontWeight: '500',
  },
  inputContainer: {
    backgroundColor: 'white',
    borderRadius: 5,
    flexDirection: 'row',
    alignItems: 'center',
    height: 50,
    borderWidth: 1,
    borderColor: '#E3E6E6',
    overflow: 'hidden',
  },
})
