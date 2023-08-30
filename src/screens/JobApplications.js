import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Linking,
} from 'react-native'
import React, { useContext, useEffect } from 'react'
import Loading from '../components/Loading'
import ApplierContext from '../context/applier/applierContext'
import { Ionicons } from '@expo/vector-icons'

const JobApplications = () => {
  const { getJobs, jobsLoading, jobs } = useContext(ApplierContext)

  useEffect(() => {
    getJobs()
  }, [])

  return (
    <View style={styles.container}>
      <View style={{ padding: 20, marginTop: 25 }}>
        <Text style={{ fontSize: 20, fontWeight: '700', color: 'black' }}>
          Job Applications
        </Text>
      </View>

      <View
        style={{
          paddingHorizontal: 20,
          paddingTop: 20,
          flex: 1,
        }}
      >
        {jobsLoading ? (
          <Loading />
        ) : (
          <FlatList
            data={jobs}
            renderItem={({ item }) => (
              <TouchableOpacity
                onPress={() => Linking.openURL(item.redirect_url)}
              >
                <View
                  style={{
                    backgroundColor: '#f1f1f1',
                    borderRadius: 5,
                    marginVertical: 10,
                    padding: 10,
                  }}
                >
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                    }}
                  >
                    <Text style={{ fontSize: 20, color: 'black' }}>
                      {item.title}
                    </Text>
                    <Ionicons name='open-outline' size={20} color='black' />
                  </View>
                  <Text style={{ color: '#036552' }}>
                    {item.company.display_name}
                  </Text>
                  <Text
                    numberOfLines={4}
                    style={{ color: 'gray', marginTop: 10 }}
                  >
                    {item.description}
                  </Text>
                </View>
              </TouchableOpacity>
            )}
            keyExtractor={(item, index) => index}
            showsVerticalScrollIndicator={false}
            refreshing={jobsLoading}
            onRefresh={() => getJobs()}
          />
        )}
      </View>
    </View>
  )
}

export default JobApplications
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: 'white' },
})
