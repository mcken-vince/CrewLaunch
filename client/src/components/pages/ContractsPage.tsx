import { ChangeEvent, FC, ReactElement, useState } from "react";
import '../../styles/ContractsPage.scss';
import { IContractLocal } from "../../definitions"; 
import ContractCard from "../ContractCard";
import CustomSearchBar from "../CustomSearchBar";
import Form from 'react-bootstrap/Form';
import { calculateContractStatus } from "../../helpers/dataFormatters";
import addDays from 'date-fns/addDays';

const ContractsPage: FC<ContractsPageProps> = (props): ReactElement => {
  const [checked, setChecked] = useState<string | null>('none');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const contracts: IContractLocal[] = props.contracts;

  // Calculate function for radio filter
  const contractStatus = (contract: IContractLocal): 'Active' | 'Complete' | 'Upcoming'  => {
    const startDate: Date = new Date(contract.start_date);
    const endDate: Date = new Date(addDays(startDate, contract.selectedPackage.contract_length_days));
    return calculateContractStatus(startDate, endDate);
  };

    // Radio 'Filter by:'
    let filterFn;
    switch(checked) {
      case 'active':
        filterFn = ((c: IContractLocal) => contractStatus(c) === 'Active');
        break;
      case 'complete':
        filterFn = ((c: IContractLocal) => contractStatus(c) === 'Complete');
        break;
      case 'upcoming':
        filterFn = ((c: IContractLocal) => contractStatus(c) === 'Upcoming');
        break;
      default:
        filterFn = null;
    };
    const prefilteredContracts: IContractLocal[] = filterFn ? contracts.filter(filterFn) : contracts;

  const handleRadioChange = (e: ChangeEvent<HTMLInputElement>) => {setChecked(e.target.value)};

  const lcSearchTerm: string = searchTerm.toLowerCase();
  const filteredContracts = searchTerm ? prefilteredContracts.filter(c => {
    return (
      c.address.toLowerCase().includes(lcSearchTerm) ||
      (c.job_notes && c.job_notes.toLowerCase().includes(lcSearchTerm)) ||
      c.client.name.toLowerCase().includes(lcSearchTerm) ||
      c.client.email.toLowerCase().includes(lcSearchTerm) ||
      c.selectedPackage.title.toLowerCase().includes(lcSearchTerm)
    );
  }) : prefilteredContracts;

  const contractCards = filteredContracts.map((contract, idx) => {
    return <ContractCard key={idx} contract={contract}/>
  }).reverse();

  return (
    <div className='contracts-container'>
      <div className='contracts-page-header'>
      <h1>Contracts: {filteredContracts.length}/{contracts.length}</h1> 
      <div className='radio-filters'>
          <h5>Show:</h5>
              <Form.Group >
                <Form.Check onChange={handleRadioChange} inline type='radio' label='All' name='contractFilter' id='none' value='none' checked={checked === 'none'} />
                <Form.Check onChange={handleRadioChange} inline type='radio' label='Upcoming contracts' name='contractFilter' id='upcoming' value='upcoming' checked={checked === 'upcoming'}/>
                <Form.Check onChange={handleRadioChange} inline type='radio' label='Complete contracts' name = 'contractFilter' id='complete' value='complete' checked={checked === 'complete'}/>
                <Form.Check onChange={handleRadioChange} inline type='radio' label='Active contracts' name='contractFilter' id='active' value='active' checked={checked === 'active'}/>
              </Form.Group>
        </div>
      </div>
      <div className='contracts-search search'>
        <CustomSearchBar value={searchTerm} onChange={setSearchTerm} placeholder='Search by address, job notes, client name, email, or package title'/>
        {
          contractCards && contractCards.length > 0 ? 
          contractCards : <h2>No matching contracts found.</h2>
        }
      </div>
    </div>
  );
};

export default ContractsPage;

export interface ContractsPageProps {
  contracts: IContractLocal[];
};