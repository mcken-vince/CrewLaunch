import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import CrewCard, { CrewCardProps} from "../components/CrewCard";
import { sampleState } from './sampleData'

const onDelete = jest.fn(()=> 'deleted');

const renderCrewCard = (props: Partial<CrewCardProps> = {}) => {
  const defaultProps = {
    crew: sampleState.crews[0],
    jobs: [],
    onDelete
  };
  return render(
    <BrowserRouter>
      <CrewCard {...defaultProps} {...props}/>
    </BrowserRouter>
  );
};

describe('<CrewCard />', () => {
  beforeEach(() => {
    renderCrewCard();
  });
  it('renders without crashing and displays crew information', () => {
    expect(screen.getByText('Heddy Ready')).toBeInTheDocument();
    expect(screen.getByText(/4/)).toBeInTheDocument();
    expect(screen.getByText('Active')).toBeInTheDocument();
    expect(screen.getByAltText('foreman avatar')).toBeInTheDocument();
  });

  it('calls onDelete correctly', async () => {
    screen.getByText('Delete').click();
    (await screen.findByText('Confirm')).click();
    expect(onDelete).toHaveBeenCalled();
  });
});