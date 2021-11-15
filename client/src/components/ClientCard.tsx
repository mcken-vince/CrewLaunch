import { FC, ReactElement } from 'react';
import '../styles/ClientCard.scss';
import { IClientLocal } from './component-types';

const ClientCard: FC<ClientCardProps> = (props): ReactElement => {
  const { name, email, phone, contracts } = props.client;
  
  return (
    <div className="client-card-container">
      <h3>{name} - {email} - {phone}</h3>
      <h4>Contracts: {contracts.length}</h4>
    </div>
  );
};

export default ClientCard;

export interface ClientCardProps {
  client: IClientLocal;
};