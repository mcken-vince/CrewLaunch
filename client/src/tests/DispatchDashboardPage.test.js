import { screen, render } from '@testing-library/react';
import DispatchDashboardPage from "../components/pages/DispatchDashboardPage";
import { BrowserRouter as Router } from 'react-router-dom';
import { sampleState } from './sampleData';

const testUser = {email: 'test@email.com', admin: false};

describe('DispatchDashboardPage component', () => {
  it('renders without crashing', () => {
    render(
       <Router basename={'/'}>
        <DispatchDashboardPage user={testUser} state={sampleState} />
      </Router>
    );
    expect(screen.getByText(/test@email.com/)).toBeInTheDocument();
    expect(screen.getByText(/CrewLauncher/)).toBeInTheDocument();
    expect(screen.getByText(/Resources/)).toBeInTheDocument();
    expect(screen.getByText(/Forms/)).toBeInTheDocument();
    expect(screen.getByText(/Log Out/)).toBeInTheDocument();
  });
});