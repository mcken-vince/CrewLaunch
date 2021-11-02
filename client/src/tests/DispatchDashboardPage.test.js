import { screen, render } from '@testing-library/react';
import DispatchDashboardPage from "../components/pages/DispatchDashboardPage";
import { BrowserRouter as Router } from 'react-router-dom';
import { sampleState } from './sampleData';

describe('DispatchDashboardPage component', () => {
  it('renders navbar', async () => {
    render(
      <Router basename={'/'}>
        <DispatchDashboardPage state={sampleState} />
      </Router>
    );

    expect(screen.getByText(/CrewLauncher/)).toBeInTheDocument();
    expect(screen.getByText(/Resources/)).toBeInTheDocument();
    expect(screen.getByText(/Forms/)).toBeInTheDocument();
    expect(screen.getByText(/Log Out/)).toBeInTheDocument();
    
  });
});