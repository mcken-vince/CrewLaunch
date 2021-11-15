import { ReactElement, useState } from "react";
import { IClient, IContract } from "../../definitions";
import ClientCard from "../ClientCard";
import CustomSearchBar from "../CustomSearchBar";
import '../../styles/ClientsPage.scss';
import { IClientLocal } from "../component-types";

const ClientsPage = (props: ClientsPageProps): ReactElement => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const clients = props.clients;

  const filteredClients = clients.filter(c => c.email.toLowerCase().includes(searchTerm.toLowerCase()));

  const clientCards = filteredClients.map((client, idx) => {
    return <ClientCard key={idx} client={client} />;
  }).reverse();


  return (
    <div className='clients-container'>
       <h1>Clients: {clients.length}</h1>

       <div className='clients-search search'>
          <CustomSearchBar value={searchTerm} onChange={setSearchTerm} placeholder='Search by name'/>
          {
            clientCards && clientCards.length > 0 ? 
            clientCards : <h2>No matching clients found.</h2>
          }
        </div>
    </div>
  );
};

export default ClientsPage;

interface ClientsPageProps {
  clients: IClientLocal[];
};