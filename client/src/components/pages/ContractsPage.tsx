import { FC, ReactElement, useState } from "react";
import '../../styles/ContractsPage.scss';
import { IContractLocal } from "../component-types"; 
import ContractCard from "../ContractCard";
import CustomSearchBar from "../CustomSearchBar";

const ContractsPage: FC<ContractsPageProps> = (props): ReactElement => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const contracts: IContractLocal[] = props.contracts;

  const lcSearchTerm: string = searchTerm.toLowerCase();
  const filteredContracts = searchTerm ? contracts.filter(c => {
    
    return (
      c.address.toLowerCase().includes(lcSearchTerm) ||
      (c.job_notes && c.job_notes.toLowerCase().includes(lcSearchTerm)) ||
      c.client.name.toLowerCase().includes(lcSearchTerm) ||
      c.client.email.toLowerCase().includes(lcSearchTerm) ||
      c.selectedPackage.title.toLowerCase().includes(lcSearchTerm)
    );
  }) : contracts;

  const contractCards = filteredContracts.map((contract, idx) => {
    return <ContractCard key={idx} contract={contract}/>
  }).reverse();

  return (
    <div className='contracts-container'>
      <h1>Contracts: {contracts.length}</h1> 
      <div className='contracts-search search'>
        <CustomSearchBar value={searchTerm} onChange={setSearchTerm} placeholder='Search'/>
        {
          contractCards && contractCards.length > 0 ? 
          contractCards : <h2>No matching contracts found.</h2>
        }
      </div>
    </div>
  );
};

export default ContractsPage;

interface ContractsPageProps {
  contracts: IContractLocal[];
};