import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native'
import React from 'react'
import { Feather } from '@expo/vector-icons'

const Search = ({ navigation }) => {
  return (
    <View style={{ flex: 1, backgroundColor: 'white', paddingTop: 20 }}>
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
          Search
        </Text>
      </View>

      <View style={{ paddingHorizontal: 20 }}>
        <View
          style={{
            backgroundColor: '#f1f1f1',
            // padding: 10,
            borderRadius: 5,
            // borderWidth: 1,
            // borderColor: '#bdbdbd',
            elevation: 1,
          }}
        >
          <TextInput
            placeholder='Search'
            autoFocus
            style={{
              height: 45,
              borderRadius: 5,
              padding: 10,
              backgroundColor: '#f1f1f1',
              color: 'black',
              fontWeight: '500',
              fontSize: 17,
              elevation: 1,
            }}
            // onChangeText={(text) => setValue(text)}
            // value={value}
            // secureTextEntry={secureTextEntry}
          />
        </View>
      </View>
    </View>
  )
}

export default Search

const styles = StyleSheet.create({})
