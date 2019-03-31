const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateJobInput(data) {
  let errors = {};

  data.title = !isEmpty(data.title) ? data.title : '';
  data.companyName = !isEmpty(data.companyName) ? data.companyName : '';
  data.requirements = !isEmpty(data.requirements) ? data.requirements : '';

  if(!Validator.isLength(data.title, {min: 2, max: 50})) {
    errors.title = 'Title must be between 2 and 50 characters';
  }

  if(Validator.isEmpty(data.title)) {
    errors.title = 'Title field is required';
  }

  if(Validator.isEmpty(data.companyName)) {
    errors.companyName = 'companyName is required';
  }

  if(Validator.isEmpty(data.requirements)) {
    errors.requirements = 'requirement is required';
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
