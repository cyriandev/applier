import React, { useReducer } from 'react'
import ApplierContext from './applierContext'
import ApplierReducer from './applierReducer'

import {
  GET_UNIVERSITIES,
  APPLIER_ERROR,
  GET_UNIVERSITIES_LOADING,
  GET_JOBS,
  GET_JOBS_LOADING,
} from '../types'

import { db } from '../../firebase/config'
import { collection, getDocs, query, where } from 'firebase/firestore'

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
    setJobsLoading()
    try {
      const q = query(jobsCollection)
      const res = await getDocs(q)
      const jobs = res.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }))
      dispatch({ type: GET_JOBS, payload: jobs })
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
      }}
    >
      {children}
    </ApplierContext.Provider>
  )
}

export default ApplierState
