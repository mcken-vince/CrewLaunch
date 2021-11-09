import { Form, InputGroup, Button, Alert, Spinner } from "react-bootstrap";
import '../../styles/LoginForm.scss';
import axios from 'axios';
import { FormEventHandler, useState } from "react";
import { Link } from "react-router-dom";

const LoginForm = () => {
  const blankUser = {email: '', password: ''};
  const [user, setUser] = useState(blankUser);
  const [alert, setAlert] = useState<any>({error: false, success: false, message: ''});
  const [loading, setLoading] = useState(false);

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault();
    setLoading(true);
    setAlert({success: false, error: false, message: ''});
    try {
      const response = await axios.post('/users/login', user);
      setAlert({error: false, success: true});
      return response;
    } catch (err: any) {
      const errorsArray = err.response ? Object.values(err.response.data) : ['An unknown error occurred'];
      setAlert({error: true, success: false, message: errorsArray})
      return err;
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='login-form-container'>
      <h2>Login:</h2>
      {alert.error && 
        <Alert variant='danger'>
          <Alert.Heading>Error</Alert.Heading>
          {alert.message.join(', ')}
          <br/> Not registered? <Link to='/register'>Register here.</Link>
        </Alert>}
      {alert.success &&
        <Alert variant='success'>
          <Alert.Heading>Success!</Alert.Heading>
        </Alert>}
      <Form className='login-form' onSubmit={handleSubmit}>
        <InputGroup>
          <InputGroup.Text>Email:</InputGroup.Text>
          <Form.Control value={user.email} onChange={(e) => setUser(prev => ({...prev, email: e.target.value}))} name='email' type='email' placeholder='Enter email'/>
        </InputGroup>
        <InputGroup>
          <InputGroup.Text>Password:</InputGroup.Text>
          <Form.Control value={user.password} onChange={(e) => setUser(prev => ({...prev, password: e.target.value}))} name='password' type='password' placeholder='Enter password'/>
        </InputGroup>
        <Button type='submit'>{loading ? <Spinner animation='border' /> : 'Login'}</Button>
      </Form>
    </div>
  );
};

export default LoginForm;