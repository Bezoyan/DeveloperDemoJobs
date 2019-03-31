import axios from 'axios';

// Axios default

const setAuthToken = token => {
  if(token) {

    // Apply to every request
    axios.defaults.headers.common['Authorization'] = token;
  } else {
    // Delete Auth header
    delete axios.defaults.headers.common['Authorization'];
  }
}

export default setAuthToken;
