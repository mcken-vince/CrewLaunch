import { render } from '@testing-library/react';
import ContractModal, { ContractModalProps } from "../components/ContractModal"; 
import { localContracts } from './sampleData';

const renderContractModal = (props: Partial<ContractModalProps> = {}) => {
  const defaultProps = {
    contract: localContracts[0]
  };
  return render (
    <ContractModal {...defaultProps} {...props} />
  );
};

describe('<ContractModal />', () => {
  it('renders without crashing', () => {
    renderContractModal();
  });
});