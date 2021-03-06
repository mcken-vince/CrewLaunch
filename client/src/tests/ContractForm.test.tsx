import { render, screen, fireEvent } from '@testing-library/react';
import ContractForm, { ContractFormProps } from '../components/forms/ContractForm';
import { localContracts, sampleState } from './sampleData';
import ReactRouterDom from 'react-router-dom';


const onSubmit = jest.fn((resource) => Promise.resolve(resource));

const renderContractForm = (props: Partial<ContractFormProps> = {}) => {
  const defaultProps = {
    packages: sampleState.packages,
    clients: sampleState.clients,
    contracts: localContracts,
    onSubmit
  };
  return render (
    <ReactRouterDom.BrowserRouter>
      <ContractForm {...defaultProps} {...props} />
    </ReactRouterDom.BrowserRouter>
    );
  };
  
  
describe('<ContractForm />', () => {
  beforeEach(() => {
    jest.mock("react-router-dom", () => ({
      ...jest.requireActual("react-router-dom"),
      useParams: () => ({}),
    }));
  });

  it('renders without crashing and submit button is disabled if contract start date is not selected', async () => {
    renderContractForm();
    fireEvent.change(screen.getByPlaceholderText(/Enter name/), {target: {value: 'Client Name'}});
    fireEvent.change(screen.getByPlaceholderText(/Enter email/), {target: {value: 'client@email.com'}});
    fireEvent.change(screen.getByPlaceholderText(/Enter phone #/), {target: {value: '403-929-8316'}});
    fireEvent.change(screen.getByPlaceholderText(/Enter address/), {target: {value: '123 Client St'}});
    fireEvent.change(await screen.findByPlaceholderText(/job notes/i), {target: {value: 'Some notes'}});
    const submitButton = await screen.findByTestId('submit-button');
    expect(submitButton).toBeDisabled();      
  });
});