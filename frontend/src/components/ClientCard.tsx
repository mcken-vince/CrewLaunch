import '../styles/ClientCard.scss';
import { ReactElement } from 'react';
import { ClientCardProps } from './component-types';

const ClientCard = (props: ClientCardProps): ReactElement => {
  const { name, email, phone } = props.client;
  
  return (
    <div className="client-card-container">
      <h3>{name} - {email} - {phone}</h3>
    </div>
  );
};

export default ClientCard;