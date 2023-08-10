import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native'
import React, { useContext, useEffect } from 'react'
import { FlatList } from 'react-native'
import UniItem from '../components/UniItem'
import ApplierContext from '../context/applier/applierContext'
import Loading from '../components/Loading'

const UniApplications = ({ navigation }) => {
  const { getUniversities, universitiesLoading, universities } =
    useContext(ApplierContext)

  useEffect(() => {
    getUniversities()
  }, [])

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={{ fontSize: 20, fontWeight: '700', color: 'black' }}>
          University Application
        </Text>

        <TouchableOpacity onPress={() => navigation.navigate('APS')}>
          <View
            style={{ padding: 5, flexDirection: 'row', alignItems: 'center' }}
          >
            <Text style={{ fontSize: 20, fontWeight: '700', color: 'black' }}>
              APS+-
            </Text>
          </View>
        </TouchableOpacity>
      </View>

      <View
        style={{
          paddingHorizontal: 20,
          paddingTop: 20,
          flex: 1,
        }}
      >
        {universitiesLoading ? (
          <Loading />
        ) : (
          <FlatList
            data={universities}
            renderItem={({ item }) => <UniItem university={item} />}
            keyExtractor={(item, index) => index}
            showsVerticalScrollIndicator={false}
            refreshing={universitiesLoading}
            onRefresh={() => getUniversities()}
          />
        )}
      </View>
    </View>
  )
}

export default UniApplications
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: 'white', paddingTop: 20 },
  header: {
    backgroundColor: '#fff',
    padding: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
})
