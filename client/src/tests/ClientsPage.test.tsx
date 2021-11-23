import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import ClientsPage, { ClientsPageProps } from '../components/pages/ClientsPage';
import { localClients, localContracts } from './sampleData';


const renderClientsPage = (props: Partial<ClientsPageProps> = {} ) => {
  const defaultProps = {
    clients: localClients,
    contracts: localContracts
  };
  return render (
    <BrowserRouter>
      <ClientsPage {...defaultProps} {...props} />
    </BrowserRouter>
  );
};

describe('<ClientsPage />', () => {
  it('renders without crashing', () => {
    renderClientsPage();
  });
});