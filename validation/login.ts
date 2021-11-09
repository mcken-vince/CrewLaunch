import Validator from "validator";
import ifEmpty from "./checkForEmpty";

interface loginErrors {
  email?: string;
  password?: string;
  user?: string;
}

const validateLoginInput = (data: any) => {
  let errors: loginErrors = {};

  data.email = !ifEmpty(data.email) ? data.email : "";
  data.password = !ifEmpty(data.password) ? data.password : "";

  if (!Validator.isEmail(data.email)) {
    errors.email = "Invalid email";
  }

  if (Validator.isEmpty(data.email)) {
    errors.email = "Email is required";
  }

  if (Validator.isEmpty(data.password)) {
    errors.password = "Password is required";
  }

  return {
    errors,
    isValid: ifEmpty(errors)
  };
};

export default validateLoginInput;