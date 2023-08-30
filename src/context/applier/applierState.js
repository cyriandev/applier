import React, { useReducer } from 'react'
import ApplierContext from './applierContext'
import ApplierReducer from './applierReducer'

import {
  GET_UNIVERSITIES,
  APPLIER_ERROR,
  GET_UNIVERSITIES_LOADING,
  GET_JOBS,
  GET_JOBS_LOADING,
  APPLY,
} from '../types'

import { db } from '../../firebase/config'
import {
  Timestamp,
  arrayUnion,
  collection,
  doc,
  getDocs,
  query,
  updateDoc,
  where,
} from 'firebase/firestore'
import axios from 'axios'

const ApplierState = ({ children }) => {
  const initialState = {
    jobs: [],
    universities: [],
    universitiesLoading: false,
    jobsLoading: false,
    errors: null,
  }
  const [state, dispatch] = useReducer(ApplierReducer, initialState)
  const universitiesCollection = collection(db, 'universities')
  const jobsCollection = collection(db, 'Jobs')

  // Get Universities
  const getUniversities = async () => {
    setGetUniversitiesLoading()
    try {
      const q = query(universitiesCollection)
      const res = await getDocs(q)
      const universities = res.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }))
      dispatch({ type: GET_UNIVERSITIES, payload: universities })
    } catch (error) {
      dispatch({ type: APPLIER_ERROR })
      console.log(error)
    }
  }

  // Get Jobs
  const getJobs = async () => {
    console.log('GER')
    setJobsLoading()
    try {
      const res = await axios.get(
        'https://api.adzuna.com/v1/api/jobs/za/search/1?app_id=8acd5000&app_key=6979e0afdbb257def6d2bd5222251bf2&results_per_page=20&what=IT&content-type=application/json'
      )

      dispatch({ type: GET_JOBS, payload: res.data.results })
    } catch (error) {
      dispatch({ type: APPLIER_ERROR })
      console.log(error)
    }
  }
  // Apply
  const apply = async (id, user, qualification, navigation) => {
    setGetUniversitiesLoading()
    try {
      await updateDoc(doc(db, 'universities', id), {
        applications: arrayUnion({
          userId: user.id,
          qualification,
          status: 'Pending',
          date: Timestamp.now(),
        }),
      })

      dispatch({ type: APPLY })
      navigation.goBack()
    } catch (error) {
      dispatch({ type: APPLIER_ERROR })
      console.log(error)
    }
  }

  // Set Loading
  const setGetUniversitiesLoading = () =>
    dispatch({ type: GET_UNIVERSITIES_LOADING })
  const setJobsLoading = () => dispatch({ type: GET_JOBS_LOADING })

  return (
    <ApplierContext.Provider
      value={{
        universitiesLoading: state.universitiesLoading,
        universities: state.universities,
        jobsLoading: state.jobsLoading,
        jobs: state.jobs,
        getUniversities,
        getJobs,
        apply,
      }}
    >
      {children}
    </ApplierContext.Provider>
  )
}

export default ApplierState
