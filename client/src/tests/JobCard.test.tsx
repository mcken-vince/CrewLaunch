import { render, screen } from '@testing-library/react';
import JobCard, { JobCardProps } from '../components/JobCard';
import { formatDate } from '../helpers/dataFormatters';
import { sampleState, localJobs } from './sampleData';

const job = localJobs[0];

const formattedDate: string[] = formatDate(job.date).split(' ');
const assignJobToCrew = jest.fn(() => setTimeout(() => Promise.resolve('Yay'), 2000));
const markJobComplete = jest.fn();

const renderJobCard = (props: Partial<JobCardProps> = {}) => {
  const defaultProps = {
    job,
    crews: sampleState.crews,
    assignJobToCrew,
    markJobComplete
  };
  return render(
    <JobCard {...defaultProps} {...props}/>
  );
};

describe('<JobCard />', () => {
  // This is a hack to silence the 'not wrapped in act' warning
  const originalError = console.error
  beforeAll(() => {
    console.error = (...args) => {
      if (/Warning.*not wrapped in act/.test(args[0])) {
        return
      }
      originalError.call(console, ...args)
    };
  });

afterAll(() => {
  console.error = originalError
})
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

  it('call assignCrewToJob() when a crew is selected', async () => {
    const selectCrewButton = screen.getByText(/Select a crew/);
    selectCrewButton.click();
    screen.getByText(/Heddy Ready/).click();
    expect(assignJobToCrew).toHaveBeenCalled();
  });
});