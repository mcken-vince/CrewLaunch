import '../styles/ContractForm.scss';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup';
import Alert from 'react-bootstrap/Alert';
import format from 'date-fns/format';
import addDays from 'date-fns/addDays';
import { useState } from 'react';
import DateRangePicker from './DateRangePicker';

const ContractForm = (props) => {
  const { onSubmit } = props;
  const [selectedPackage, setSelectedPackage] = useState(props.editContract && props.editContract.selectedPackage ? props.editContract.selectedPackage : null);
  const [client, setClient] = useState(props.editContract && props.editContract.client ? props.editContract.client : {name: '', email: '', phone: ''});
  const [address, setAddress] = useState(props.editContract && props.editContract.address ? props.editContract.address : '');
  const [startDate, setStartDate] = useState(props.editContract && props.editContract.startDate ? props.editContract.startDate : new Date());
  const [endDate, setEndDate] = useState(props.editContract && props.editContract.startDate ? addDays(new Date(props.editContract.startDate), selectedPackage.contract_length_days - 1) : new Date());
  const [jobNotes, setJobNotes] = useState(props.editContract && props.editContract.jobNotes ? props.editContract.jobNotes : '');
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState({error: false, success: false});

  // is true if all required fields are not empty
  const formFilled = selectedPackage && client.name && client.email && address && startDate;

  const handleDateChange = (date) => {
    setStartDate(date);
    setEndDate(selectedPackage ? addDays(date, selectedPackage.contract_length_days - 1) : date);
  };

  const openPackages = () => {

  };

  const validate = () => {
    if (formFilled) {
      setLoading(true);
      setAlert(false);
      

      const newContract = {
        selectedPackage,
        thisClient: client,
        address,
        start_date: startDate,
        job_notes: jobNotes
      };
      onSubmit(newContract)
      .then(result => {
        setAlert({error: false, success: true});
      })
      .then(result => {
        setLoading(false);
        // clear inputs
        setSelectedPackage(null); setClient({name: '', email: '', phone: ''}); setAddress(''); setStartDate(new Date()); setJobNotes('');
      })
      .catch(err => {
        setAlert({error: true, success: false});
      })
    }
  };

  return (
  <div className='contract-form-container'>
    <h1 className='contract-form-title'>Contract Form</h1>
    {alert.success && <Alert className='contract-form-alert' variant='success'>Great success!</Alert>}
    {alert.error && <Alert className='contract-form-alert'variant='danger'>Error: Your request could not be completed. Please try again.</Alert>}
    <Form className='contract-form'>
      <Form.Label>Client Information:</Form.Label>
      <InputGroup className='mb-3'>
        <Form.Control type='text' value={client.name} onChange={(e) => setClient(prev => ({...prev, name: e.target.value}))} placeholder='Enter name'/>
        <Form.Control type='email' value={client.email} onChange={(e) => setClient(prev => ({...prev, email: e.target.value}))} placeholder='Enter email'/>
        <Form.Control type='text' value={client.phone} onChange={(e) => setClient(prev => ({...prev, phone: e.target.value}))} placeholder='Enter phone #'/>
      </InputGroup>

      <Form.Group className='mb-3' controlId='contractFormAddress'>
        <Form.Label>Address:</Form.Label>
        <Form.Control type='text' value={address} onChange={(e) => setAddress(e.target.value)} placeholder='Enter address' /> 
      </Form.Group>
      
      <InputGroup className='mb-3'>
        <Form.Control type='text' readOnly={true} value={selectedPackage ? selectedPackage.title : 'Please select a package'} />
        <Button onClick={openPackages}>Select Package</Button>
      </InputGroup>

      {selectedPackage && 
      <>
        <Form.Label>Select Contract Start Date:</Form.Label>
        <DateRangePicker startDate={new Date(startDate)} endDate={new Date(endDate)} onChange={handleDateChange} inheritClassName='contract-form-daterangepicker'/>
      </>}

      <Button disabled={!loading && !formFilled} type="submit" onClick={validate}>Submit</Button>

    </Form>
  </div>
  );
};

export default ContractForm;