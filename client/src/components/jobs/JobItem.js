import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import {Link} from 'react-router-dom';
import {deleteJob} from '../../actions/jobActions';


class JobItem extends Component {
  onDeleteClick(id) {
    this.props.deleteJob(id);
  }
  render() {
    const {job, auth} = this.props;
    const handle = job.name.trim().split(' ')[0];

    const requirements = job.requirements.map((requirement, index) => (
      <div key={index} className="p-3">
        <i className="fa fa-check"/>
        {requirement}
      </div>
    ));
    return(
      <div className="jobs">
            <div className="col-md-12">
            <div className="row">
              <div className="col-2">
                <img src={job.avatar} alt="" className="rounded-circle"/>
                <h5 className="text-center"><Link to={`/profile/${handle}`}>{job.name}</Link></h5>
              </div>
              <div className="col-md-6 col-md-4 col-8">
                  <h4> Suggested Job </h4> <hr/>
                  <h4> {job.title} </h4> <hr/>
                  <br/>

              <div className="col-lg-6">
                <Link to={`/jobs/${job.title}`}></Link>
                <Link to={`/job/${job._id}`}className="btn btn-info"> View Job </Link>
                {job.user === auth.user.id ? (
                  <button
                    onClick={this.onDeleteClick.bind(this, job._id)}
                    type="button"
                    className="btn btn-danger mr-1"
                  >
                  <i className="fas fa-times"/>
                  </button>
                ) : null}
                </div>
                </div>
              </div>
            </div>

          </div>


    )
  }
}

JobItem.propTypes = {
  deleteJob: PropTypes.func.isRequired,
  job: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
  auth: state.auth
});

export default connect(mapStateToProps, {deleteJob})(JobItem);
