import { FC, ReactElement, useState } from "react";
import { FormControl, InputGroup, Button } from "react-bootstrap";
import '../../styles/ContractsPage.scss';
import { IContractLocal } from "../component-types"; 
import ContractCard from "../ContractCard";

const ContractsPage: FC<ContractsPageProps> = (props): ReactElement => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const contracts: IContractLocal[] = props.contracts;

  const filteredContracts = searchTerm ? contracts.filter(c => {
    return c.address.toLowerCase().includes(searchTerm.toLowerCase());
  }) : contracts;

  const contractCards = filteredContracts.map((contract, idx) => {
    return <ContractCard key={idx} contract={contract}/>
  });

  return (
    <>
      <div className='contracts-container'>
        <h1>Contracts:</h1>
        
        <div className='contracts-search'>
        <InputGroup className='mb-3'>
          <InputGroup.Text id='search'>Search By Address:</InputGroup.Text>
          <FormControl
            aria-describedby='search-term'
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          </InputGroup>
          {
            contractCards && contractCards.length > 0 ? 
            contractCards : <h2>No matching contracts found.</h2>
          }
        </div>
      </div>
    </>
  );
};

export default ContractsPage;

interface ContractsPageProps {
  contracts: IContractLocal[];
};