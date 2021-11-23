import { render } from '@testing-library/react';
import CrewJobsPage, { CrewJobsPageProps } from '../components/pages/CrewJobsPage';
import { sampleState } from './sampleData';

const assignJobtoCrew = jest.fn().mockResolvedValue(true);
const markJobComplete = jest.fn().mockResolvedValue(true);

const renderCrewJobsPage = (props: Partial<CrewJobsPageProps> = {} ) => {
  const defaultProps = {
    jobs: sampleState.jobs,
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