import '../styles/ContractForm.scss';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup';
import Alert from 'react-bootstrap/Alert';
import Spinner from 'react-bootstrap/Spinner'
import addDays from 'date-fns/addDays';
import { EventHandler, FC, ReactElement, useState } from 'react';
import DateRangePicker from './DateRangePicker';
import PackagesOffcanvas from './PackagesOffcanvas';
import { ContractFormProps } from './component-types';
import { IClient } from '../definitions';

const ContractForm: FC<ContractFormProps> = (props): ReactElement  => {
  const { packages, onSubmit } = props;
  // empty skeleton to satisfy typescript compiler
  const packageSkeleton = {title: '', cost: 0, visit_interval_days: 0, man_hrs_per_visit: 0, contract_length_days: 0};
  const clientSkeleton = {name: '', email: '', phone: ''};
  const [packagesShow, setPackagesShow] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState(props.editContract && props.editContract.selectedPackage ? props.editContract.selectedPackage : packageSkeleton);
  const [client, setClient] = useState<IClient>(props.editContract && props.editContract.client ? props.editContract.client : clientSkeleton);
  const [address, setAddress] = useState(props.editContract && props.editContract.address ? props.editContract.address : '');
  const [startDate, setStartDate] = useState(props.editContract && props.editContract.startDate ? props.editContract.startDate : new Date());
  const [endDate, setEndDate] = useState(props.editContract && props.editContract.startDate ? addDays(new Date(props.editContract.startDate), selectedPackage.contract_length_days - 1) : new Date());
  const [jobNotes, setJobNotes] = useState(props.editContract && props.editContract.jobNotes ? props.editContract.jobNotes : '');
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState({error: false, success: false});

  // is true if all required fields are not empty
  const formFilled: boolean = (selectedPackage && client.name && client.email && address && startDate) ? true : false;

  const handleDateChange:EventHandler<any> = (date: Date):void => {
    setStartDate(date);
    setEndDate(new Date(addDays(new Date(date), selectedPackage.contract_length_days - 1)));
  };

  const validate:React.MouseEventHandler<HTMLButtonElement> = ():void => {
    if (formFilled) {
      setLoading(true);
      setAlert({error: false, success: false});
      
      const newContract = {
        selectedPackage,
        thisClient: client,
        address,
        start_date: startDate,
        job_notes: jobNotes
      };
      onSubmit(newContract)
      .then(() => {
        setAlert({error: false, success: true});
      })
      .then(() => {
        setLoading(false);
        // clear inputs
        setSelectedPackage(packageSkeleton); setClient(clientSkeleton); setAddress(''); setStartDate(new Date()); setJobNotes('');
      })
      .catch(() => {
        setAlert({error: true, success: false});
      })
    }
  };

  return (
    <>
      <PackagesOffcanvas show={packagesShow} handleClose={():void => setPackagesShow(false)} packages={packages} selectPackage={setSelectedPackage} />
      <div className='contract-form-container'>
        <h1 className='contract-form-title'>Contract Form</h1>
        {alert.success && <Alert className='contract-form-alert' variant='success'>Great success!</Alert>}
        {alert.error && <Alert className='contract-form-alert'variant='danger'>Error: Your request could not be completed. Please try again.</Alert>}
        {loading && <Spinner animation='border' variant='primary' />}
        <Form className='contract-form'>
          <Form.Label>Client Information:</Form.Label>
          <InputGroup className='mb-3'>
            <Form.Control disabled={loading} type='text' value={client.name} onChange={(e):void => setClient(prev => ({...prev, name: e.target.value}))} placeholder='Enter name'/>
            <Form.Control disabled={loading} type='email' value={client.email} onChange={(e):void => setClient(prev => ({...prev, email: e.target.value}))} placeholder='Enter email'/>
            <Form.Control disabled={loading} type='text' value={client.phone} onChange={(e):void => setClient(prev => ({...prev, phone: e.target.value}))} placeholder='Enter phone #'/>
          </InputGroup>

          <Form.Group className='mb-3' controlId='contractFormAddress'>
            <Form.Label>Address:</Form.Label>
            <Form.Control disabled={loading} type='text' value={address} onChange={(e):void => setAddress(e.target.value)} placeholder='Enter address' /> 
          </Form.Group>
          
          <InputGroup className='mb-3'>
            <Form.Control disabled={loading} type='text' readOnly={true} value={selectedPackage && selectedPackage.title ? `${selectedPackage.title} - $${selectedPackage.cost} - ${selectedPackage.contract_length_days} days` : 'Please select a package'} />
            <Button disabled={loading} onClick={():void => setPackagesShow(true)}>Select Package</Button>
          </InputGroup>

          {selectedPackage && 
          <>
            <Form.Label>Select Contract Start Date:</Form.Label>
            <DateRangePicker startDate={new Date(startDate)} endDate={new Date(endDate)} onChange={handleDateChange} inheritClassName='contract-form-daterangepicker'/>
          </>}

          <Button disabled={!loading && !formFilled} type="submit" onClick={validate}>Submit</Button>
            
        </Form>
      </div>
    </>
  );
};

export default ContractForm;