import { render, screen } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import DispatchNav from "../components/DispatchNav";

const testUser = { email: 'test@user.com', adimin: false };

describe('DispatchNav component', () => {
  it('contains login and signup buttons if user is not signed in', () => {
    render(
      <Router>
        <DispatchNav />
        </Router>
    );
    expect(screen.getByTestId('login-button')).toBeInTheDocument();
    expect(screen.getByTestId('signup-button')).toBeInTheDocument();
    expect(screen.queryByTestId('logout-button')).not.toBeInTheDocument();
  });

  it('displays user email and logout button if user is signed in', () => {
    render(
      <Router>
        <DispatchNav user={testUser}/>
      </Router>
    );
    expect(screen.getByText(/test@user.com/)).toBeInTheDocument();
    expect(screen.getByTestId('logout-button')).toBeInTheDocument();
    expect(screen.queryByTestId('login-button')).not.toBeInTheDocument();
    expect(screen.queryByTestId('signup-button')).not.toBeInTheDocument();
  });

});