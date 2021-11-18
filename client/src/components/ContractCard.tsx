import { FC, ReactElement, useState } from 'react';
import '../styles/ContractCard.scss';
import { IContractLocal } from './component-types';
import { addDays } from 'date-fns';
import Button from 'react-bootstrap/Button';
import ConfirmAlert from './ConfirmAlert';
import classNames from 'classnames';
import { formatDate } from '../helpers/dataFormatters';
import { IConfirm } from '../definitions';

const ContractCard: FC<ContractCardProps> = (props): ReactElement => {
  const thisContract = props.contract;
  const clearConfirm: IConfirm = {show: false, message: '', action: 'NONE'};
  const [confirm, setConfirm] = useState<IConfirm>(clearConfirm);
  


  const handleEditClick = (): void => {
    setConfirm({show: true, message: 'Are you sure you want to edit this contract?', action: 'EDIT'});
  };
  
  const handleDeleteClick = (): void => {
    setConfirm({show: true, message: 'Are you sure you want to delete this contract?', action: 'DELETE'});
  };
  
  const contractCardClasses: string = classNames('contractcard-container', {'selected': confirm.show});

  // Need to calculate if this job is past, current, or upcoming, and use the calculation to set the classes
  const statusClasses: string = classNames('contractcard-status', {past: false, current: false, upcoming: false});

  return (
    <div className={contractCardClasses}>
      <div className='contractcard-body'>
        <h3>{thisContract.address}</h3>
        <p>
          {formatDate(thisContract.start_date)} - 
          {formatDate(addDays(new Date(thisContract.start_date), thisContract.selectedPackage.contract_length_days))}
        </p>
        <p><b>{thisContract.selectedPackage.title}</b> - Every {thisContract.selectedPackage.visit_interval_days} days - {thisContract.selectedPackage.man_hrs_per_visit} man hrs/visit</p>
        <p><b>Contact:</b> {thisContract.client.name} - {thisContract.client.email} - {thisContract.client.phone}</p>
      </div>
      <div className='contractcard-footer'>
        <div className='contractcard-actions'>
          <Button onClick={handleEditClick} disabled={confirm.show}>Edit</Button>
          <Button onClick={handleDeleteClick} disabled={confirm.show} variant='danger'>Delete</Button>
        </div>
        <p>Status: 
          <span className={statusClasses}>
          {'Active'}
          </span>
        </p>
      </div>
      {confirm &&
        <ConfirmAlert 
        variant={confirm.action}
        show={confirm.show} 
        message={confirm.message} 
        onConfirm={() => {alert('confirmed!'); setConfirm(clearConfirm)}}
        onCancel={() => {alert('canceled!'); setConfirm(clearConfirm)}}
        />}
    </div>
  );
};

export default ContractCard;

export interface ContractCardProps {
  contract: IContractLocal;
};

