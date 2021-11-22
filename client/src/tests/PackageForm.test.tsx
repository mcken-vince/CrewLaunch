import { render, screen, fireEvent } from '@testing-library/react';
import PackageForm, { PackageFormProps } from '../components/forms/PackageForm';
import BrowserRouter from 'react-router';

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useParams: jest.fn(() => Promise.resolve('yes')),
 }));

const onSubmit = jest.fn();
const packages = [ { "_id": "616f7ceea703ecd4ec419647", "title": "Lawn Care Silver", "cost": 5000, "contract_length_days": 90, "visit_interval_days": 14, "man_hrs_per_visit": 4, "description": "3 Month, Biweekly: Mow, edge trim, blow off pathways", "createdAt": "2021-10-20T02:20:30.796Z", "updatedAt": "2021-10-20T02:20:30.796Z" }];

const renderPackageForm = (props: Partial<PackageFormProps> = {}) => {
  const defaultProps = {
    onSubmit,
    packages
  };
  return render (
    <PackageForm {...defaultProps} {...props} /> 
  );
};

describe('<PackageForm />', () => {
  it('renders without crashing and calls onSubmit when package is submitted', async () => {
    jest.spyOn(BrowserRouter, 'useParams').mockReturnValue({});
    renderPackageForm();
    fireEvent.change(screen.getByPlaceholderText(/Enter package title/i), {target: {value: 'package title'}});
    fireEvent.change(screen.getByPlaceholderText(/Enter description/i), {target: {value: 'description here :)'}});
    fireEvent.change(screen.getByPlaceholderText(/Enter package cost/i), {target: {value: 5000}});
    fireEvent.change(screen.getByPlaceholderText(/Enter visit interval in days/i), {target: {value: 7}});
    fireEvent.change(screen.getByPlaceholderText(/Enter length in days/i), {target: {value: 14}});
    fireEvent.change(screen.getByPlaceholderText(/Enter estimated man hrs per visit/i), {target: {value: 3}});
    screen.getByText(/Submit/i).click();
    expect(await screen.findByText(/Success/i)).toBeInTheDocument();
  });
});