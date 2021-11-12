import { render } from '@testing-library/react';
import DispatchDashboardPage, { DispatchDashboardPageProps } from "../components/pages/DispatchDashboardPage";
import { BrowserRouter as Router } from 'react-router-dom';

const testUser: {email: string, admin: boolean, password: string, name: string} = {email: 'test@email.com', admin: false, password: 'shouldntbehere', name: "Testy Testerson"};

function renderDispatchDashboardPage(props: Partial<DispatchDashboardPageProps> = {}) {
  const defaultProps: DispatchDashboardPageProps = {
    user: testUser,
    onLogout: () => {},
  };
  return render(
    <Router basename={'/'}>
      <DispatchDashboardPage {...defaultProps}  />
    </Router>
  );
};


describe('<DispatchDashboardPage />', () => {
  it('renders without crashing', () => {
    renderDispatchDashboardPage();
  });
});