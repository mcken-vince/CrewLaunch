import '../../styles/PackageForm.scss';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup';
import Alert from 'react-bootstrap/Alert';
import React, { ReactElement, FC, useState } from 'react';
import { IPackage } from '../../definitions';
import Spinner from 'react-bootstrap/Spinner';

const PackageForm: FC<PackageFormProps> = (props): ReactElement => {
  const [title, setTitle] = useState(props.editPackage && props.editPackage.title ? props.editPackage.title : '');
  const [description, setDescription] = useState(props.editPackage && props.editPackage.description ? props.editPackage.description : '');
  const [cost, setCost] = useState(props.editPackage && props.editPackage.cost ? props.editPackage.cost : null);
  const [interval, setInterval] = useState(props.editPackage && props.editPackage.visit_interval_days ? props.editPackage.visit_interval_days : null);
  const [timeEst, setTimeEst] = useState(props.editPackage && props.editPackage.man_hrs_per_visit ? props.editPackage.man_hrs_per_visit : null);
  const [length, setLength] = useState(props.editPackage && props.editPackage.contract_length_days ? props.editPackage.contract_length_days : null);
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState({error: false, success: false});
  const { onSubmit } = props;

  // Will be true if all required fields are filled
  const formFilled = title && cost && interval && timeEst && length;

  const validate: React.MouseEventHandler<HTMLButtonElement> = async (event) => {
    event.preventDefault();
    if (formFilled) {
      setLoading(true);
      setAlert({error: false, success: false});
      try {
        const newPackage: IPackage = {
          title,
          description,
          cost,
          visit_interval_days: interval,
          contract_length_days: length,
          man_hrs_per_visit: timeEst
        };
        await onSubmit(newPackage);
        setAlert({error: false, success: true});
        setLoading(false);
        setTitle(''); setDescription(''); setCost(null); setInterval(null); setTimeEst(null); setLength(null);
      } catch {
        setAlert({error: true, success: false});
      };
    };
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
          <Form.Control type='text' value={cost ? cost.toString() : ''} onChange={(e) => setCost(parseInt(e.target.value))} placeholder='Enter package cost' /> 
      </InputGroup>     

      <Form.Label>Visit Interval:</Form.Label>
      <InputGroup className='mb-3'>
        <Form.Control type='text' value={interval ? interval.toString() : ''} onChange={(e) => setInterval(parseInt(e.target.value))} placeholder='Enter visit interval in days' /> 
        <InputGroup.Text>days</InputGroup.Text>
      </InputGroup>

      <Form.Label>Contract Length:</Form.Label>
      <InputGroup className='mb-3'>
        <Form.Control type='text' value={length ? length.toString() : ''} onChange={(e) => setLength(parseInt(e.target.value))} placeholder='Enter length in days' /> 
        <InputGroup.Text>days</InputGroup.Text>
      </InputGroup>

      <Form.Label>Time Estimate:</Form.Label>
      <InputGroup className='mb-3'>
        <Form.Control type='text' value={timeEst ? timeEst.toString() : ''} onChange={(e) => setTimeEst(parseInt(e.target.value))} placeholder='Enter estimated man hrs per visit' /> 
        <InputGroup.Text>hours</InputGroup.Text>
      </InputGroup>
      
      <Button className='package-form-submit' disabled={!loading && !formFilled} type="submit" onClick={validate}>
        {loading ? <Spinner animation='border' variant='primary' /> : 'Submit'}
      </Button>
  
    </Form>
  </div>
  );
};

export default PackageForm;

export interface PackageFormProps {
  onSubmit: Function;
  editPackage: IPackage | null;
};