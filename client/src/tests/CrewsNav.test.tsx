import { screen, render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import CrewsNav, { CrewsNavProps } from '../components/CrewsNav';
import { sampleState } from './sampleData';
const onLogout = jest.fn();

const renderCrewsNav = (props: Partial<CrewsNavProps> = {}) => {
  const defaultProps = {
    user: { email: 'user@test.com', name: 'Testy Testerson', admin: false },
    onLogout,
    crew: null
  };

  return render (
    <BrowserRouter>
      <CrewsNav {...defaultProps} {...props} />
    </BrowserRouter>
  );
};

describe('<CrewsNav />', () => {
  it("renders without crashing, and doesn't show links if no crew is given", () => {
    renderCrewsNav();
    expect(screen.queryByText(/My Jobs/)).not.toBeInTheDocument();
    expect(screen.queryByText(/Dashboard/)).not.toBeInTheDocument();
  });

  it("displays links if a crew is given", () => {
    renderCrewsNav({crew: sampleState.crews[0]});
    expect(screen.getByText(/My Jobs/)).toBeInTheDocument();
    expect(screen.getByText(/Dashboard/)).toBeInTheDocument();
  });

  it("calls onLogout when logout button is clicked", () => {
    renderCrewsNav();
    screen.getByText(/Log Out/).click();
    expect(onLogout).toHaveBeenCalled();
  });
});