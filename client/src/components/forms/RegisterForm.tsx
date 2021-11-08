import { Form, InputGroup, Button, Alert } from "react-bootstrap";
import '../../styles/RegisterForm.scss';
import axios from 'axios';
import { FormEventHandler, useState } from "react";
import { Redirect } from "react-router-dom";


const RegisterForm = () => {

  const blankUser = {email: '', password1: '', password2: ''};
  const [user, setUser] = useState(blankUser);
  const [errors, setErrors] = useState<any>(null);

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault();
    setErrors({});
    try {
      await axios.post('/users/register', user);
      <Redirect to='/login' />
    } catch (err) {
      // const errorsArray = (err && err.response) ? Object.values(err.response.data) : ['An unknown error occurred'];
      setErrors(err);
      return err;
    }
  };

  let errorList;
  if (errors) {
    errorList = errors.response && Object.values(errors.response.data).join('\n');
    // .map((e, idx) => {
    //   if (typeof e === 'string') {
    //     return <p key={idx}>{e}</p>;
    //   }
    // });
  }

  return (
    <div className='register-form-container'>
      <h2>Register:</h2>

      {errors && errors.response && <Alert variant='danger'>{errorList}</Alert>}
      <Form className='register-form' onSubmit={handleSubmit}>
        <InputGroup>
          <InputGroup.Text>Email:</InputGroup.Text>
          <Form.Control value={user.email} onChange={(e) => setUser(prev => ({...prev, email: e.target.value}))} name='email' type='email' placeholder='Enter email'/>
        </InputGroup>
        <InputGroup>
          <InputGroup.Text>Password:</InputGroup.Text>
          <Form.Control value={user.password1} onChange={(e) => setUser(prev => ({...prev, password1: e.target.value}))} name='password1' type='password' placeholder='Enter password'/>
        </InputGroup>
        <InputGroup>
          <InputGroup.Text>Confirm Password:</InputGroup.Text>
          <Form.Control value={user.password2} onChange={(e) => setUser(prev => ({...prev, password2: e.target.value}))} name='password2' type='password' placeholder='Enter password again'/>
        </InputGroup>
        <Button type='submit'>Login</Button>
      </Form>
    </div>
  );
};

export default RegisterForm;