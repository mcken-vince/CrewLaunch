import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { IPackage, IConfirm } from '../definitions';
import { FC, ReactElement, useState } from 'react';
import ConfirmAlert from './ConfirmAlert';
import '../styles/PackageCard.scss';


const PackageCard: FC<PackageCardProps> = (props): ReactElement => {
  const clearConfirm: IConfirm = {show: false, message: '', action: 'NONE'};
  const [confirm, setConfirm] = useState<IConfirm>(clearConfirm);
  const { onSelect, packageDetails, onEdit, onDelete } = props;
  const { title, description, cost } = packageDetails;

  const handleConfirm = () => {
    if (confirm.action === 'DELETE') {
      if (!onDelete) {
        return 'Error!'
      }
      const id = props.packageDetails._id;
      onDelete(id);
    }
    if (confirm.action === 'EDIT') {
      onEdit && packageDetails && onEdit(packageDetails._id);
      
    }
    setConfirm(clearConfirm);
  };
  
  const handleCancel = () => {
    setConfirm(clearConfirm);
  };

  return (
    <Card className='package-card-container'>
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        <Card.Text>
          ${cost}.00 
          <br/>
          {description}
        </Card.Text>
      </Card.Body>
      <div className='package-card-actions'>
        {onSelect && <Button onClick={() => onSelect(props.packageDetails)}>Select</Button>}
        {onEdit && <Button onClick={() => {setConfirm({show: true, message: 'Are you sure you want to edit this package?', action: 'EDIT'})}}>Edit</Button>}
        {onDelete && <Button variant='danger' onClick={()=>{setConfirm({show: true, message: 'Are you sure you want to delete this package?', action: 'DELETE'})}}>Delete</Button>}
      </div>
      {confirm.show && <ConfirmAlert variant={confirm.action} show={confirm.show} onCancel={handleCancel} onConfirm={handleConfirm} message={confirm.message}/>}
    </Card>
  );
};

export default PackageCard;

export interface PackageCardProps {
  packageDetails: IPackage;
  onSelect?: Function;
  onEdit?: Function;
  onDelete?: Function;
};
