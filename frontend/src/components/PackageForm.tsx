import '../styles/PackageForm.scss';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup';
import Alert from 'react-bootstrap/Alert';
import { ReactElement, FunctionComponent, useState } from 'react';
import { PackageFormProps } from './component-types';
import { IPackage } from '../definitions';

const PackageForm: FunctionComponent<PackageFormProps> = (props): ReactElement => {
  const { onSubmit } = props;
  const [title, setTitle] = useState(props.editPackage && props.editPackage.title ? props.editPackage.title : '');
  const [description, setDescription] = useState(props.editPackage && props.editPackage.description ? props.editPackage.description : '');
  const [cost, setCost] = useState(props.editPackage && props.editPackage.cost ? props.editPackage.cost : null);
  const [interval, setInterval] = useState(props.editPackage && props.editPackage.visit_interval_days ? props.editPackage.visit_interval_days : null);
  const [timeEst, setTimeEst] = useState(props.editPackage && props.editPackage.man_hrs_per_visit ? props.editPackage.man_hrs_per_visit : null);
  const [length, setLength] = useState(props.editPackage && props.editPackage.contract_length_days ? props.editPackage.contract_length_days : null);
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState({error: false, success: false});

  // is true if all required fields are not empty
  const formFilled = title && cost && interval && timeEst && length;

  const validate = () => {
    if (formFilled) {
      setLoading(true);
      setAlert({error: false, success: false});
      
      const newPackage: IPackage = {
        title,
        description,
        cost,
        visit_interval_days: interval,
        contract_length_days: length,
        man_hrs_per_visit: timeEst
      };
      onSubmit(newPackage)
      .then((result: any) => {
        setAlert({error: false, success: true});
        return result;
      })
      .then((result: any) => {
        setLoading(false);
        setTitle(''); setDescription(''); setCost(null); setInterval(null); setTimeEst(null); setLength(null);
      })
      .catch((err: any) => {
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
          <Form.Control type='text' value={cost ? cost.toString() : undefined} onChange={(e) => setCost(parseInt(e.target.value))} placeholder='Enter package cost' /> 
      </InputGroup>     

      <Form.Label>Visit Interval:</Form.Label>
      <InputGroup className='mb-3'>
        <Form.Control type='text' value={interval ? interval.toString() : undefined} onChange={(e) => setInterval(parseInt(e.target.value))} placeholder='Enter visit interval in days' /> 
        <InputGroup.Text>days</InputGroup.Text>
      </InputGroup>

      <Form.Label>Contract Length:</Form.Label>
      <InputGroup className='mb-3'>
        <Form.Control type='text' value={length ? length.toString() : undefined} onChange={(e) => setLength(parseInt(e.target.value))} placeholder='Enter length in days' /> 
        <InputGroup.Text>days</InputGroup.Text>
      </InputGroup>

      <Form.Label>Time Estimate:</Form.Label>
      <InputGroup className='mb-3'>
        <Form.Control type='text' value={timeEst ? timeEst.toString() : undefined} onChange={(e) => setTimeEst(parseInt(e.target.value))} placeholder='Enter estimated man hrs per visit' /> 
        <InputGroup.Text>hours</InputGroup.Text>
      </InputGroup>
      
      <Button disabled={!loading && !formFilled} type="submit" onClick={validate}>Submit</Button>
  
    </Form>
  </div>
  );
};

export default PackageForm;