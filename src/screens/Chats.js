import {
  FlatList,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native'
import React, { useEffect, useState } from 'react'
import { collection, onSnapshot } from 'firebase/firestore'
import { db } from '../firebase/config'
import { Ionicons } from '@expo/vector-icons'
import moment from 'moment'

const Chats = ({ navigation }) => {
  const [chats, setChats] = useState([])
  useEffect(() => {
    const getChats = () => {
      const unsubscribe = onSnapshot(collection(db, 'chats'), (snapshot) => {
        const chats = []
        snapshot.forEach((doc) => {
          const data = doc.data()
          if (data?.messages?.length) chats.push({ ...data, id: doc.id })
        })
        setChats(chats)
      })
      return () => {
        unsubscribe()
      }
    }
    getChats()
  }, [])
  return (
    <View style={styles.container}>
      <View style={{ paddingTop: 30, paddingHorizontal: 20 }}>
        <Text style={{ fontSize: 20, fontWeight: '700', color: 'black' }}>
          Chats
        </Text>
      </View>

      <View style={{ flex: 1, padding: 20 }}>
        {chats && (
          <FlatList
            ItemSeparatorComponent={() => <View style={{ height: 20 }} />}
            data={chats}
            // initialScrollIndex={chats.length - 1}
            renderItem={({ item }) => (
              <TouchableOpacity
                onPress={() => navigation.navigate('Chat', { id: item.id })}
              >
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <View
                    style={{
                      justifyContent: 'center',
                      alignItems: 'center',
                      padding: 10,
                      backgroundColor: '#f1f1f1',
                      borderRadius: 30,
                    }}
                  >
                    <Ionicons name='md-person-sharp' size={24} color='black' />
                  </View>
                  <View style={{ marginLeft: 10, flex: 1 }}>
                    <Text
                      style={{
                        fontSize: 18,
                        fontWeight: '600',
                        color: 'black',
                      }}
                    >
                      {item.username}
                    </Text>
                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                      }}
                    >
                      <Text
                        style={{ color: 'gray', flex: 1 }}
                        numberOfLines={1}
                      >
                        {item.messages[item.messages.length - 1].text}
                      </Text>
                      <Text style={{ color: 'gray' }} numberOfLines={1}>
                        {moment(
                          item.messages[item.messages.length - 1].date.toDate()
                        ).format('h:mm')}
                      </Text>
                    </View>
                  </View>
                </View>
              </TouchableOpacity>
            )}
            keyExtractor={(item, index) => index}
            showsVerticalScrollIndicator={false}
          />
        )}
      </View>
    </View>
  )
}

export default Chats

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: 'white' },
})
