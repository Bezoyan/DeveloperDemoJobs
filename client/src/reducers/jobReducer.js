import {
  ADD_JOB,
  GET_JOBS,
  GET_JOB,
  JOB_LOADING,
  DELETE_JOB
} from '../actions/types';

const initialState = {
  jobs: [],
  job: {},
  loading: false
};

export default function(state = initialState, action) {
  switch(action.type) {
    case JOB_LOADING:
      return {
        ...state,
        loading: true
      };
    case GET_JOBS:
      return {
        ...state,
        jobs: action.payload,
        loading: false
      };
    case GET_JOB:
      return {
        ...state,
        job: action.payload,
        loading: false
      };
    case ADD_JOB:
      return {
        ...state,
        jobs: [action.payload, ...state.jobs]
      };
    case DELETE_JOB:
      return {
        ...state,
        jobs: state.jobs.filter(
          job => job._id !== action.payload)
      };
    default:
      return state;
  }
}
