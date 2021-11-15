import '../../styles/ContractForm.scss';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup';
import Alert from 'react-bootstrap/Alert';
import Spinner from 'react-bootstrap/Spinner'
import addDays from 'date-fns/addDays';
import { EventHandler, FC, ReactElement, useState } from 'react';
import DateRangePicker from '../DateRangePicker';
import PackagesOffcanvas from '../PackagesOffcanvas';
import { ContractFormProps, } from '../component-types';
import { IPackage } from '../../definitions';

const ContractForm: FC<ContractFormProps> = (props): ReactElement  => {
  // empty skeleton to satisfy typescript compiler
  const packageSkeleton = {title: '', cost: 0, visit_interval_days: 0, man_hrs_per_visit: 0, contract_length_days: 0};
  const clientSkeleton = {name: '', email: '', phone: ''};
  const [packagesShow, setPackagesShow] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState(props.editContract && props.editContract.selectedPackage ? props.editContract.selectedPackage : packageSkeleton);
  const [client, setClient] = useState<IClientLocal>(props.editContract && props.editContract.client ? props.editContract.client : clientSkeleton);
  const [address, setAddress] = useState(props.editContract && props.editContract.address ? props.editContract.address : '');
  const [startDate, setStartDate] = useState(props.editContract && props.editContract.start_date ? props.editContract.start_date : new Date());
  const [endDate, setEndDate] = useState(props.editContract && props.editContract.start_date ? addDays(new Date(props.editContract.start_date), selectedPackage.contract_length_days - 1) : new Date());
  const [jobNotes, setJobNotes] = useState(props.editContract && props.editContract.jobNotes ? props.editContract.jobNotes : '');
  const [loading, setLoading] = useState(false);
  const clearAlert = {error: false, success: false};
  const [alert, setAlert] = useState(clearAlert);
  const { packages, onSubmit } = props;

  // is true if all required fields are not empty
  const formFilled: boolean = (selectedPackage && client.name && client.email && address && startDate) ? true : false;

  const handleDateChange: EventHandler<any> = (date: any):void => {
    setStartDate(new Date(date[0]));
    setEndDate(new Date(addDays(new Date(date[0]), selectedPackage.contract_length_days - 1)));
  };

  const handlePackageSelect = (packageDetails: IPackage) => {
    setSelectedPackage(packageDetails); 
    setPackagesShow(false);
  };

  const validate:React.MouseEventHandler<HTMLButtonElement> = async (event) => {
    event.preventDefault();
    if (formFilled) {
      setLoading(true);
      setAlert(clearAlert);
      try {
        const newContract = {
          selectedPackage,
          client,
          address,
          start_date: new Date(startDate),
          job_notes: jobNotes
        };
        await onSubmit(newContract)
        setAlert({error: false, success: true});
        setLoading(false);
        setSelectedPackage(packageSkeleton); setClient(clientSkeleton); setAddress(''); setStartDate(new Date()); setJobNotes('');
      } catch {
        setAlert({error: true, success: false});
      };
    };
  };

  return (
    <>
      <PackagesOffcanvas show={packagesShow} handleClose={():void => setPackagesShow(false)} packages={packages} selectPackage={handlePackageSelect} />
      <div className='contract-form-container'>
        <h1 className='contract-form-title'>Contract Form</h1>
        {alert.success && <Alert className='contract-form-alert' variant='success'>Great success!</Alert>}
        {alert.error && <Alert className='contract-form-alert'variant='danger'>Error: Your request could not be completed. Please try again.</Alert>}
        <Form className='contract-form'>
          <Form.Label>Client Information:</Form.Label>
          <InputGroup className='mb-3 client-information'>
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

          <Button className='contract-form-submit form-submit' disabled={!loading && !formFilled} type='submit' onClick={validate}>
            {loading ? <Spinner animation='border' variant='primary'/> : 'Submit'}
          </Button>
            
        </Form>
      </div>
    </>
  );
};

export default ContractForm;

interface IClientLocal {
  name: string,
  email: string,
  phone?: string,
};