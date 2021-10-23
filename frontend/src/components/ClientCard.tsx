import '../styles/ClientCard.scss';
import { ClientCardProps } from './component-types';

const ClientCard = (props: ClientCardProps): JSX.Element => {
  const { name, email, phone } = props.client;
  
  return (
    <div className="client-card-container">
      <h3>{name} - {email} - {phone}</h3>
    </div>
  );
};

export default ClientCard;