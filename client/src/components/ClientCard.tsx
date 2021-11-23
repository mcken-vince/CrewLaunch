import { FC, ReactElement } from 'react';
import '../styles/ClientCard.scss';
import { IClientLocal, IContractLocal } from './component-types';
import { formatDate } from '../helpers/dataFormatters';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import ContractCard from './ContractCard';


const ClientCard: FC<ClientCardProps> = (props): ReactElement => {
  const { _id, name, email, phone, contracts } = props.client;
  const thisClientsContracts = props.contracts.filter(c => c.client_id.toString() === _id);

  // const clientContractCards = contracts.map((c, idx) => {
    // return (
    //   <div key={idx} className='client-contract-container'>
    //     <p>{c.address}</p>
    //     <p>{formatDate(c.start_date)}</p>
    //     <Button>View Details</Button>
    //   </div>
    // );
  const clientContractCards = thisClientsContracts.map((c, idx) => {
    return (
      <ContractCard key={idx} contract={c} />
      )
    });


  return (
    <div className="client-card-container">
      <div className='client-card-info'>
        <h3>{name}</h3>
        <h3>{email}</h3>
        <h3>{phone}</h3>
        <h4>Contracts: {contracts.length}</h4>
        <Button><Link to={`/dispatch/contracts/new/clients/${props.client._id.toString()}`}>New Contract</Link></Button>
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
  contracts: IContractLocal[];
};