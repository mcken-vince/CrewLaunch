import { render, screen } from '@testing-library/react';
import PackageCard, { PackageCardProps } from '../components/PackageCard';
import { useHistory } from 'react-router-dom';

const packageDetails = { "_id": "616f7ceea703ecd4ec419647", "title": "Lawn Care Silver", "cost": 5000, "contract_length_days": 90, "visit_interval_days": 14, "man_hrs_per_visit": 4, "description": "3 Month, Biweekly: Mow, edge trim, blow off pathways", "createdAt": "2021-10-20T02:20:30.796Z", "updatedAt": "2021-10-20T02:20:30.796Z" };
const onSelect = jest.fn(() => 'selected');
const onEdit = jest.fn(() => 'edit');
const onDelete = jest.fn(() => 'delete');
jest.mock('react-router-dom');

const renderPackageCard = (props: Partial<PackageCardProps> = {}) => {
  const defaultProps = {
    packageDetails
  };
  return render(
    <PackageCard {...defaultProps} {...props}/>
  );
};

describe('<PackageCard onSelect={onSelect}/>', () => {
  beforeEach(() => {
    renderPackageCard({onSelect});
  });

  it('renders without crashing and displays package information', () => {
    expect(screen.getByText('Lawn Care Silver')).toBeInTheDocument();
    expect(screen.getByText(/5000/)).toBeInTheDocument();
    expect(screen.getByText(new RegExp(packageDetails.description, 'i'))).toBeInTheDocument();
  });
  
  it('calls onSelect when select button is clicked', () => {
    const selectButton = screen.getByText(/Select/);
    expect(selectButton).toBeInTheDocument();
    selectButton.click();
    expect(onSelect).toHaveBeenCalled();
  });
});


describe('<PackageCard onEdit={onEdit} onDelete={onDelete} />', () => {
  beforeEach(() => {
    renderPackageCard({onEdit, onDelete});
  });

  it('calls onEdit when Edit button is clicked', () => {
    const editButton = screen.getByText(/Edit/);
    editButton.click();
    screen.getByText(/Confirm/).click();
    expect(onEdit).toHaveBeenCalled();

  });

  it('calls onDelete when Delete button is clicked', () => {
    const deleteButton = screen.getByText(/Delete/);
    deleteButton.click();
    screen.getByText(/Confirm/).click();
    expect(onDelete).toHaveBeenCalled();
  });
});
