import { Form, InputGroup, Button, Alert, Spinner } from "react-bootstrap";
import '../../styles/RegisterForm.scss';
import axios from 'axios';
import { FormEventHandler, useState } from "react";
import { Redirect } from "react-router-dom";


const RegisterForm = () => {

  const blankUser = {email: '', password1: '', password2: ''};
  const [user, setUser] = useState(blankUser);
  const [alert, setAlert] = useState<any>({errors: false, success: false, message: ''});
  const [loading, setLoading] = useState(false);

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault();
    setAlert({errors: false, success: false});
    setLoading(true);
    try {
      await axios.post('/users/register', user);
      setAlert({errors: false, success: true});
      <Redirect to='/login' />
    } catch (err: any) {
      const errorsArray = err.response ? Object.values(err.response.data) : ['An unknown error occurred'];
      setAlert({errors: true, success: false, message: errorsArray});
      return err;
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='register-form-container'>
      <h2>Register:</h2>
      {alert.errors && 
        <Alert variant='danger'>
          <Alert.Heading>There has been an error</Alert.Heading>
          {alert.message}
        </Alert>}
      {alert.success &&
        <Alert variant='success'>
          <Alert.Heading>Success!</Alert.Heading>
        </Alert>}
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
        <Button type='submit'>{loading ? <Spinner animation='border' /> : 'Register'}</Button>
      </Form>
    </div>
  );
};

export default RegisterForm;