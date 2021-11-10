import { screen, render } from '@testing-library/react';
import DispatchDashboardPage from "../components/pages/DispatchDashboardPage";
import { BrowserRouter as Router } from 'react-router-dom';
import { sampleState } from './sampleData';

const testUser = {email: 'test@email.com', admin: false};

describe('DispatchDashboardPage component', () => {
  it('renders without crashing', async () => {
    render(
       <Router basename={'/'}>
        <DispatchDashboardPage user={testUser} state={sampleState} />
      </Router>
    );

  });
});