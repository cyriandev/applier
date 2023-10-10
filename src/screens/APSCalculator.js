import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { Feather } from '@expo/vector-icons'
import SelectInput from '../components/SelectInput'
import Button from '../components/Button'
import { Alert } from 'react-native'

const apsMarks = [
  { mark: '90 - 100%', points: 8 },
  { mark: '80 - 89%', points: 7 },
  { mark: '70 - 79%', points: 6 },
  { mark: '60 - 69%', points: 5 },
  { mark: '50 - 59%', points: 4 },
  { mark: '40 - 49%', points: 3 },
  { mark: '30 - 39%', points: 2 },
  { mark: '0 - 29%', points: 1 },
]

const schoolSubjects = [
  'Accounting',
  'Agricultural Science',
  'Geography',
  'Life Sciences',
  'Life Orientation',
  'Physical sciences',
  'History',
  'Business Studies ',
  'Consumer Studies ',
  'Dramatic Arts',
  'Information Technology ',
  'Music',
  'Physical Sciences ',
  'Religion Studies',
  'Visual Arts',
  'Economics',
  'Engineering graphics and design ',
]

const languageSubjects = [
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

const APSCalculator = ({ navigation }) => {
  const [language1, setLanguage1] = useState('')
  const [language1Mark, setLanguage1Mark] = useState('')

  const [language2, setLanguage2] = useState('')
  const [language2Mark, setLanguage2Mark] = useState('')

  const [math, setMath] = useState('')
  const [mathMark, setMathMark] = useState('')

  const [subject4, setSubject4] = useState('')
  const [subject4Mark, setSubject4Mark] = useState('')

  const [subject5, setSubject5] = useState('')
  const [subject5Mark, setSubject5Mark] = useState('')

  const [subject6, setSubject6] = useState('')
  const [subject6Mark, setSubject6Mark] = useState('')

  const handleCalculate = () => {
    if (
      language1Mark == '' ||
      language2Mark == '' ||
      mathMark == '' ||
      subject4Mark == '' ||
      subject5Mark == '' ||
      subject6Mark == ''
    )
      console.log('please fill everything...')
    else
      Alert.alert(
        'APS Total',
        `Your APS ${
          language1Mark +
          language2Mark +
          mathMark +
          subject4Mark +
          subject5Mark +
          subject6Mark
        }`
      )
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
          APS Calculator
        </Text>
      </View>

      <View
        style={{
          flex: 1,
          paddingHorizontal: 20,
          justifyContent: 'space-between',
        }}
      >
        <View>
          <SelectInput
            title='Language 1'
            subjects={languageSubjects}
            marks={apsMarks}
            setSelectedSubject={setLanguage1}
            setSelectedMark={setLanguage1Mark}
            selectedSubject={language1}
            selectedMark={language1Mark}
          />

          <SelectInput
            title='Language 2'
            subjects={languageSubjects}
            marks={apsMarks}
            setSelectedSubject={setLanguage2}
            setSelectedMark={setLanguage2Mark}
            selectedSubject={language2}
            selectedMark={language2Mark}
          />

          <SelectInput
            title='Maths'
            subjects={[
              'Mathematics',
              'Mathematical Literacy',
              'Technical Mathematical',
            ]}
            marks={apsMarks}
            setSelectedSubject={setMath}
            setSelectedMark={setMathMark}
            selectedSubject={math}
            selectedMark={mathMark}
          />

          <SelectInput
            title='Subject 4'
            subjects={schoolSubjects}
            marks={apsMarks}
            setSelectedSubject={setSubject4}
            setSelectedMark={setSubject4Mark}
            selectedSubject={subject4}
            selectedMark={subject4Mark}
          />
          <SelectInput
            title='Subject 5'
            subjects={schoolSubjects}
            marks={apsMarks}
            setSelectedSubject={setSubject5}
            setSelectedMark={setSubject5Mark}
            selectedSubject={subject5}
            selectedMark={subject5Mark}
          />
          <SelectInput
            title='Subject 6'
            subjects={schoolSubjects}
            marks={apsMarks}
            setSelectedSubject={setSubject6}
            setSelectedMark={setSubject6Mark}
            selectedSubject={subject6}
            selectedMark={subject6Mark}
          />
        </View>
        <View style={{ marginVertical: 15 }}>
          <Button
            text='Calculate APS'
            onPress={handleCalculate}
            //   loading={loading}
          />
        </View>
      </View>
    </View>
  )
}

export default APSCalculator

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#fff',
    padding: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  input: {
    backgroundColor: 'red',
    padding: 10,
  },
})
