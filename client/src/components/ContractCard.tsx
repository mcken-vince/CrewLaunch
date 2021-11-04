import { FC, ReactElement, useState } from 'react';
import '../styles/ContractCard.scss';
import { IContractLocal } from './component-types';
import { format, addDays } from 'date-fns';
import Button from 'react-bootstrap/Button';
import ConfirmAlert from './ConfirmAlert';
import classNames from 'classnames';


const ContractCard: FC<ContractCardProps> = (props): ReactElement => {
  const thisContract = props.contract;
  const clearConfirm: IConfirm = {show: false, message: ''};
  const [confirm, setConfirm] = useState<IConfirm>(clearConfirm);
  
  const handleEditClick = () => {
    setConfirm({show: true, message: 'Are you sure you want to edit this contract?'});
  };
  
  const handleDeleteClick = () => {
    setConfirm({show: true, message: 'Are you sure you want to delete this contract?'});
  };
  
  const contractCardClasses = classNames('contractcard-container', {'selected': confirm.show});
  
  return (
    <div className={contractCardClasses}>
      <div className='contractcard-body'>
        <h3>{thisContract.address}</h3>
        <p>
          {format(new Date(thisContract.startDate), 'eeee MMMM dd, yyyy')} - 
          {format(addDays(new Date(thisContract.startDate), thisContract.selectedPackage.contract_length_days), 'eeee MMMM dd, yyyy')}
        </p>
        <p><b>{thisContract.selectedPackage.title}</b> - Every {thisContract.selectedPackage.visit_interval_days} days - {thisContract.selectedPackage.man_hrs_per_visit} man hrs/visit</p>
        <p><b>Contact:</b> {thisContract.client.name} - {thisContract.client.email} - {thisContract.client.phone}</p>
      </div>
      <div className='contractcard-actions'>
        <Button onClick={handleEditClick} disabled={confirm.show}>Edit</Button>
        <Button onClick={handleDeleteClick} disabled={confirm.show} variant='danger'>Delete</Button>
      </div>
      {confirm &&
        <ConfirmAlert 
        show={confirm.show} 
        message={confirm.message} 
        onConfirm={() => {alert('confirmed!'); setConfirm(clearConfirm)}}
        onCancel={() => {alert('canceled!'); setConfirm(clearConfirm)}}
        />}
    </div>
  );
};

export default ContractCard;

interface ContractCardProps {
  contract: IContractLocal;
};

interface IConfirm {
  show: boolean;
  message: String;
};
