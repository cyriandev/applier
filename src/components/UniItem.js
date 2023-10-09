import { Text, View, TouchableOpacity, Image } from 'react-native'
import React from 'react'

const UniItem = ({ university, navigation, userID }) => {
  const application = university?.applications?.some(
    (application) => application.userId == userID
  )

  return (
    <View style={{ flexDirection: 'row', marginTop: 20, paddingBottom: 10 }}>
      <Image
        source={{ uri: university.image }}
        style={{ width: 80, height: 80, borderRadius: 5 }}
      />
      <View style={{ marginLeft: 10, flex: 1 }}>
        <Text style={{ color: 'black', fontSize: 18 }}>{university.name}</Text>
        <View style={{ flexDirection: 'row' }}>
          <Text style={{ color: 'gray' }}>Opening date:</Text>
          <Text style={{ color: '#036552', marginLeft: 10 }}>
            {university.openingDate}
          </Text>
        </View>

        <View style={{ flexDirection: 'row' }}>
          <Text style={{ color: 'gray' }}>Closing date:</Text>
          <Text style={{ color: '#036552', marginLeft: 10 }}>
            {university.closingDate}
          </Text>
        </View>

        <View style={{ flexDirection: 'row' }}>
          <Text style={{ color: 'gray' }}>Application fee:</Text>
          <Text style={{ color: '#036552', marginLeft: 10 }}>
            {university.applicationFee == 0
              ? 'Free'
              : `R ${university.applicationFee}`}
          </Text>
        </View>

        <View style={{ marginTop: 10, flex: 1 }}>
          <TouchableOpacity
            onPress={() => navigation.navigate('Apply', university)}
          >
            <Text
              style={{
                backgroundColor: '#036552',
                padding: 10,
                color: 'white',
                borderRadius: 5,
              }}
            >
              {application ? 'View Application' : 'Apply'}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  )
}

export default UniItem
