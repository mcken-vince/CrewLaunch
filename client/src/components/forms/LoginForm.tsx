import { Form, InputGroup, Button, Alert, Spinner } from "react-bootstrap";
import '../../styles/LoginForm.scss';
import axios from 'axios';
import { FormEventHandler, useState } from "react";
import { Link, useHistory } from "react-router-dom";

const LoginForm = (props: any) => {
  const onLogin = props.onLogin;
  const blankUser = {email: '', password: '', privileges: ''};
  const [user, setUser] = useState(blankUser);
  const [alert, setAlert] = useState<any>({error: false, success: false, message: '', admin: false});
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault();
    setLoading(true);
    setAlert({success: false, error: false, message: '', admin: false});
    try {
      const response: any = await axios.post('/users/login', user);
      setAlert({error: false, success: true, admin: response.data.admin});
      onLogin(user.email, response.data.admin);
      setTimeout(() => {
        history.push('/dispatch');
      }, 1500);
      return response;
      
    } catch (err: any) {
      const errorsArray = err.response ? err.response.data : ['An unknown error occurred'];
      setAlert({error: true, success: false, message: errorsArray, privileges: ''})
      return err;
    } finally {
      setLoading(false);
    }
  };

  const fieldsFilled: boolean = (user.email && user.password && user.email.includes('@') && user.password.length >= 8) ? true : false;

  return (
    <div className='login-form-container'>
      {alert.error && 
        <Alert variant='danger'>
          <Alert.Heading>Error</Alert.Heading>
          {typeof alert.message === 'string' ? alert.message : alert.message.join(', ')}
          <br/> Not registered? <Link to='/register'>Register here.</Link>
        </Alert>}
      {alert.success &&
        <Alert variant='success'>
          <Alert.Heading>Success!</Alert.Heading>
          Logged in as a{alert.admin ? 'n admin' : ' guest'}
          <br/> Redirecting to home page...
          <br/><Spinner animation='border'/>
        </Alert>}
      <h2>Login:</h2>
      <Form className='login-form' onSubmit={handleSubmit}>
        <InputGroup>
          <InputGroup.Text>Email:</InputGroup.Text>
          <Form.Control className='login-form-email' value={user.email} onChange={(e) => setUser(prev => ({...prev, email: e.target.value}))} name='email' type='email' placeholder='Enter email'/>
        </InputGroup>
        <InputGroup>
          <InputGroup.Text>Password:</InputGroup.Text>
          <Form.Control className='login-form-password' value={user.password} onChange={(e) => setUser(prev => ({...prev, password: e.target.value}))} name='password' type='password' placeholder='Enter password'/>
        </InputGroup>
        <Button className='login-form-submit form-submit' disabled={!fieldsFilled} type='submit'>{loading ? <Spinner animation='border' /> : 'Login'}</Button>
      </Form>
    </div>
  );
};

export default LoginForm;