import {
  View,
  Text,
  StyleSheet,
  TouchableWithoutFeedback,
  Image,
  Dimensions,
  FlatList,
  TouchableOpacity,
} from 'react-native'
import React, { useContext, useEffect } from 'react'
import HomeHeader from '../components/HomeHeader'
import bg from '../images/bg.jpg'
import ApplierContext from '../context/applier/applierContext'
import Loading from '../components/Loading'
import moment from 'moment/moment'
const { width } = Dimensions.get('window')

const Welcome = ({ navigation }) => {
  const { noticesLoading, notices, getNotices } = useContext(ApplierContext)

  useEffect(() => {
    getNotices()
  }, [])

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
      <View style={{ flex: 1, padding: 20 }}>
        <Text style={{ color: 'black', fontSize: 20, fontWeight: '600' }}>
          Notice Board
        </Text>

        <View style={{ marginTop: 10, flex: 1 }}>
          {noticesLoading ? (
            <Loading />
          ) : (
            <FlatList
              data={notices}
              renderItem={({ item }) => (
                <View
                  style={{
                    backgroundColor: '#f1f1f1',
                    padding: 10,
                    marginTop: 10,
                  }}
                >
                  <Text style={{ color: 'black', fontSize: 17 }}>
                    {item.title}
                  </Text>
                  <Text style={{ color: '#036552', fontSize: 12 }}>
                    {moment(item.date.toDate()).fromNow()}
                  </Text>
                  <Text style={{ marginTop: 10, color: 'gray', fontSize: 13 }}>
                    {item.description}
                  </Text>
                </View>
              )}
              keyExtractor={(item, index) => index}
              showsVerticalScrollIndicator={false}
            />
          )}
        </View>
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
