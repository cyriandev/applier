import {
  FlatList,
  Keyboard,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Linking,
} from 'react-native'
import React, { useState } from 'react'
import { Feather, Ionicons } from '@expo/vector-icons'
import axios from 'axios'
import Loading from '../components/Loading'

const Search = ({ navigation }) => {
  const [text, setText] = useState('')
  const [results, setResults] = useState([])
  const [loading, setLoading] = useState(false)

  const getResults = async () => {
    if (text !== '') {
      setLoading(true)
      Keyboard.dismiss()
      try {
        const res = await axios.get(
          `https://api.adzuna.com/v1/api/jobs/za/search/1?app_id=8acd5000&app_key=6979e0afdbb257def6d2bd5222251bf2&results_per_page=20&what=${text}&content-type=application/json`
        )

        setResults(res.data.results)
        setLoading(false)
      } catch (error) {
        console.log(error)
        setLoading(false)
      }
    }
  }

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
            flexDirection: 'row',
            alignItems: 'center',
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
              flex: 1,
            }}
            onChangeText={(text) => setText(text)}
            value={text}
            // secureTextEntry={secureTextEntry}
          />

          <TouchableOpacity onPress={() => getResults()} disabled={loading}>
            <View style={{ padding: 10 }}>
              <Ionicons name='md-search' size={30} color='black' />
            </View>
          </TouchableOpacity>
        </View>
      </View>

      <View
        style={{
          paddingHorizontal: 20,
          paddingTop: 20,
          flex: 1,
        }}
      >
        {results.length ? <Text>Results: {results.length}</Text> : null}
        {loading ? (
          <Loading />
        ) : (
          <FlatList
            data={results}
            renderItem={({ item }) => (
              <TouchableOpacity
                onPress={() => Linking.openURL(item.redirect_url)}
              >
                <View
                  style={{
                    backgroundColor: '#f1f1f1',
                    borderRadius: 5,
                    marginVertical: 10,
                    padding: 10,
                  }}
                >
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                    }}
                  >
                    <Text style={{ fontSize: 20, color: 'black' }}>
                      {item.title}
                    </Text>
                    <Ionicons name='open-outline' size={20} color='black' />
                  </View>
                  <Text style={{ color: '#036552' }}>
                    {item.company.display_name}
                  </Text>
                  <Text
                    numberOfLines={4}
                    style={{ color: 'gray', marginTop: 10 }}
                  >
                    {item.description}
                  </Text>
                </View>
              </TouchableOpacity>
            )}
            keyExtractor={(item, index) => index}
            showsVerticalScrollIndicator={false}
            refreshing={loading}
            onRefresh={() => getResults()}
          />
        )}
      </View>
    </View>
  )
}

export default Search

const styles = StyleSheet.create({})
