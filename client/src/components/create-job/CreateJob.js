import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import TextFieldGroup from '../common/TextFieldGroup';
import TextAreaFieldGroup from '../common/TextAreaFieldGroup';
import {addJob} from '../../actions/jobActions';


class JobForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      companyName: '',
      requirements: '',
      aboutCompany: '',
      errors: {}
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentWillReceiveProps(newProps) {
    if(newProps.errors) {
      this.setState({errors: newProps.errors});
    }

  }

  onSubmit(e) {
    e.preventDefault();
    const {user} = this.props.auth;

    const newJob = {
      title: this.state.title,
      companyName: this.state.companyName,
      requirements: this.state.requirements,
      aboutCompany: this.state.aboutCompany,
      name: user.name,
      avatar: user.avatar
    };

    this.props.addJob(newJob);
    this.setState({
      title: '',
      companyName: '',
      requirements: '',
      aboutCompany: '',
    });
  }

   onChange(e) {
     this.setState({[e.target.name]: e.target.value});
   }

  render() {
    const { errors } = this.state;
    return (
      <div className="create-job">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center"> Create Job </h1>
              <form onSubmit={this.onSubmit}>
              <TextFieldGroup
                placeholder="* Job Title"
                name="title"
                value={this.state.title}
                onChange={this.onChange}
                error={errors.title}
                info="Job Title"
              />
              <TextFieldGroup
                placeholder="Company"
                name="companyName"
                value={this.state.companyName}
                onChange={this.onChange}
                error={errors.companyName}
                info="Could be your own company or one you work for"
              />

              <TextFieldGroup
                placeholder="* Requirements"
                name="requirements"
                value={this.state.requirements}
                onChange={this.onChange}
                error={errors.requirements}
                info="Please use comma separated values (eg.
                  HTML,CSS,JavaScript,PHP"
              />

              <TextAreaFieldGroup
                placeholder="About company"
                name="aboutCompany"
                value={this.state.aboutCompany}
                onChange={this.onChange}
                error={errors.aboutCompany}
                info="Tell us about your company"
              />
              <input type="submit" value="Submit" className="btn btn-info btn-block mt-4"/>
              </form>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

JobForm.propTypes = {
  addJob: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  //job: state.job,
  auth: state.auth,
  errors: state.errors
});

export default connect(mapStateToProps, {addJob})(JobForm);
