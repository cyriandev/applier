import {
  View,
  Text,
  Button,
  TouchableHighlight,
  StyleSheet,
} from 'react-native'
import React, { useContext } from 'react'
import AuthContext from '../context/auth/authContext'
import HomeHeader from '../components/HomeHeader'
import Input from '../components/Input'

const Welcome = ({ navigation }) => {
  return (
    <View style={{ flex: 1, backgroundColor: 'white', paddingTop: 30 }}>
      <HomeHeader title='Applier' navigation={navigation} />

      <View style={{ padding: 20 }}>
        <TouchableHighlight>
          <View
            style={{
              backgroundColor: '#f1f1f1',
              padding: 10,
              borderRadius: 5,
              // borderWidth: 1,
              // borderColor: '#bdbdbd',
              elevation: 1,
            }}
          >
            <Text>Search</Text>
          </View>
        </TouchableHighlight>
      </View>
    </View>
  )
}

export default Welcome
const styles = StyleSheet.create({
  input: {
    height: 50,
    backgroundColor: 'white',
    flex: 1,
    borderRadius: 5,
    color: 'black',
    fontWeight: '500',
  },
})
