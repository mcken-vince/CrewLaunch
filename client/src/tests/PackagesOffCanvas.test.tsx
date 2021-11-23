import { screen, render } from '@testing-library/react';
import PackagesOffcanvas, { PackagesOffcanvasProps } from '../components/PackagesOffcanvas';
import { sampleState } from './sampleData';

const handleClose = jest.fn();
const selectPackage = jest.fn();

const renderPackagesOffcanvas = (props: Partial<PackagesOffcanvasProps> = {}) => {
  const defaultProps = {
    show: true,
    handleClose,
    selectPackage,
    packages: sampleState.packages
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