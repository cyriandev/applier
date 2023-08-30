import {
  GET_UNIVERSITIES_LOADING,
  GET_UNIVERSITIES,
  APPLIER_ERROR,
  GET_JOBS_LOADING,
  GET_JOBS,
  APPLY,
} from '../types'

export default (state, action) => {
  switch (action.type) {
    case GET_UNIVERSITIES_LOADING:
      return {
        ...state,
        universitiesLoading: true,
      }
    case GET_JOBS_LOADING:
      return {
        ...state,
        jobsLoading: true,
      }
    case GET_UNIVERSITIES:
      return {
        ...state,
        universities: action.payload,
        universitiesLoading: false,
      }
    case GET_JOBS:
      return {
        ...state,
        jobs: action.payload,
        jobsLoading: false,
      }
    case APPLY:
      return {
        ...state,
        universitiesLoading: false,
      }

    case APPLIER_ERROR:
      return {
        ...state,
        universitiesLoading: false,
        jobsLoading: false,
      }
    default:
      return state
  }
}
