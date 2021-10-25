import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { PackageCardProps } from './component-types';
import { FunctionComponent } from 'react';

const PackageCard: FunctionComponent<PackageCardProps> = (props: PackageCardProps) => {
  const { onSelect, packageDetails } = props;
  const { title, description, cost } = packageDetails;

  return (
    <Card>
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        <Card.Text>
          ${cost}.00 
          <br/>
          {description}
        </Card.Text>
        <Button onClick={() => onSelect(props.packageDetails)} >Select</Button>
      </Card.Body>
    </Card>
  )
};

export default PackageCard;