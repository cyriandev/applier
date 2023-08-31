import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { Feather } from '@expo/vector-icons'
import React, { useContext, useState } from 'react'
import AuthContext from '../context/auth/authContext'
import ApplierContext from '../context/applier/applierContext'
import Button from '../components/Button'
import { Picker } from '@react-native-picker/picker'

const Apply = ({ navigation, route }) => {
  const { user, personalInformation } = useContext(AuthContext)
  const { apply, universitiesLoading } = useContext(ApplierContext)
  const {
    id,
    name,
    qualifications,
    openingDate,
    closingDate,
    applicationFee,
    applications,
  } = route.params

  const [aps, setAps] = useState(
    personalInformation?.results.reduce((aps, result) => {
      return (aps += result.level)
    }, 0)
  )
  const [selectedQualification, setSelectedQualification] = useState('')
  const [application, setApplication] = useState(
    applications?.filter((application) => application.userId == user.id)[0]
  )

  const handleApply = () => {
    apply(id, user, selectedQualification, navigation)
  }

  const handlePay = () => {
    navigation.navigate('Pay', {
      id,
      user,
      selectedQualification,
      applicationFee,
      personalInformation,
    })
  }

  return (
    <View style={{ flex: 1, backgroundColor: 'white', paddingTop: 30 }}>
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
          {name}
        </Text>
      </View>
      <View style={{ flex: 1 }}>
        {application ? (
          <View
            style={{
              padding: 10,
              backgroundColor: '#f1f1f1',
              marginTop: 10,
              borderRadius: 5,
              margin: 20,
            }}
          >
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}
            >
              <Text style={{ color: 'gray' }}>Qualification</Text>
              <Text style={{ color: '#036552', marginLeft: 10 }}>
                {application.qualification.name}
              </Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}
            >
              <Text style={{ color: 'gray' }}>Duration</Text>
              <Text style={{ color: '#036552', marginLeft: 10 }}>
                {application.qualification.duration} years
              </Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}
            >
              <Text style={{ color: 'gray' }}>Aps</Text>
              <Text style={{ color: '#036552', marginLeft: 10 }}>
                {application.qualification.aps}
              </Text>
            </View>

            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}
            >
              <Text style={{ color: 'gray' }}>Status</Text>
              <Text style={{ color: '#036552', marginLeft: 10 }}>
                {application.status}
              </Text>
            </View>
          </View>
        ) : personalInformation ? (
          <View style={{ padding: 20, flex: 1 }}>
            <View>
              <Text
                style={{
                  color: 'black',
                  fontSize: 17,
                  fontWeight: '600',
                }}
              >
                Details
              </Text>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}
              >
                <Text style={{ color: 'gray' }}>Opening date</Text>
                <Text style={{ color: '#036552', marginLeft: 10 }}>
                  {openingDate}
                </Text>
              </View>

              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}
              >
                <Text style={{ color: 'gray' }}>Closing date</Text>
                <Text style={{ color: '#036552', marginLeft: 10 }}>
                  {closingDate}
                </Text>
              </View>

              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}
              >
                <Text style={{ color: 'gray' }}>Application fee</Text>
                <Text style={{ color: '#036552', marginLeft: 10 }}>
                  {applicationFee == 0 ? 'Free' : `R ${applicationFee}`}
                </Text>
              </View>
            </View>

            <Text
              style={{
                color: 'black',
                fontSize: 17,
                fontWeight: '600',
                marginTop: 10,
              }}
            >
              Degree/Qualification
            </Text>

            <View
              style={{
                height: 65,
                borderWidth: 1,
                borderColor: '#E3E6E6',
                borderRadius: 5,
                marginRight: 5,
                padding: 5,
                marginTop: 10,
              }}
            >
              <Picker
                selectedValue={selectedQualification}
                onValueChange={(itemValue, itemIndex) =>
                  setSelectedQualification(itemValue)
                }
                style={{ fontSize: 14 }}
              >
                <Picker.Item
                  style={{ color: '#bdbdbd' }}
                  label={`Select  Degree/Qualification`}
                  value=''
                />
                {qualifications
                  ? qualifications.map((qualification, index) => (
                      <Picker.Item
                        key={index}
                        style={{ color: 'black' }}
                        label={qualification.name}
                        value={qualification}
                      />
                    ))
                  : null}
              </Picker>
            </View>

            {selectedQualification ? (
              <View
                style={{
                  padding: 10,
                  backgroundColor: '#f1f1f1',
                  marginTop: 10,
                  borderRadius: 5,
                }}
              >
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}
                >
                  <Text style={{ color: 'gray' }}>Qualification</Text>
                  <Text style={{ color: '#036552', marginLeft: 10 }}>
                    {selectedQualification.name}
                  </Text>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}
                >
                  <Text style={{ color: 'gray' }}>Duration</Text>
                  <Text style={{ color: '#036552', marginLeft: 10 }}>
                    {selectedQualification.duration} years
                  </Text>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}
                >
                  <Text style={{ color: 'gray' }}>Aps</Text>
                  <Text style={{ color: '#036552', marginLeft: 10 }}>
                    {selectedQualification.aps}
                  </Text>
                </View>

                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}
                >
                  {selectedQualification.aps < aps ? (
                    <Text style={{ color: 'green', marginTop: 10 }}>
                      You qualify for this qualification
                    </Text>
                  ) : (
                    <Text style={{ color: 'tomato', marginTop: 10 }}>
                      You do not qualify for this qualification
                    </Text>
                  )}
                </View>
              </View>
            ) : null}
          </View>
        ) : (
          <View
            style={{
              margin: 20,
              backgroundColor: '#f1f1f1',
              padding: 10,
              borderRadius: 5,
            }}
          >
            <Text style={{ fontSize: 18, fontWeight: '600', color: 'black' }}>
              Please Add your personal information before applying
            </Text>
            <View
              style={{
                paddingTop: 20,
                // flexDirection: 'row',
                // justifyContent: 'flex-end',
              }}
            >
              <Button
                text='Add'
                onPress={() => navigation.navigate('AddPersonalInfo')}
              />
            </View>
          </View>
        )}
      </View>

      {personalInformation &&
      selectedQualification !== '' &&
      selectedQualification.aps < aps ? (
        <View style={{ padding: 20 }}>
          {applicationFee == 0 ? (
            <Button
              text='Apply'
              onPress={handleApply}
              loading={universitiesLoading}
            />
          ) : (
            <Button
              text={`Pay R ${applicationFee}`}
              onPress={handlePay}
              loading={universitiesLoading}
            />
          )}
        </View>
      ) : null}
    </View>
  )
}

export default Apply

const styles = StyleSheet.create({})
