import { render } from '@testing-library/react';
import CrewJobsPage, { CrewJobsPageProps } from '../components/pages/CrewJobsPage';

const jobs = [ { "_id": "61787d4cefa37244e2c35c14", "contract_id": "61787c58efa37244e2c35c13", "crew_id": "616f7ceea703ecd4ec419645", "date": new Date("2021-10-28T06:00:00.000Z"), "completed": false }];
const assignJobtoCrew = jest.fn().mockResolvedValue(true);
const markJobComplete = jest.fn().mockResolvedValue(true);

const renderCrewJobsPage = (props: Partial<CrewJobsPageProps> = {} ) => {
  const defaultProps = {
    jobs,
    assignJobtoCrew,
    markJobComplete
  };
  return render (
    <CrewJobsPage {...defaultProps} {...props} />
  );
};

describe('<CrewJobsPage />', () => {
  it('renders without crashing', () => {
    renderCrewJobsPage();
  });
});