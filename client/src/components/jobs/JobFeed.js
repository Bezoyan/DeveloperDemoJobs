import React,  {Component} from 'react';
import PropTypes from 'prop-types';
import JobItem from './JobItem';

class JobFeed extends Component {
  render() {
    const {jobs} = this.props;
    return jobs.map(job => <JobItem key={job._id} job={job} />);
  }

}

JobFeed.propTypes = {
  jobs: PropTypes. array.isRequired //object?
}

export default JobFeed;
