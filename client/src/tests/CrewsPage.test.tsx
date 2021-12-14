import {render} from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import CrewsPage, { CrewsPageProps } from '../components/pages/CrewsPage';
import { sampleState } from './sampleData';

const onDelete = jest.fn();

const renderCrewsPage = (props: Partial<CrewsPageProps> = {} ) => {
  const defaultProps = {
    crews: sampleState.crews,
    onDelete
  };
  return render (
    <BrowserRouter>
      <CrewsPage {...defaultProps} {...props} />
    </BrowserRouter>
  );
};

describe('<CrewsPage />', () => {
  it('renders without crashing', () => {
    renderCrewsPage();
  });

  // write tests for searchbar and filter radio
});