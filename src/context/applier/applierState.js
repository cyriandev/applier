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

  // Apply
  // const updateUni = async () => {
  //   try {
  //     await updateDoc(doc(db, 'universities', 'ux0YYyQApaSIs4CVsXMl'), {
  //       qualifications: arrayUnion(
  //         { name: 'Nursing', aps: 25, duration: 3 },
  //         { name: 'Human Nutrition', aps: 20, duration: 3 },
  //         { name: 'Health Promotion Unit', aps: 25, duration: 2 },
  //         { name: 'Optometry', aps: 20, duration: 3 },
  //         { name: 'Pharmacy', aps: 25, duration: 2 },
  //         {
  //           name: 'Medical Sciences',
  //           aps: 35,
  //           duration: 7,
  //         },
  //         { name: 'Faculty of Humanities', aps: 25, duration: 3 },
  //         {
  //           name: 'Advanced Certificate in Education – Mathematics (ACEM)',
  //           aps: 20,
  //           duration: 1,
  //         },
  //         {
  //           name: 'Advanced Certificate in Education – Science (ACES)',
  //           aps: 25,
  //           duration: 3,
  //         },
  //         {
  //           name: 'Advanced Certificate in Education – Grade R (ACEGR)',
  //           aps: 20,
  //           duration: 2,
  //         },
  //         {
  //           name: 'Advanced Certificate in Education – Learners with Barriers to Learning and Education – Remedial Education (ACERE)',
  //           aps: 25,
  //           duration: 3,
  //         },
  //         {
  //           name: 'Advanced Certificate in Adult Basic Education and Training (ACEABE)',
  //           aps: 25,
  //           duration: 3,
  //         },
  //         {
  //           name: 'Advanced Certificate in Education – Life Orientation (ACELO)',
  //           aps: 25,
  //           duration: 3,
  //         },
  //         {
  //           name: 'Advanced Certificate in Education – Integrating Values and Human Rights in Education (ACEHRE)',
  //           aps: 25,
  //           duration: 3,
  //         },
  //         {
  //           name: 'Post Graduate Certificate In Education (PGCE)',
  //           aps: 25,
  //           duration: 3,
  //         },
  //         {
  //           name: 'Bachelor of Education Senior Phase and FET (BEDSPF)',
  //           aps: 25,
  //           duration: 3,
  //         },
  //         { name: 'Computer Science', aps: 25, duration: 3 },
  //         { name: 'Mathematics and Applied Mathematics', aps: 25, duration: 3 },
  //         { name: 'Statistics and Operations Research', aps: 25, duration: 3 },
  //         {
  //           name: 'Agricultural Economics and Animal Production',
  //           aps: 25,
  //           duration: 3,
  //         },
  //         { name: 'Geography and Environmental studies', aps: 25, duration: 3 },
  //         {
  //           name: 'Plant Production,Soil Science and Remote Sensing',
  //           aps: 25,
  //           duration: 3,
  //         },
  //         { name: 'Water and Sanitation', aps: 25, duration: 3 },
  //         { name: 'Accounting and Auditing', aps: 25, duration: 3 },
  //         { name: 'Business Management', aps: 25, duration: 3 },
  //         { name: 'Economics', aps: 25, duration: 3 },
  //         { name: 'Development Studies', aps: 25, duration: 3 },
  //         { name: 'Human Resource Management', aps: 25, duration: 3 },
  //         { name: 'Public Administration', aps: 25, duration: 3 },
  //         { name: 'Transport Management', aps: 25, duration: 3 },
  //         { name: 'Bachelor Of Law', aps: 25, duration: 3 }
  //       ),
  //     })

  //     console.log('done')
  //   } catch (error) {
  //     console.log(error)
  //   }
  // }

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
