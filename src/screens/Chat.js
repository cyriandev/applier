import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  FlatList,
} from 'react-native'
import React, { useContext, useEffect, useRef, useState } from 'react'
import { Feather, Ionicons } from '@expo/vector-icons'
import AuthContext from '../context/auth/authContext'
import {
  Timestamp,
  arrayUnion,
  doc,
  onSnapshot,
  updateDoc,
} from 'firebase/firestore'
import { db } from '../firebase/config'
import MessageInput from '../components/MessageInput'
import Loading from '../components/Loading'
import Message from '../components/Message'

const Chat = ({ navigation, route }) => {
  const { user } = useContext(AuthContext)
  const [chat, setChat] = useState([])
  const [text, setText] = useState('')
  const [loading, setLoading] = useState(false)
  const [chatsLoading, setChatsLoading] = useState(false)

  const flatListRef = useRef(null)

  const { id } = route.params

  useEffect(() => {
    const getChats = () => {
      setChatsLoading(true)
      const unsubscribe = onSnapshot(doc(db, 'chats', id), (doc) => {
        doc.exists() && setChat(doc.data())
        setChatsLoading(false)
        // flatListRef.current.scrollToEnd({ animated: true })
      })
      return () => {
        unsubscribe()
      }
    }
    getChats()
  }, [])

  // useEffect(() => {
  //   if (messages?.length > 0)
  //     flatListRef.current.scrollToEnd({ animated: true })
  // }, [messages])

  const send = async () => {
    if (!text) return
    setLoading(true)
    try {
      await updateDoc(doc(db, 'chats', id), {
        messages: arrayUnion({
          id: [...Array(1)]
            .map(() =>
              Math.floor(Math.random() * new Date().valueOf()).toString(16)
            )
            .join(''),
          text,
          senderId: user.id,
          date: Timestamp.now(),
        }),
      })

      setText('')
      setLoading(false)
    } catch (error) {
      setLoading(false)
      console.log(error)
    }
  }

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: 'white',
        paddingTop: 30,
      }}
    >
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
          {chat.username}
        </Text>
      </View>
      <View
        style={{ flex: 1, paddingHorizontal: 20, backgroundColor: '#f1f1f1' }}
      >
        {chatsLoading ? <Loading /> : null}
        {chat.messages && (
          <FlatList
            ref={flatListRef}
            data={chat.messages}
            onContentSizeChange={() => {
              flatListRef?.current?.scrollToEnd({ animated: true })
            }}
            onLayout={() => {
              flatListRef?.current?.scrollToEnd({ animated: true })
            }}
            // initialScrollIndex={messages.length - 1}
            renderItem={({ item }) => <Message message={item} user={user} />}
            keyExtractor={(item, index) => index}
            showsVerticalScrollIndicator={false}
          />
        )}
      </View>

      <MessageInput
        setText={setText}
        text={text}
        send={send}
        loading={loading}
      />
    </View>
  )
}

export default Chat

const styles = StyleSheet.create({})
