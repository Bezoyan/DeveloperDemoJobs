import axios from 'axios';

import {
  JOB_LOADING,
  GET_JOB,
  GET_JOBS,
  ADD_JOB,
  DELETE_JOB,
  GET_ERRORS
} from './types';

// ADD Job
export const addJob = jobData => dispatch => {
  axios
    .post('/api/jobs', jobData)
    .then(res =>
      dispatch({
        type: ADD_JOB,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Get Jobs
export const getJobs = () => dispatch => {
  dispatch(setJobLoading());
  axios
    .get('/api/jobs')
    .then(res =>
      dispatch({
        type: GET_JOBS,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_JOBS,
        payload: null
      })
    );
};

// Get Job
export const getJob = (id) => dispatch => {
  dispatch(setJobLoading());
  axios
    .get(`/api/jobs/${id}`)
    .then(res =>
      dispatch({
        type: GET_JOB,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_JOB,
        payload: null
      })
    );
};
// Delete Job
export const deleteJob = id => dispatch => {
  axios
    .delete(`/api/jobs/${id}`)
    .then(res =>
      dispatch({
        type: DELETE_JOB,
        payload: id
      })
    )
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Set loading state
export const setJobLoading = () => {
  return {
    type: JOB_LOADING
  }
}
