import Validator from 'validator';
import ifEmpty from './checkForEmpty';

interface registrationErrors {
  email?: string;
  password1?: string;
  password2?: string;
  user?: string;
};

const checkRegistrationFields = (data: any) => {
  // An errors object is created
  let errors: registrationErrors = {};

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
    errors.password1 = "Passwords must be at least 8 characters";
  }

  return {
    errors,
    isValid: ifEmpty(errors)
  };
};

export default checkRegistrationFields;