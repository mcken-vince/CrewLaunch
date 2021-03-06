import { render, screen, fireEvent } from '@testing-library/react';
import ReactRouterDom from 'react-router-dom';
import PackageForm, { PackageFormProps } from '../components/forms/PackageForm';
import { sampleState } from './sampleData';


const onSubmit = jest.fn();

const renderPackageForm = (props: Partial<PackageFormProps> = {}) => {
  const defaultProps = {
    onSubmit,
    packages: sampleState.packages
  };
  return render (
    <ReactRouterDom.BrowserRouter>
      <PackageForm {...defaultProps} {...props} /> 
    </ReactRouterDom.BrowserRouter>
    );
  };
  
  
describe('<PackageForm />', () => {
    beforeEach(() => {
      jest.mock("react-router-dom", () => ({
        ...jest.requireActual("react-router-dom"),
        useParams: jest.fn(() => Promise.resolve({})),
      }));
    });
  it('renders without crashing and calls onSubmit when package is submitted', async () => {
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