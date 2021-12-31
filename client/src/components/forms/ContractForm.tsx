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
import { IClient, IPackage, IContractLocal } from '../../definitions';
import { useParams } from 'react-router';

const ContractForm: FC<ContractFormProps> = (props): ReactElement  => {
  const params: {id?: string, client_id?: string} = useParams();
  const editContract = params.id && props.contracts.filter(c => c._id.toString() === params.id)[0];
  // empty skeleton to satisfy typescript compiler
  const packageSkeleton = {title: '', cost: 0, visit_interval_days: 0, man_hrs_per_visit: 0, contract_length_days: 0, _id: ''};
  const clientSkeleton = {name: '', email: '', phone: ''};
  const generateFromClient = params.client_id ? props.clients.filter(c => c._id.toString() === params.client_id)[0] : clientSkeleton;
  const [packagesShow, setPackagesShow] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState(editContract && editContract.selectedPackage ? editContract.selectedPackage : packageSkeleton);
  const [client, setClient] = useState<IClientLocal>(editContract && editContract.client ? editContract.client : generateFromClient);
  const [address, setAddress] = useState(editContract && editContract.address ? editContract.address : '');
  const [startDate, setStartDate] = useState(editContract && editContract.start_date ? editContract.start_date : new Date());
  const [endDate, setEndDate] = useState(editContract && editContract.start_date ? addDays(new Date(editContract.start_date), selectedPackage.contract_length_days - 1) : new Date());
  const [jobNotes, setJobNotes] = useState(editContract && editContract.jobNotes ? editContract.jobNotes : '');
  const [loading, setLoading] = useState(false);
  const clearAlert = {error: false, success: false};
  const [alert, setAlert] = useState(clearAlert);
  const { packages, onSubmit } = props;

  // is true if all required fields are not empty
  const formFilled: boolean = (selectedPackage && client.name && client.email && address && startDate && jobNotes) ? true : false;

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
          _id: params.id,
          package_id: selectedPackage._id,
          selectedPackage: selectedPackage,
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
            <Button className='select-package-button' disabled={loading} data-testid='selectPackage-button' onClick={():void => setPackagesShow(true)}>Select Package</Button>
          </InputGroup>

          {selectedPackage && 
          <>
            <Form.Label>Select Contract Start Date:</Form.Label>
            <div data-testid='date-picker'>
              <DateRangePicker startDate={new Date(startDate)} endDate={new Date(endDate)} onChange={handleDateChange} inheritClassName='contract-form-daterangepicker'/>
            </div>
          </>}
          <Form.Group className='mb-3' controlId='contractFormJobNotes'>
            <Form.Label>Job Notes:</Form.Label>
            <Form.Control disabled={loading} type='textarea' value={jobNotes} onChange={(e):void => setJobNotes(e.target.value)} placeholder='Enter relevant job notes here.' />
          </Form.Group>
          <Button className='contract-form-submit form-submit' disabled={!loading && !formFilled ? true : false} type='submit' data-testid='submit-button' onClick={validate}>
            {loading ? <Spinner animation='border' variant='primary'/> : 'Submit'}
          </Button>
            
        </Form>
      </div>
    </>
  );
};

export default ContractForm;

export interface ContractFormProps {
  packages: IPackage[];
  contracts: IContractLocal[];
  clients: IClient[];
  onSubmit: Function;
};

export interface IClientLocal {
  name: string,
  email: string,
  phone?: string,
};
