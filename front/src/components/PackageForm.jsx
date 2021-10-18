import '../styles/PackageForm.scss';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup';
import Alert from 'react-bootstrap/Alert';
import { useState } from 'react';

const PackageForm = (props) => {
  const { onSubmit } = props;
  const [title, setTitle] = useState(props.editPackage && props.editPackage.title ? props.editPackage.title : '');
  const [description, setDescription] = useState(props.editPackage && props.editPackage.description ? props.editPackage.description : '');
  const [cost, setCost] = useState(props.editPackage && props.editPackage.cost ? props.editPackage.cost : null);
  const [interval, setInterval] = useState(props.editPackage && props.editPackage.interval ? props.editPackage.interval : null);
  const [timeEst, setTimeEst] = useState(props.editPackage && props.editPackage.timeEst ? props.editPackage.timeEst : null);
  const [length, setLength] = useState(props.editPackage && props.editPackage.contractLength ? props.editPackage.contractLength : null);
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState({error: false, success: false});

  const formFilled = title && cost && interval && timeEst && length;

  const validate = () => {
    if (formFilled) {
      setLoading(true);
      setAlert(false);
      
      const newPackage = {
        title,
        description,
        cost,
        visit_interval_days: interval,
        contract_length_days: length,
        man_hrs_per_visit: timeEst
      };
      onSubmit(newPackage)
      .then(result => {
        setAlert({error: false, success: true});
      })
      .then(result => {
        setLoading(false);
        setTitle(''); setDescription(''); setCost(null); setInterval(null); setTimeEst(null); setLength(null);
      })
      .catch(err => {
        setAlert({error: true, success: false});
      })
    }
  };

  return (
  <div className='package-form-container'>
    <h1 className='package-form-title'>Package Form</h1>
    {alert.success && <Alert className='package-form-alert' variant='success'>Great success!</Alert>}
    {alert.error && <Alert className='package-form-alert'variant='danger'>Error: Your request could not be completed. Please try again.</Alert>}
    <Form className='package-form'>
      <Form.Group className='mb-3' controlId='packageFormTitle'>
        <Form.Label>Title:</Form.Label>
        <Form.Control type='text' value={title} onChange={(e) => setTitle(e.target.value)} placeholder='Enter package title'/>
      </Form.Group>

      <Form.Group className='mb-3' controlId='packageFormDescription'>
        <Form.Label>Description:</Form.Label>
        <Form.Control as='textarea' value={description} onChange={(e) => setDescription(e.target.value)} placeholder='Enter description' /> 
      </Form.Group>

      <Form.Label>Cost:</Form.Label>
      <InputGroup className='mb-3'>
          <InputGroup.Text>$</InputGroup.Text>
          <Form.Control type='text' value={cost} onChange={(e) => setCost(e.target.value)} placeholder='Enter package cost' /> 
      </InputGroup>     

      <Form.Label>Visit Interval:</Form.Label>
      <InputGroup className='mb-3'>
        <Form.Control type='text' value={interval} onChange={(e) => setInterval(e.target.value)} placeholder='Enter visit interval in days' /> 
        <InputGroup.Text>days</InputGroup.Text>
      </InputGroup>

      <Form.Label>Contract Length:</Form.Label>
      <InputGroup className='mb-3'>
        <Form.Control type='text' value={length} onChange={(e) => setLength(e.target.value)} placeholder='Enter length in days' /> 
        <InputGroup.Text>days</InputGroup.Text>
      </InputGroup>

      <Form.Label>Time Estimate:</Form.Label>
      <InputGroup className='mb-3'>
        <Form.Control type='text' value={timeEst} onChange={(e) => setTimeEst(e.target.value)} placeholder='Enter estimated man hrs per visit' /> 
        <InputGroup.Text>hours</InputGroup.Text>
      </InputGroup>
      
      <Button disabled={!loading && !formFilled} type="submit" onClick={validate}>Submit</Button>
    
    
    </Form>
  </div>
  );
};

export default PackageForm;