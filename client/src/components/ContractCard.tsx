import { FC, ReactElement, useState } from 'react';
import '../styles/ContractCard.scss';
import { IContractLocal } from './component-types';
import { addDays } from 'date-fns';
import Button from 'react-bootstrap/Button';
import ConfirmAlert from './ConfirmAlert';
import classNames from 'classnames';
import { formatDate } from '../helpers/dataFormatters';
import { IConfirm } from '../definitions';
import { calculateContractStatus } from '../helpers/dataFormatters';
import { Card } from 'react-bootstrap';

const ContractCard: FC<ContractCardProps> = (props): ReactElement => {
  const thisContract = props.contract;
  const clearConfirm: IConfirm = {show: false, message: '', action: 'NONE'};
  const [confirm, setConfirm] = useState<IConfirm>(clearConfirm);
  
  const handleDeleteClick = (): void => {
    setConfirm({show: true, message: 'Are you sure you want to delete this contract?', action: 'DELETE'});
  };
  
  const contractCardClasses: string = classNames('contractcard-container', {'selected': confirm.show});

  const startDate: Date = new Date(thisContract.start_date);
  const endDate: Date = addDays(startDate, thisContract.selectedPackage.contract_length_days);
  const status = calculateContractStatus(startDate, endDate);

  // Need to calculate if this job is past, current, or upcoming, and use the calculation to set the classes
  const statusClasses: string = classNames('contractcard-status', {complete: status === 'Complete', active: status === 'Active', upcoming: status === 'Upcoming'});
  const thisPackage = thisContract.selectedPackage;
  return (
    <Card className={contractCardClasses}>
      <Card.Body className='contractcard-body'>
        <h3>{thisContract.address}</h3>
        <p>
          {formatDate(thisContract.start_date)} - 
          {formatDate(addDays(new Date(thisContract.start_date), thisPackage.contract_length_days))}
        </p>
        <p>
          <b>{thisPackage.title}</b> 
          - Every {thisPackage.visit_interval_days === 1 ? 'day' : `${thisPackage.visit_interval_days} days`}
          - {thisPackage.man_hrs_per_visit} man hrs/visit
        </p>
        <p><b>Contact:</b> {thisContract.client.name} - {thisContract.client.email} - {thisContract.client.phone}</p>
      </Card.Body>
      <Card.Footer className='contractcard-footer'>
        <p>Status: 
          <span className={statusClasses}>
          {status}
          </span>
        </p>
        <div className='contractcard-actions'>
          <Button onClick={handleDeleteClick} disabled={confirm.show} variant='danger'>Delete</Button>
        </div>
      </Card.Footer>
      {confirm &&
        <ConfirmAlert 
        variant={confirm.action}
        show={confirm.show} 
        message={confirm.message} 
        onConfirm={() => {alert('confirmed!'); setConfirm(clearConfirm)}}
        onCancel={() => {alert('canceled!'); setConfirm(clearConfirm)}}
        />}
    </Card>
  );
};

export default ContractCard;

export interface ContractCardProps {
  contract: IContractLocal;
};

