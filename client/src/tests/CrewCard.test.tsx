import { render, screen } from "@testing-library/react";
import CrewCard, { CrewCardProps} from "../components/CrewCard";
import { sampleState } from './sampleData'

const crew = { "_id": "616f7ceea703ecd4ec419645", "foreman_name": "Heddy Ready", "crew_size": 4, "is_active": true, "avatar": "https://getavataaars.com/?accessoriesType=Prescription02&avatarStyle=Transparent&clotheColor=PastelRed&clotheType=ShirtCrewNeck&eyeType=Squint&eyebrowType=FlatNatural&facialHairColor=BrownDark&facialHairType=BeardMajestic&graphicType=Resist&hairColor=PastelPink&mouthType=Smile&skinColor=Tanned&topType=WinterHat2", "createdAt": "2021-10-20T02:20:30.796Z", "updatedAt": "2021-10-20T02:20:30.796Z" };
const onDelete = jest.fn(()=> 'deleted');

const renderCrewCard = (props: Partial<CrewCardProps> = {}) => {
  const defaultProps = {
    crew,
    jobs: [],
    onDelete
  };
  return render(
      <CrewCard {...defaultProps} {...props}/>
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