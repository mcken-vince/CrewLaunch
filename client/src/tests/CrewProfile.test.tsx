import { render, screen } from "@testing-library/react";
import CrewProfile, { CrewProfileProps } from "../components/CrewProfile";
import { sampleState } from "./sampleData";

const renderCrewProfile = (props: Partial<CrewProfileProps> = {}) => {
  const defaultProps = {
    crew: sampleState.crews[0],
    editCrew: jest.fn()
  };

  return render(
    <CrewProfile {...defaultProps} {...props} />
  );
};

describe('<CrewProfile/>', () => {
  it('renders without crashing, and displays cancel button when edit button is clicked', async () => {
    renderCrewProfile();
    screen.getByTestId('edit-profile-button').click();
    expect(await screen.findByText(/Cancel/)).toBeInTheDocument();
  });
});