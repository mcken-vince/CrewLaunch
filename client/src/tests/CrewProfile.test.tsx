import { fireEvent, render, screen } from "@testing-library/react";
import CrewProfile, { CrewProfileProps } from "../components/CrewProfile";
import { sampleState } from "./sampleData";

const crew = sampleState.crews[0];
const editCrew = jest.fn();

const renderCrewProfile = (props: Partial<CrewProfileProps> = {}) => {
  const defaultProps = {
    crew,
    editCrew
  };

  return render(
    <CrewProfile {...defaultProps} {...props} />
  );
};

describe('<CrewProfile/>', () => {
  it('renders without crashing and crew details can be modified', async () => {
    renderCrewProfile();
    screen.getByTestId('edit-profile-button').click();
    expect(await screen.findByText(/Cancel/)).toBeInTheDocument();
    // Profile is in edit mode
    fireEvent.change(screen.getByDisplayValue(crew.foreman_name), {target: {value: 'New Name'}});
    crew.avatar && fireEvent.change(screen.getByDisplayValue(crew.avatar), {target: {value: 'invalid avatar url'}});
    fireEvent.change(screen.getByDisplayValue(crew.crew_size), {target: {value: 5}});
    fireEvent.click(screen.getByRole('checkbox'));
    fireEvent.click(screen.getByText(/Save/));
    
    expect(await screen.findByText(/Edit/)).toBeInTheDocument();
    expect(editCrew).toHaveBeenCalled();
  });
});