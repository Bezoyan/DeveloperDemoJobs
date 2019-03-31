import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import Spinner from '../common/Spinner';
//import JobItem from '../jobs/JobItem';
import {Link} from 'react-router-dom';
import {getJob} from '../../actions/jobActions';

class Job extends Component {
  componentDidMount() {
    this.props.getJob(this.props.match.params.id);
  }
  render() {
  const {job, loading} = this.props;
  let jobContent;

  if(job === null || loading || Object.keys(job).length === 0) {
    jobContent = <Spinner />
  } else {
    jobContent = (
      <div>
      </div>
    )
  }
    return (
      <div className="job">
        <div className="row">
          <div className="col-md-6">
          <Link to="/jobs" className=" btn btn-light mb-3"> Back to Jobs </Link>
            <h4> Job Title </h4> <hr/>
            <h4> {job.title} </h4> <hr/>
            <br/>
            <h4> Company </h4> <hr/>
            <h4> {job.companyName} </h4> <hr/>
            <br/>
            <h4> Requirements </h4> <hr/>
            <h4> {job.requirements} </h4> <hr/>
            <br/>
            {jobContent}
          </div>
        </div>
      </div>
    );
  }
}

Job.propTypes = {
  getJob: PropTypes.func.isRequired,
  job: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  job: state.job
});

export default connect(mapStateToProps, {getJob})(Job);
