import '../styles/PackageForm.scss';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useState } from 'react';

const PackageForm = (props) => {
  const { onSubmit } = props;
  const [title, setTitle] = useState(props.title ? props.title : '');
  const [description, setDescription] = useState(props.description ? props.description : '');
  const [cost, setCost] = useState(props.cost ? props.cost : null);

  return (
  <div className='package-form-container'>
    <h1 className='package-form-title'>Package Form</h1>
    
    <Form className='package-form'>
      <Form.Group className='mb-3' controlId='packageFormTitle'>
        <Form.Label>Title:</Form.Label>
        <Form.Control type='text' value={title} onChange={(e) => setTitle(e.target.value)} placeholder='Enter package title'/>
      </Form.Group>

      <Form.Group className='mb-3' controlId='packageFormDescription'>
        <Form.Label>Description:</Form.Label>
        <Form.Control as='textarea' value={description} onChange={(e) => setDescription(e.target.value)} placeholder='Enter description' /> 
      </Form.Group>

      <Form.Group className='mb-3' controlId='packageFormCost'>
        <Form.Label>Cost:</Form.Label>
        <Form.Control type='text' value={cost} onChange={(e) => setCost(e.target.value)} placeholder='Enter package cost' /> 
      </Form.Group>     

      <Form.Group className='mb-3' controlId='packageFormInterval'>
        <Form.Label>Visit Interval:</Form.Label>
        <Form.Control type='text' placeholder='Enter visit interval in days' /> 
      </Form.Group>

      <Form.Group className='mb-3' controlId='packageFormTimeEst'>
        <Form.Label>Time Estimate:</Form.Label>
        <Form.Control type='text' placeholder='Enter estimated man hrs per visit' /> 
      </Form.Group>

      <Form.Group className='mb-3' controlId='packageFormContractLen'>
        <Form.Label>Contract Length:</Form.Label>
        <Form.Control type='text' placeholder='Enter length in days' /> 
      </Form.Group>
      
      <Button disabled={true} type="submit" onClick={onSubmit}>Submit</Button>
    
    
    </Form>
  </div>
  );
};

export default PackageForm;