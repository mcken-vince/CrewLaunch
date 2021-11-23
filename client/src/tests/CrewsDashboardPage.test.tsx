import {render } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import CrewsDashboardPage, { CrewsDashboardPageProps } from '../components/pages/CrewsDashboardPage';


const onLogout = jest.fn();
const user = {email: 'renaldo@test.com', admin: false};

const renderCrewsDashboardPage = (props: Partial<CrewsDashboardPageProps> = {}) => {
  const defaultProps = {
    onLogout,
    user
  };
  return render (
    <Router>
      <CrewsDashboardPage {...defaultProps} {...props} />
    </Router>
  );
};

describe('<CrewsDashboardPage />', () => {
  it('renders without crashing', () => {
    renderCrewsDashboardPage();
  });
});
