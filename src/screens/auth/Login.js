import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useContext, useState } from 'react'
import Input from '../../components/Input'
import Button from '../../components/Button'
import AuthContext from '../../context/auth/authContext'

const Login = ({ navigation }) => {
  const { login, loading } = useContext(AuthContext)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = () => {
    const user = {
      email,
      password,
    }
    if (email == '' || password == '') console.log('hello')
    else login(user)
  }
  return (
    <View style={styles.container}>
      <View>
        <View style={{ marginVertical: 30 }}>
          <Text style={{ fontSize: 30, fontWeight: '700' }}>Welcome Back</Text>
          <Text style={{ color: 'gray' }}>
            Good to see you again, enter your details below to continue using
            this app.
          </Text>
        </View>
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

        <View style={{ marginTop: 0 }}>
          <TouchableOpacity
            onPress={() => navigation.navigate('ResetPassword')}
          >
            <Text
              style={{
                textAlign: 'right',
                fontWeight: '500',
                color: 'gray',
                padding: 5,
              }}
            >
              Forgot Password?
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      <View>
        <Button
          text='Login to your account'
          onPress={handleLogin}
          loading={loading}
        />
        <View style={{ marginTop: 10 }}>
          <TouchableOpacity onPress={() => navigation.navigate('Register')}>
            <Text
              style={{
                textAlign: 'center',
                fontWeight: '500',
                color: 'gray',
                padding: 5,
              }}
            >
              Don't have an account? Register.
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  )
}

export default Login

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F8F8',
    padding: 20,
    justifyContent: 'space-between',
  },
})
