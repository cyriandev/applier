import { Picker } from '@react-native-picker/picker'
import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

const SelectInput = ({
  title,
  subjects,
  marks,
  setSelectedSubject,
  setSelectedMark,
  selectedSubject,
  selectedMark,
}) => {
  return (
    <View>
      <Text style={{ marginVertical: 15, fontSize: 18 }}>{title}</Text>
      <View style={{ flexDirection: 'row' }}>
        <View
          style={{
            height: 50,
            borderWidth: 1,
            borderColor: '#E3E6E6',
            borderRadius: 5,
            flex: 1,
            marginRight: 5,
          }}
        >
          <Picker
            selectedValue={selectedSubject}
            onValueChange={(itemValue, itemIndex) =>
              setSelectedSubject(itemValue)
            }
          >
            <Picker.Item
              style={{ color: '#bdbdbd' }}
              label={`Select ${title}`}
              value=''
            />
            {subjects.map((subject, index) => (
              <Picker.Item key={index} label={subject} value={subject} />
            ))}
          </Picker>
        </View>
        <View
          style={{
            height: 50,
            borderWidth: 1,
            borderColor: '#E3E6E6',
            borderRadius: 5,
            flex: 0.7,
          }}
        >
          <Picker
            selectedValue={selectedMark}
            onValueChange={(itemValue) => setSelectedMark(itemValue)}
          >
            <Picker.Item style={{ color: '#bdbdbd' }} label='Mark' value='' />
            {marks.map(({ mark, points }, index) => (
              <Picker.Item key={index} label={mark} value={points} />
            ))}
          </Picker>
        </View>
      </View>
    </View>
  )
}

export default SelectInput

const styles = StyleSheet.create({})
