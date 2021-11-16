import { FC, ReactElement } from 'react';
import '../styles/ClientCard.scss';
import { IClientLocal } from './component-types';
import { formatDate } from '../helpers/dataFormatters';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';

const ClientCard: FC<ClientCardProps> = (props): ReactElement => {
  const { name, email, phone, contracts } = props.client;
  
  const contractCards = contracts.map((c, idx) => {
    return (
      <div className='client-contract-container'>
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
      </div>
      <div className='client-card-body'>
        {contractCards}
      </div>
    </div>
  );
};

export default ClientCard;

export interface ClientCardProps {
  client: IClientLocal;
};