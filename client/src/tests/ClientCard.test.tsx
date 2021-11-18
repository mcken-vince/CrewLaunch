import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import ClientCard, { ClientCardProps } from "../components/ClientCard";

const contracts = [ { "_id": "61787c58efa37244e2c35c13", "client_id": "616f7ceea703ecd4ec419646", "address": "177 Mornersome Drive SW, Calgary AB", "job_notes": "There are no notes. Nothing to see here.", "package_id": "616f7ceea703ecd4ec419647", "start_date": new Date("2021-10-28T06:00:00.000Z") } ];
const client = { "_id": "616f7ceea703ecd4ec419646", "name": "Gregory Peck", "email": "regreg@peck.com", "phone": "403-552-9094", "createdAt": "2021-10-20T02:20:30.796Z", "updatedAt": "2021-10-20T02:20:30.796Z", contracts };

const renderClientCard = (props: Partial<ClientCardProps> = {}) => {
  const defaultProps = {
    client,
    contracts,
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