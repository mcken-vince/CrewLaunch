import { Modal } from "react-bootstrap"
import { IContractLocal } from "../definitions";

const ContractModal = (props: ContractModalProps) => {

  return (
    <Modal centered>
      <Modal.Header></Modal.Header>
    </Modal>
  );
};

export default ContractModal;

export interface ContractModalProps {
  contract: IContractLocal;
};