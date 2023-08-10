import {
  View,
  Text,
  Button,
  TouchableHighlight,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from 'react-native'
import React, { useContext } from 'react'
import AuthContext from '../context/auth/authContext'
import HomeHeader from '../components/HomeHeader'
import Input from '../components/Input'

const Welcome = ({ navigation }) => {
  return (
    <View style={{ flex: 1, backgroundColor: 'white', paddingTop: 30 }}>
      <HomeHeader title='Applier' navigation={navigation} />

      <View style={{ paddingHorizontal: 20 }}>
        <TouchableWithoutFeedback onPress={() => navigation.navigate('Search')}>
          <View
            style={{
              backgroundColor: '#f1f1f1',
              padding: 10,
              borderRadius: 5,
              // borderWidth: 1,
              // borderColor: '#bdbdbd',
              justifyContent: 'center',
              height: 45,
              elevation: 1,
            }}
          >
            <Text style={{ fontSize: 17, color: 'gray' }}>Search</Text>
          </View>
        </TouchableWithoutFeedback>
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
