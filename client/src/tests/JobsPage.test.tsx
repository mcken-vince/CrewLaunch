import { render } from '@testing-library/react';
import JobsPage, { JobsPageProps } from '../components/pages/JobsPage';
import { sampleState, localJobs } from './sampleData';

const assignJobToCrew = jest.fn();
const markJobComplete = jest.fn();

const renderJobsPage = (props: Partial<JobsPageProps> = {}) => {
  const defaultProps = {
    jobs: localJobs,
    crews: sampleState.crews,
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