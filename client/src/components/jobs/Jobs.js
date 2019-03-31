import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import Spinner from '../common/Spinner';
import JobForm from './JobForm';
import JobFeed from './JobFeed';
import {getJobs} from '../../actions/jobActions';

class Jobs extends Component {
  componentDidMount() {
    this.props.getJobs();
  }
  render () {
    const {jobs, loading} = this.props.job;
    let jobContent;

    if(jobs === null || loading) {
      jobContent = <Spinner />
    } else {
      jobContent = <JobFeed jobs={jobs}/>
    }

    return (
      <div className="jobs">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              
              {jobContent}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Jobs.propTypes = {
  getJobs: PropTypes.func.isRequired,
  job: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  job: state.job
});

export default connect(mapStateToProps, {getJobs})(Jobs);
