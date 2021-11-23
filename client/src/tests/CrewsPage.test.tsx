import {render} from '@testing-library/react';
import CrewsPage, { CrewsPageProps } from '../components/pages/CrewsPage';
import { sampleState } from './sampleData';

const onDelete = jest.fn();

const renderCrewsPage = (props: Partial<CrewsPageProps> = {} ) => {
  const defaultProps = {
    crews: sampleState.crews,
    onDelete
  };
  return render (
    <CrewsPage {...defaultProps} {...props} />
  );
};

describe('<CrewsPage />', () => {
  it('renders without crashing', () => {
    renderCrewsPage();
  });

  // write tests for searchbar and filter radio
});