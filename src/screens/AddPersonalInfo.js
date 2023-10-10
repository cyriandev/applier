import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import React, { useContext, useState } from 'react'
import Input from '../components/Input'
import Button from '../components/Button'
import AuthContext from '../context/auth/authContext'
import { Picker } from '@react-native-picker/picker'
import { MaterialCommunityIcons } from '@expo/vector-icons'

const schoolSubjects = [
  'Business Studies ',
  'Consumer Studies',
  'Dramatic Arts',
  'Information Technology ',
  'Life Sciences ',
  'Accounting',
  'Agricultural Science',
  'Mathematics',
  'Mathematics Literacy',
  'Music',
  'Physical Sciences ',
  'Religion Studies',
  'Visual Arts',
  'Economics',
  'Engineering graphics and design ',
  'Geography',
  'History',
  'Sesotho',
  'Setswana',
  'Siswati',
  'Tshivenda',
  'Xitsonga',
  'Afrikaans',
  'English',
  'IsiNdebele',
  'IsiXhosa',
  'IsiZulu',
  'Sepedi',
]

const AddPersonalInfo = ({ navigation }) => {
  const { storePersonalInfo, personalInformation, loading } =
    useContext(AuthContext)

  const [names, setNames] = useState(
    personalInformation ? personalInformation.names : ''
  )
  const [surname, setSurname] = useState(
    personalInformation ? personalInformation.surname : ''
  )
  const [idNumber, setIdNumber] = useState(
    personalInformation ? personalInformation.idNumber : ''
  )

  const [subject, setSubject] = useState('')
  const [percentage, setPercentage] = useState('')
  const [results, setResults] = useState(
    personalInformation ? personalInformation.results : []
  )

  const handleAdd = () => {
    if (subject !== '' && percentage !== '') {
      let level = 0
      if (percentage >= 0 && percentage <= 29) level = 1
      else if (percentage >= 30 && percentage <= 39) level = 2
      else if (percentage >= 40 && percentage <= 49) level = 3
      else if (percentage >= 50 && percentage <= 59) level = 4
      else if (percentage >= 60 && percentage <= 69) level = 5
      else if (percentage >= 70 && percentage <= 79) level = 6
      else if (percentage >= 80 && percentage <= 89) level = 7
      else if (percentage >= 90 && percentage <= 100) level = 8

      setResults([...results, { subject, percentage, level }])
      setPercentage('')
      setSubject('')
    }
  }

  const handleSubmit = () => {
    const data = {
      names,
      surname,
      idNumber,
      results,
    }
    if (names == '' || surname == '' || idNumber == '' || results.length < 6)
      console.log('please enter all required information')
    else storePersonalInfo(data, navigation)
  }

  // console.log(results)
  return (
    <View style={{ padding: 20, flex: 1 }}>
      <View style={{ paddingTop: 20 }}>
        <Text style={{ color: 'black', fontSize: 20, fontWeight: '700' }}>
          Add your personal information
        </Text>
      </View>

      <ScrollView
        style={{ marginTop: 20, flex: 1 }}
        showsVerticalScrollIndicator={false}
      >
        <Input
          label='Names'
          placeholder='Enter your name'
          icon='account'
          setValue={setNames}
          value={names}
        />
        <Input
          label='Surname'
          placeholder='Enter your surname'
          icon='account'
          setValue={setSurname}
          value={surname}
        />
        <Input
          label='Identity Number (ID Number)'
          placeholder='Enter your ID Number'
          icon='identifier'
          setValue={setIdNumber}
          value={idNumber}
          keyboardType={'decimal-pad'}
        />

        <View
          style={{ height: 1, backgroundColor: '#E3E6E6', marginVertical: 5 }}
        />

        <View>
          <Text style={{ color: 'black', fontSize: 17, fontWeight: '600' }}>
            Highest grade passed results
          </Text>

          {results.map((result, index) => (
            <TouchableOpacity
              key={index}
              onPress={() =>
                setResults(
                  results.filter((res) => res.subject !== result.subject)
                )
              }
            >
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: 10,
                  backgroundColor: '#bdbdbd',
                  borderRadius: 5,
                  marginTop: 5,
                }}
              >
                <Text style={{ color: 'black' }}>
                  {index + 1}. {result.subject}
                </Text>
                <Text style={{ color: 'black' }}>{result.percentage}%</Text>
              </View>
            </TouchableOpacity>
          ))}
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <View style={{ flex: 1 }}>
              {/* <Input
                label='Subject'
                placeholder='Enter Subject'
                icon='book'
                setValue={setSubject}
                value={subject}
              /> */}
              <Text
                style={{
                  marginBottom: 10,
                  fontSize: 15,
                  color: 'black',
                  fontWeight: '500',
                }}
              >
                Subject
              </Text>
              <View
                style={{
                  height: 50,
                  backgroundColor: 'white',
                  borderRadius: 5,
                  borderWidth: 1,
                  borderColor: '#E3E6E6',
                  overflow: 'hidden',
                  flexDirection: 'row',
                  alignItems: 'center',
                }}
              >
                <MaterialCommunityIcons
                  name='book'
                  size={20}
                  color='black'
                  style={{ paddingHorizontal: 10 }}
                />
                <Picker
                  selectedValue={subject}
                  onValueChange={(itemValue, itemIndex) =>
                    setSubject(itemValue)
                  }
                  style={{
                    // backgroundColor: 'red',
                    height: 50,
                    borderRadius: 5,
                    flex: 1,
                    backgroundColor: 'white',
                  }}
                >
                  <Picker.Item
                    style={{ color: '#bdbdbd' }}
                    label={`Select subject`}
                    value=''
                  />
                  {schoolSubjects.map((subject, index) => (
                    <Picker.Item key={index} label={subject} value={subject} />
                  ))}
                </Picker>
              </View>
              {/* <Text style={{ color: 'gray', fontSize: 12 }}>
                Don't include life orientation
              </Text> */}
            </View>
            <View style={{ flex: 0.5, marginLeft: 5 }}>
              <Input
                label='Percent'
                placeholder='Enter %'
                icon='percent'
                setValue={setPercentage}
                value={percentage}
                keyboardType={'decimal-pad'}
              />
            </View>
          </View>
          <View
            style={{
              paddingTop: 20,
              flexDirection: 'row',
              justifyContent: 'flex-end',
            }}
          >
            <Button text='Add' onPress={handleAdd} />
          </View>
        </View>

        <View
          style={{ height: 1, backgroundColor: '#E3E6E6', marginVertical: 5 }}
        />

        <View style={{ paddingTop: 20 }}>
          <Button text='Submit' onPress={handleSubmit} loading={loading} />
        </View>
      </ScrollView>
    </View>
  )
}

export default AddPersonalInfo

const styles = StyleSheet.create({})
