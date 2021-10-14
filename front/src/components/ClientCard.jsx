import '../styles/ClientCard.scss';

const ClientCard = (props) => {
  const { name, email, phone } = props.client;
  return (
    <div className="client-card-container">
      <h3>{name} - {email} - {phone}</h3>
    </div>
  );
};

export default ClientCard;