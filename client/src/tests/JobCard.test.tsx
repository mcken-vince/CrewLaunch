import { act, render, screen } from '@testing-library/react';
import JobCard, { JobCardProps } from '../components/JobCard';
import { formatDate } from '../helpers/dataFormatters';

const job = { "_id": "61787d4cefa37244e2c35c14", "contract_id": "61787c58efa37244e2c35c13", "date": new Date("2021-10-28T06:00:00.000Z"), "completed": false, address: "177 Mornersome Drive SW, Calgary AB", job_notes: "There are no notes. Nothing to see here." };
const crews = [{ "_id": "616f7ceea703ecd4ec419645", "foreman_name": "Heddy Ready", "crew_size": 4, "is_active": true, "avatar": "https://getavataaars.com/?accessoriesType=Prescription02&avatarStyle=Transparent&clotheColor=PastelRed&clotheType=ShirtCrewNeck&eyeType=Squint&eyebrowType=FlatNatural&facialHairColor=BrownDark&facialHairType=BeardMajestic&graphicType=Resist&hairColor=PastelPink&mouthType=Smile&skinColor=Tanned&topType=WinterHat2", "createdAt": "2021-10-20T02:20:30.796Z", "updatedAt": "2021-10-20T02:20:30.796Z" }];
const formattedDate: string[] = formatDate(job.date).split(' ');
const assignJobToCrew = jest.fn();

const renderJobCard = (props: Partial<JobCardProps> = {}) => {
  const defaultProps = {
    job,
    crews,
    assignJobToCrew
  };
  return render(
    <JobCard {...defaultProps} {...props}/>
  );
};

describe('<JobCard />', () => {
  beforeEach(() => {
    renderJobCard();
  });

  it('renders without crashing and displays job information', () => {
    expect(screen.getByText('177 Mornersome Drive SW, Calgary AB')).toBeInTheDocument();
    // check that day of week and full date are displayed
    expect(screen.getByText(new RegExp(formattedDate[0], 'i'))).toBeInTheDocument();
    expect(screen.getByText(new RegExp(formattedDate.slice(1).join(' '), 'i'))).toBeInTheDocument();
    // no crew is assigned, so don't display 
    expect(screen.getByText(/No crew assigned/)).toBeInTheDocument();
  });

  it('changes state when a crew is selected', async () => {
      const selectCrewButton = screen.getByText(/Select a crew/);
      selectCrewButton.click();
      screen.getByText(/Heddy Ready/).click();
      expect(await screen.findAllByText(/Heddy Ready/)).toHaveLength(2);
      expect(screen.queryByText(/No crew assigned/)).not.toBeInTheDocument();
  });
});