import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useContext, useState } from 'react'
import { Feather } from '@expo/vector-icons'
import Loading from '../components/Loading'
import WebView from 'react-native-webview'
import ApplierContext from '../context/applier/applierContext'

const Pay = ({ route, navigation }) => {
  const {
    id,
    user,
    selectedQualification,
    personalInformation,
    applicationFee,
  } = route.params
  const { apply, universitiesLoading } = useContext(ApplierContext)
  const closeUriRegex =
    /https?:\/\/([a-z]|\.)+\/eng\/process\/finish\/([0-9]|[a-z])+-([0-9]|[a-z])+-([0-9]|[a-z])+-([0-9]|[a-z])+-([0-9]|[a-z])+/gi
  const url = 'https://movingparcels.co.za/api/payment'
  const [loading, setLoading] = useState(true)

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
          {loading ? 'Loading...' : `Pay R ${applicationFee}`}
        </Text>
      </View>
      <View style={{ flex: 1 }}>
        {universitiesLoading ? (
          <Loading />
        ) : (
          <WebView
            style={{ flex: 1 }}
            source={{
              uri: 'https://sandbox.payfast.co.za/eng/process',
              body: `merchant_id=10000100&merchant_key=46f0cd694581a&notify_url=${url}&name_first=${user.name}&name_last=${personalInformation.surname}&email_address=${user.email}&m_payment_id=''&amount=${applicationFee}&item_name='application fee'&custom_str1=''`,
              method: 'POST',
            }}
            onLoadEnd={() => setLoading(false)}
            onNavigationStateChange={(event) => {
              if (event.url.match(closeUriRegex)) {
                setTimeout(() => {
                  apply(id, user, selectedQualification, navigation)
                }, 3000)
              }
            }}
          />
        )}
      </View>
    </View>
  )
}

export default Pay

const styles = StyleSheet.create({})
