import { Form, InputGroup, Button, Alert, Spinner } from "react-bootstrap";
import '../../styles/RegisterForm.scss';
import axios from 'axios';
import { FormEventHandler, useState } from "react";
import { Link } from "react-router-dom";

const RegisterForm = () => {
  const blankUser = {email: '', password1: '', password2: ''};
  const [user, setUser] = useState(blankUser);
  const [alert, setAlert] = useState<any>({error: false, success: false, message: ''});
  const [loading, setLoading] = useState(false);

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault();
    setAlert({error: false, success: false});
    setLoading(true);
    try {
      await axios.post('/users/register', user);
      setAlert({error: false, success: true});
    } catch (err: any) {
      const errorsArray = err.response ? Object.values(err.response.data) : ['An unknown error occurred'];
      setAlert({error: true, success: false, message: errorsArray});
      return err;
    } finally {
      setLoading(false);
    }
  };

  const matchingPasswords = user.password1.length >= 8 && user.password1 === user.password2;


  return (
    <div className='register-form-container'>
      <h2>Register:</h2>
      {alert.error && 
        <Alert variant='danger'>
          <Alert.Heading>There has been an error</Alert.Heading>
          {typeof alert.message === 'string' ? alert.message : alert.message.join(', ')}
        </Alert>}
      {alert.success &&
        <Alert variant='success'>
          <Alert.Heading>Success!</Alert.Heading>
          Registration successful! <Link to='/login'>Proceed to Login page</Link>
        </Alert>}
      <Form className='register-form' onSubmit={handleSubmit}>
        <InputGroup>
          <InputGroup.Text>Email:</InputGroup.Text>
          <Form.Control className='register-form-email' value={user.email} onChange={(e) => setUser(prev => ({...prev, email: e.target.value}))} name='email' type='email' placeholder='Enter email'/>
        </InputGroup>
        <InputGroup>
          <InputGroup.Text>Password:</InputGroup.Text>
          <Form.Control className='register-form-password1' value={user.password1} onChange={(e) => setUser(prev => ({...prev, password1: e.target.value}))} name='password1' type='password' placeholder='Enter password'/>
        </InputGroup>
        <InputGroup>
          <InputGroup.Text>Confirm Password:</InputGroup.Text>
          <Form.Control className='register-form-password2' value={user.password2} onChange={(e) => setUser(prev => ({...prev, password2: e.target.value}))} name='password2' type='password' placeholder='Enter password again'/>
        </InputGroup>
        <Button className='register-form-submit form-submit' disabled={user.email.length <= 0 || !matchingPasswords} type='submit'>{loading ? <Spinner animation='border' /> : 'Register'}</Button>
      </Form>
    </div>
  );
};

export default RegisterForm;