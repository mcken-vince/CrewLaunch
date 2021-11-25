import { screen, render } from '@testing-library/react';
import CrewCalendar, { CrewCalendarProps } from '../components/CrewCalendar';
import { localJobs } from './sampleData';

const markJobComplete = jest.fn();

const renderCrewCalendar = (props: Partial<CrewCalendarProps> = {}) => {
  const defaultProps = {
    jobs: localJobs,
    markJobComplete
  };
  return render (
    <CrewCalendar {...defaultProps} {...props} />
  );
};

describe('<CrewCalendar />', () => {
  it('renders without crashing', () => {
    renderCrewCalendar();
  });
});