import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import ClientCard, { ClientCardProps } from "../components/ClientCard";
import { localContracts, localClients } from './sampleData';

const renderClientCard = (props: Partial<ClientCardProps> = {}) => {
  const defaultProps = {
    client: localClients[0],
    contracts: localContracts,
  };
  return render(
    <BrowserRouter>
      <ClientCard {...defaultProps} {...props}/>
    </BrowserRouter>
  );
};

describe('<ClientCard />', () => {
  it("renders without crashing and displays client information and client's contracts", () => {
    renderClientCard();
    expect(screen.getByText('Gregory Peck')).toBeInTheDocument();
    expect(screen.getByText('regreg@peck.com')).toBeInTheDocument();
    expect(screen.getByText('403-552-9094')).toBeInTheDocument();
    expect(screen.getByText('177 Mornersome Drive SW, Calgary AB')).toBeInTheDocument();
  });
});