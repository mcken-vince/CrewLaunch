import { render } from '@testing-library/react';
import { IJobLocal } from '../components/component-types';
import JobsPage, { JobsPageProps } from '../components/pages/JobsPage';
import { ICrew } from '../definitions';

const crews: ICrew[] = [ { "_id": "616f7ceea703ecd4ec419645", "foreman_name": "Heddy Ready", "crew_size": 4, "is_active": true, "avatar": "https://getavataaars.com/?accessoriesType=Prescription02&avatarStyle=Transparent&clotheColor=PastelRed&clotheType=ShirtCrewNeck&eyeType=Squint&eyebrowType=FlatNatural&facialHairColor=BrownDark&facialHairType=BeardMajestic&graphicType=Resist&hairColor=PastelPink&mouthType=Smile&skinColor=Tanned&topType=WinterHat2", "createdAt": "2021-10-20T02:20:30.796Z", "updatedAt": "2021-10-20T02:20:30.796Z" }];
const jobs: IJobLocal[] = [ { "_id": "61787d4cefa37244e2c35c14", "contract_id": "61787c58efa37244e2c35c13", "crew_id": "616f7ceea703ecd4ec419645", "date": new Date("2021-10-28T06:00:00.000Z"), "completed": false }];
const assignJobToCrew = jest.fn();
const markJobComplete = jest.fn();

const renderJobsPage = (props: Partial<JobsPageProps> = {}) => {
  const defaultProps = {
    jobs,
    crews,
    assignJobToCrew,
    markJobComplete
  };
  return render (
    <JobsPage {...defaultProps} {...props} />
  );
};

describe('<JobsPage />', () => {
  it('renders without crashing', () => {
    renderJobsPage();
  });
});