import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useContext, useState } from 'react'
import Input from '../../components/Input'
import Button from '../../components/Button'
import AuthContext from '../../context/auth/authContext'

const ResetPassword = ({ navigation }) => {
  const { resetPassword, loading } = useContext(AuthContext)
  const [email, setEmail] = useState('')

  const handleReset = () => {
    if (email == '') console.log('fill everything')
    else resetPassword(email)
  }
  return (
    <View style={styles.container}>
      <View>
        <View style={{ marginVertical: 30 }}>
          <Text style={{ fontSize: 30, fontWeight: '700' }}>
            Reset Password
          </Text>
          <Text style={{ color: 'gray' }}>
            You forgot your password, well no worries just enter your email and
            we'll send you a link to reset your password.
          </Text>
        </View>
        <Input
          label='Email Address'
          placeholder='Enter your email address'
          icon='email-outline'
          setValue={setEmail}
          value={email}
        />
      </View>

      <View>
        <Button
          text='Send reset password link'
          onPress={handleReset}
          loading={loading}
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
              back to login
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  )
}

export default ResetPassword

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F8F8',
    padding: 20,
    justifyContent: 'space-between',
  },
})
