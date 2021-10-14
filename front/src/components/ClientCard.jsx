import '../styles/ClientCard.scss';

const ClientCard = (props) => {
  const { name, email, phone } = props.client;
  return (
    <div className="client-card-container">
      <h3>{name}</h3>
      <h3><b>{email}</b></h3>
      <h3>{phone}</h3>
    </div>
  );
};

export default ClientCard;