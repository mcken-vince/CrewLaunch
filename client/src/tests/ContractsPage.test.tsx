import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import ContractsPage, { ContractsPageProps } from '../components/pages/ContractsPage';
import { localContracts } from './sampleData';

const renderContractsPage = (props: Partial<ContractsPageProps> = {} ) => {
  const defaultProps = {
    contracts: localContracts
  };
  return render (
    <BrowserRouter>
      <ContractsPage {...defaultProps} {...props} />
    </BrowserRouter>
  );
};

describe('<ContractsPage />', () => {
  it('renders without crashing', () => {
    renderContractsPage();
  });

  // write tests for searchbar and filter
});