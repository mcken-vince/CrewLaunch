const Validator = require('validator');
const ifEmpty = require('./checkForEmpty');

module.exports = function checkRegistrationFields(data) {
  // An errors object is created
  let errors = {};

  data.email = !ifEmpty(data.email) ? data.email : "";
  data.password1 = !ifEmpty(data.password1) ? data.password1 : "";
  data.password2 = !ifEmpty(data.password2) ? data.password2 : "";

  if (Validator.isEmpty(data.email)) {
    errors.email = "Email is required";
  }
  if (!Validator.isEmail(data.email)) {
    errors.email = "Email address is invalid";
  }
  if (Validator.isEmpty(data.password1)) {
    errors.password1 = "Password is required";
  }
  if (!Validator.isLength(data.password1, { min: 8, max: 120 })) {
    errors.password1 = "Passwords must be greater than 8 characters";
  }

  return {
    errors,
    isValid: ifEmpty(errors)
  };
};