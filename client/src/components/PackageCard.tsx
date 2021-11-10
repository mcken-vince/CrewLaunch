import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { IPackage } from '../definitions';
import { FC, ReactElement } from 'react';

const PackageCard: FC<PackageCardProps> = (props): ReactElement => {
  const { onSelect, packageDetails, onEdit, onDelete } = props;
  const { title, description, cost } = packageDetails;

  return (
    <Card className='package-card'>
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        <Card.Text>
          ${cost}.00 
          <br/>
          {description}
        </Card.Text>
        {onSelect && <Button onClick={() => onSelect(props.packageDetails)} >Select</Button>}
        { onEdit && <Button onClick={() => {onEdit(packageDetails._id)}}>Edit</Button>}
        { onDelete && <Button variant='danger' onClick={() => {onDelete(packageDetails._id)}}>Delete</Button>}
      </Card.Body>
    </Card>
  )
};

export default PackageCard;

interface PackageCardProps {
  packageDetails: IPackage;
  onSelect?: Function;
  onEdit?: Function;
  onDelete?: Function;
};