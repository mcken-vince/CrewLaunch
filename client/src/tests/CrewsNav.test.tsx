import { screen, render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import CrewsNav, { CrewsNavProps } from '../components/CrewsNav';

const onLogout = jest.fn();
const crew = { "_id": "616f7ceea703ecd4ec419645", "foreman_name": "Heddy Ready", "crew_size": 4, "is_active": true, "avatar": "https://getavataaars.com/?accessoriesType=Prescription02&avatarStyle=Transparent&clotheColor=PastelRed&clotheType=ShirtCrewNeck&eyeType=Squint&eyebrowType=FlatNatural&facialHairColor=BrownDark&facialHairType=BeardMajestic&graphicType=Resist&hairColor=PastelPink&mouthType=Smile&skinColor=Tanned&topType=WinterHat2", "createdAt": "2021-10-20T02:20:30.796Z", "updatedAt": "2021-10-20T02:20:30.796Z" };

const renderCrewsNav = (props: Partial<CrewsNavProps> = {}) => {
  const defaultProps = {
    user: {email: 'user@test.com', name: 'Testy Testerson', password: 'secretness'},
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
    renderCrewsNav({crew});
    expect(screen.getByText(/My Jobs/)).toBeInTheDocument();
    expect(screen.getByText(/Dashboard/)).toBeInTheDocument();
  });

  it("calls onLogout when logout button is clicked", () => {
    renderCrewsNav();
    screen.getByText(/Log Out/).click();
    expect(onLogout).toHaveBeenCalled();
  });
});