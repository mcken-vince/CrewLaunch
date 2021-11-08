import { Form, InputGroup, Button } from "react-bootstrap";
import '../../styles/LoginForm.scss';
import axios from 'axios';
import { FormEventHandler, useState } from "react";

const LoginForm = () => {
  const blankUser = {email: '', password: ''};
  const [user, setUser] = useState(blankUser);

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault();
    try {
      console.log('user in handleSubmit: ', user);
      const response = await axios.post('/users/login', user);
      return response;
    } catch (err) {
      return err;
    }
  };

  return (
    <div className='login-form-container'>
      <h2>Login:</h2>
      <Form className='login-form' onSubmit={handleSubmit}>
        <InputGroup>
          <InputGroup.Text>Email:</InputGroup.Text>
          <Form.Control value={user.email} onChange={(e) => setUser(prev => ({...prev, email: e.target.value}))} name='email' type='email' placeholder='Enter email'/>
        </InputGroup>
        <InputGroup>
          <InputGroup.Text>Password:</InputGroup.Text>
          <Form.Control value={user.password} onChange={(e) => setUser(prev => ({...prev, password: e.target.value}))} name='password' type='password' placeholder='Enter password'/>
        </InputGroup>
        <Button type='submit'>Login</Button>
      </Form>
    </div>
  );
};

export default LoginForm;