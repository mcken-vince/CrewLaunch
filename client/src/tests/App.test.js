import { screen, render } from '@testing-library/react';
import axios from 'axios';
import { getCrews, getClients, getPackages, getContracts, getJobs } from './sampleData';
import App from '../App';

jest.mock('axios');

describe('App', () => {
  it('fetches data from the database', async() => {
    axios.get
    .mockImplementationOnce(() => Promise.resolve(getCrews))
    .mockImplementationOnce(() => Promise.resolve(getClients))
    .mockImplementationOnce(() => Promise.resolve(getPackages))
    .mockImplementationOnce(() => Promise.resolve(getContracts))
    .mockImplementationOnce(() => Promise.resolve(getJobs));

    render(<App />);
    expect(screen.getByText(/Crew Launcher/)).toBeInTheDocument();
    expect(await screen.findByText(/616f7ceea703ecd4ec419645/)).not.toBe(null);

  });
  
});