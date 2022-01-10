import { fireEvent, render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import ContractsPage, { ContractsPageProps } from '../components/pages/ContractsPage';
import { localContracts } from './sampleData';

const firstContract = localContracts[0];
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
    renderContractsPage();
    expect(screen.getByText(firstContract.address)).toBeInTheDocument()
    expect(screen.getByText(new RegExp(firstContract.client.name))).toBeInTheDocument();
  });
  it('filters contracts by status using radio filters', () => {
    renderContractsPage();
    fireEvent.click(screen.getByTestId('upcoming-contracts'));
    expect(screen.queryByText(firstContract.address)).not.toBeInTheDocument();
    fireEvent.click(screen.getByTestId('complete-contracts'));
    expect(screen.queryByText(firstContract.address)).toBeInTheDocument();
    fireEvent.click(screen.getByTestId('active-contracts'));
    expect(screen.queryByText(firstContract.address)).not.toBeInTheDocument();
  });
  it('filters contracts using the searchbar', () => {
    renderContractsPage();
    // Contract is displayed if address matches search value
    fireEvent.change(screen.getByPlaceholderText(/Search by/i), {target: {value: 'calgary'}});
    expect(screen.queryByText(firstContract.address)).toBeInTheDocument();
    // Contract is not displayed if there is no match
    fireEvent.change(screen.getByPlaceholderText(/Search by/i), {target: {value: 'zagagaga'}});
    expect(screen.queryByText(firstContract.address)).not.toBeInTheDocument();
  });
});