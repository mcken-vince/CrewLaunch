import { render, screen } from '@testing-library/react';
import PackageCard, { PackageCardProps } from '../components/PackageCard';
import { sampleState } from './sampleData';

const packageDetails = sampleState.packages[0];
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
