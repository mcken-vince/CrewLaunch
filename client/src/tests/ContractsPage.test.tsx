import { fireEvent, render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import ContractsPage, { ContractsPageProps } from '../components/pages/ContractsPage';
import { localContracts } from './sampleData';

const onDelete = jest.fn();

const renderContractsPage = (props: Partial<ContractsPageProps> = {} ) => {
  const defaultProps = {
    contracts: localContracts,
    onDelete
  };
  return render (
    <BrowserRouter>
      <ContractsPage {...defaultProps} {...props} />
    </BrowserRouter>
  );
};

describe('<ContractsPage />', () => {
  it('renders without crashing and displays contract details', async () => {
    const firstContract = localContracts[0];
    renderContractsPage();
    expect(screen.getByText(firstContract.address)).toBeInTheDocument()
    expect(screen.getByText(new RegExp(firstContract.client.name))).toBeInTheDocument();
  });
  it('filters contracts correctly with radio filters', () => {
    const firstContract = localContracts[0];
    renderContractsPage();
    fireEvent.click(screen.getByTestId('upcoming-contracts'));
    expect(screen.queryByText(firstContract.address)).not.toBeInTheDocument();
    fireEvent.click(screen.getByTestId('complete-contracts'));
    expect(screen.queryByText(firstContract.address)).toBeInTheDocument();
    fireEvent.click(screen.getByTestId('active-contracts'));
    expect(screen.queryByText(firstContract.address)).not.toBeInTheDocument();
  });
  // write tests for searchbar
});