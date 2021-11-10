import { screen, render } from '@testing-library/react';
import axios from 'axios';
import { getCrews, getClients, getPackages, getContracts, getJobs } from './sampleData';
import App from '../App';
import userEvent from '@testing-library/user-event';

jest.mock('axios');

describe('App', () => {
  it('fetches data from the database', async() => {
    axios.get
    .mockImplementationOnce(() => Promise.resolve(getCrews))
    .mockImplementationOnce(() => Promise.resolve(getClients))
    .mockImplementationOnce(() => Promise.resolve(getPackages))
    .mockImplementationOnce(() => Promise.resolve(getContracts))
    .mockImplementationOnce(() => Promise.resolve(getJobs))
    
    
    render(<App />);
    expect(screen.getByText(/Crew Launcher/)).toBeInTheDocument();
    expect(screen.getByText(/Log In/)).toBeInTheDocument();
    expect(screen.getByText(/Sign Up/)).toBeInTheDocument();
    userEvent.click(screen.getByText('Log In'));
    expect(screen.getByText(/Login:/)).toBeInTheDocument();
  });
  
});