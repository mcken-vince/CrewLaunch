import { FC, ReactElement } from "react";
import '../../styles/ContractsPage.scss';
import { IContractLocal } from "../component-types"; 
import ContractCard from "../ContractCard";

const ContractsPage: FC<ContractsPageProps> = (props): ReactElement => {
  const contracts: IContractLocal[] = props.contracts;

  const contractCards = contracts.map((contract, idx) => {
    return <ContractCard key={idx} contract={contract}/>
  });

  return (
    <>
      <div className='contracts-container'>
        <h1>Contracts:</h1>
        {contractCards}
      </div>
    </>
  );
};

export default ContractsPage;

interface ContractsPageProps {
  contracts: IContractLocal[];
};