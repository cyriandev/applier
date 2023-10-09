import React, { useReducer } from 'react'
import ApplierContext from './applierContext'
import ApplierReducer from './applierReducer'

import {
  GET_UNIVERSITIES_LOADING,
  GET_NOTICES_LOADING,
  GET_UNIVERSITIES,
  GET_JOBS_LOADING,
  APPLIER_ERROR,
  GET_NOTICES,
  GET_JOBS,
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
} from 'firebase/firestore'
import axios from 'axios'

const ApplierState = ({ children }) => {
  const initialState = {
    jobs: [],
    universities: [],
    notices: [],
    universitiesLoading: false,
    jobsLoading: false,
    errors: null,
    noticesLoading: false,
  }
  const [state, dispatch] = useReducer(ApplierReducer, initialState)
  const universitiesCollection = collection(db, 'universities')
  const noticesCollection = collection(db, 'notices')

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

  // Get Notices
  const getNotices = async () => {
    setNoticesLoading()
    try {
      const q = query(noticesCollection)
      const res = await getDocs(q)
      const notices = res.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }))
      dispatch({ type: GET_NOTICES, payload: notices })
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
      navigation.navigate('Home')
    } catch (error) {
      dispatch({ type: APPLIER_ERROR })
      console.log(error)
    }
  }

  // Set Loading
  const setGetUniversitiesLoading = () =>
    dispatch({ type: GET_UNIVERSITIES_LOADING })
  const setJobsLoading = () => dispatch({ type: GET_JOBS_LOADING })
  const setNoticesLoading = () => dispatch({ type: GET_NOTICES_LOADING })

  return (
    <ApplierContext.Provider
      value={{
        universitiesLoading: state.universitiesLoading,
        noticesLoading: state.noticesLoading,
        universities: state.universities,
        jobsLoading: state.jobsLoading,
        notices: state.notices,
        jobs: state.jobs,
        getUniversities,
        getNotices,
        getJobs,
        apply,
      }}
    >
      {children}
    </ApplierContext.Provider>
  )
}

export default ApplierState
