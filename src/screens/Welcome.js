import {
  View,
  Text,
  StyleSheet,
  TouchableWithoutFeedback,
  Image,
  Dimensions,
} from 'react-native'
import React from 'react'
import HomeHeader from '../components/HomeHeader'
import bg from '../images/bg.jpg'
const { width } = Dimensions.get('window')

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
              justifyContent: 'center',
              height: 45,
              elevation: 1,
            }}
          >
            <Text style={{ fontSize: 17, color: 'gray' }}>Search</Text>
          </View>
        </TouchableWithoutFeedback>
      </View>

      <View style={{ justifyContent: 'center', alignItems: 'center', flex: 1 }}>
        <Image
          source={bg}
          style={{
            width: width - 20,
            height: width - 20,
            resizeMode: 'center',
          }}
        />
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
