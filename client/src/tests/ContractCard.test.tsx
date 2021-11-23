import { render, screen } from '@testing-library/react';
import ContractCard, { ContractCardProps } from '../components/ContractCard';
import { formatDate } from '../helpers/dataFormatters';
import { localContracts } from './sampleData';

const contract = localContracts[0];

const formattedDate: string = formatDate(contract.start_date);
const packageTitle: string = contract.selectedPackage.title;
const clientName: string = contract.client.name;
const clientEmail: string = contract.client.email;

const renderContractCard = (props: Partial<ContractCardProps> = {}) => {
  const defaultProps = {
    contract
  };
  return render(
    <ContractCard {...defaultProps} {...props}/>
  );
};

describe('<ContractCard />', () => {
  it('renders without crashing and displays contract details and status', () => {
    renderContractCard();
    expect(screen.getByText('177 Mornersome Drive SW, Calgary AB')).toBeInTheDocument();
    expect(screen.getByText(new RegExp(formattedDate, 'i'))).toBeInTheDocument();
    expect(screen.getByText(new RegExp(packageTitle, 'i'))).toBeInTheDocument();
    expect(screen.getByText(new RegExp(clientName, 'i'))).toBeInTheDocument();
    expect(screen.getByText(new RegExp(clientEmail, 'i'))).toBeInTheDocument();
    expect(screen.getByText('Complete')).toBeInTheDocument();
  });
});