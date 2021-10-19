import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

const PackageCard = (props) => {
  const { onSelect } = props;
  const { title, description, cost } = props.packageDetails;

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