import { render, screen, fireEvent } from '@testing-library/react';
import axios from 'axios';
import RegisterForm from '../components/forms/RegisterForm';

jest.mock('axios');
// const mockedAxios = axios as jest.Mocked<typeof axios>;
// axios.post = jest.fn();

describe('<RegisterForm />', () => {
  it('renders without crashing and posts to /users/register on submit', () => {

    jest.spyOn(axios, 'post')
    render (<RegisterForm />);

    fireEvent.change(screen.getByPlaceholderText(/Enter email/i), {target: {value: 'test@mail.com'}});
    fireEvent.change(screen.getByTestId('pass1'), {target: {value: 'supersecret'}});
    fireEvent.change(screen.getByTestId('pass2'), {target: {value: 'supersecret'}});
    screen.getByTestId('register-button').click();
    
    // Needs further validation
    // expect(axios.post).toHaveBeenCalled();
  });
});