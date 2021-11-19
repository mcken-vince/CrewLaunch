import { render, screen } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import DispatchNav, { DispatchNavProps } from "../components/DispatchNav";

const testUser: {email: string, admin: boolean, password: string, name: string} = {email: 'test@email.com', admin: false, password: 'shouldntbehere', name: "Testy Testerson"};
const onLogout = jest.fn();

const renderDispatchNav = (props: Partial<DispatchNavProps> = {}) => {
  const defaultProps = {
    onLogout,
    user: testUser
  };
  return render(
    <Router>
      <DispatchNav {...defaultProps} {...props}/>
    </Router>
  );
};

describe('DispatchNav component', () => {
  it('contains login and signup buttons if user is not signed in', () => {
    renderDispatchNav({user: undefined});
    expect(screen.getByTestId('login-button')).toBeInTheDocument();
    expect(screen.getByTestId('signup-button')).toBeInTheDocument();
    expect(screen.queryByTestId('logout-button')).not.toBeInTheDocument();
  });

  it('displays user email and logout button if user is signed in', async () => {
    renderDispatchNav();
    expect(await screen.findByText(/test@email.com/)).toBeInTheDocument();
    expect(screen.getByTestId('logout-button')).toBeInTheDocument();
    expect(screen.queryByTestId('login-button')).not.toBeInTheDocument();
    expect(screen.queryByTestId('signup-button')).not.toBeInTheDocument();
  });

  it("calls onLogout when logout button is clicked", () => {
    renderDispatchNav();
    screen.getByText(/Log Out/).click();
    expect(onLogout).toHaveBeenCalled();
  });
});