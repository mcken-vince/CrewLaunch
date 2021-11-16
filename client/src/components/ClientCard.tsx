import { FC, ReactElement } from 'react';
import '../styles/ClientCard.scss';
import { IClientLocal } from './component-types';
import { formatDate } from '../helpers/dataFormatters';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';

const ClientCard: FC<ClientCardProps> = (props): ReactElement => {
  const { name, email, phone, contracts } = props.client;
  
  const clientContractCards = contracts.map((c, idx) => {
    return (
      <div key={idx} className='client-contract-container'>
        <p>{c.address}</p>
        <p>{formatDate(c.start_date)}</p>
        <Button><Link to={`/dispatch/contracts/edit/${c._id}`}>View Details</Link></Button>
      </div>
    );
  });

  return (
    <div className="client-card-container">
      <div className='client-card-info'>
        <h3>{name}</h3>
        <h3>{email}</h3>
        <h3>{phone}</h3>
        <h4>Contracts: {contracts.length}</h4>
        <Button><Link to={`/dispatch/contracts/clients/${props.client._id.toString()}`}>New Contract</Link></Button>
      </div>
      <div className='client-card-body'>
        {clientContractCards}
      </div>
    </div>
  );
};

export default ClientCard;

export interface ClientCardProps {
  client: IClientLocal;
};