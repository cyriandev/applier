import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useContext, useState } from 'react'
import Input from '../../components/Input'
import Button from '../../components/Button'
import AuthContext from '../../context/auth/authContext'

const Register = ({ navigation }) => {
  const { register, loading } = useContext(AuthContext)
  const [names, setNames] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleRegister = () => {
    const user = {
      name: names,
      email,
      password,
    }
    if (names == '' || email == '' || password == '')
      console.log('fill everything')
    else register(user)
  }

  return (
    <View style={styles.container}>
      <View>
        <View style={{ marginVertical: 30 }}>
          <Text style={{ fontSize: 30, fontWeight: '700' }}>
            Welcome to Applier
          </Text>
          <Text style={{ color: 'gray' }}>
            Good to see you, enter your details below to start using this app.
          </Text>
        </View>
        <Input
          label='Names'
          placeholder='Enter your names'
          icon='account'
          setValue={setNames}
          value={names}
        />
        <Input
          label='Email Address'
          placeholder='Enter your email address'
          icon='email-outline'
          setValue={setEmail}
          value={email}
        />
        <Input
          label='Password'
          placeholder='Enter your password'
          icon='key-variant'
          setValue={setPassword}
          value={password}
          secureTextEntry={true}
        />
      </View>

      <View>
        <Button
          loading={loading}
          text='Create an account'
          onPress={handleRegister}
        />
        <View style={{ marginTop: 10 }}>
          <TouchableOpacity onPress={() => navigation.navigate('Login')}>
            <Text
              style={{
                textAlign: 'center',
                fontWeight: '500',
                color: 'gray',
                padding: 5,
              }}
            >
              Already have an account? login.
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  )
}

export default Register

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F8F8',
    padding: 20,
    justifyContent: 'space-between',
  },
})
