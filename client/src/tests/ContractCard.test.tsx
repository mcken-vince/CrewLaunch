import { render, screen } from '@testing-library/react';
import ContractCard, { ContractCardProps } from '../components/ContractCard';
import { formatDate } from '../helpers/dataFormatters';

const contract = {
   "_id": "61787c58efa37244e2c35c13", "client_id": "616f7ceea703ecd4ec419646", "address": "177 Mornersome Drive SW, Calgary AB", "job_notes": "There are no notes. Nothing to see here.", "package_id": "616f7ceea703ecd4ec419647", "start_date": new Date("2020-10-28T06:00:00.000Z"),
   client: { "_id": "616f7ceea703ecd4ec419646", "name": "Gregory Peck", "email": "regreg@peck.com", "phone": "403-552-9094", "createdAt": "2021-10-20T02:20:30.796Z", "updatedAt": "2021-10-20T02:20:30.796Z" },
   selectedPackage: { "_id": "616f7ceea703ecd4ec419647", "title": "Lawn Care Silver", "cost": 5000, "contract_length_days": 90, "visit_interval_days": 14, "man_hrs_per_visit": 4, "description": "3 Month, Biweekly: Mow, edge trim, blow off pathways", "createdAt": "2021-10-20T02:20:30.796Z", "updatedAt": "2021-10-20T02:20:30.796Z" }
};
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