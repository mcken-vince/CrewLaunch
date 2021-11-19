import { screen, render } from '@testing-library/react';
import PackagesOffcanvas, { PackagesOffcanvasProps } from '../components/PackagesOffcanvas';

const packages = [{ "_id": "616f7ceea703ecd4ec419647", "title": "Lawn Care Silver", "cost": 5000, "contract_length_days": 90, "visit_interval_days": 14, "man_hrs_per_visit": 4, "description": "3 Month, Biweekly: Mow, edge trim, blow off pathways", "createdAt": "2021-10-20T02:20:30.796Z", "updatedAt": "2021-10-20T02:20:30.796Z", "__v": 0 }];
const handleClose = jest.fn();
const selectPackage = jest.fn();

const renderPackagesOffcanvas = (props: Partial<PackagesOffcanvasProps> = {}) => {
  const defaultProps = {
    show: true,
    handleClose,
    selectPackage,
    packages
  };
  return render(
    <PackagesOffcanvas {...defaultProps} {...props}/>
  );
};

describe('<PackagesOffcanvas />', () => {
  it('renders without crashing and displays package details', () => {
    renderPackagesOffcanvas();
    expect(screen.getByText(/Lawn Care Silver/)).toBeInTheDocument();
  });

  it('calls handleClose when "x" button is clicked', () => {
    renderPackagesOffcanvas();
    const x = screen.getByLabelText('Close');
    x.click();
    expect(handleClose).toHaveBeenCalled();
  });

  it('calls selectPackage when "select" button is clicked', () => {
    renderPackagesOffcanvas();
    const select = screen.getByText(/Select/);
    select.click();
    expect(selectPackage).toHaveBeenCalled();
  });
});