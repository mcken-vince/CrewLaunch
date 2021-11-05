import { FC, ReactElement, useState } from "react";
import { Alert, Form, InputGroup, Button } from "react-bootstrap";
import '../../styles/CrewForm.scss';
import { ICrew } from "../../definitions";


const CrewForm: FC<CrewFormProps> = (props): ReactElement => {
  const { onSubmit } = props;
  const [foremanName, setForemanName] = useState(props.editCrew && props.editCrew.foreman_name ? props.editCrew.foreman_name : '');
  const [crewSize, setCrewSize] = useState(props.editCrew && props.editCrew.crew_size ? props.editCrew.crew_size : 1);
  const [avatar, setAvatar] = useState(props.editCrew && props.editCrew.avatar ? props.editCrew.avatar : '');
  const [isActive, setIsActive] = useState<boolean>(props.editCrew && props.editCrew.is_active ? props.editCrew.is_active : true);
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState({error: false, success: false});

  // is true if all required fields are not empty
  const formFilled = foremanName && crewSize;

  const validate = () => {
    if (formFilled) {
      setLoading(true);
      setAlert({error: false, success: false});
      
      const newCrew: ICrew = {
        avatar,
        foreman_name: foremanName,
        crew_size: crewSize,
        is_active: isActive
      };
      onSubmit(newCrew)
      .then((result: any): void => {
        setAlert({error: false, success: true});
        return result;
      })
      .then((result: any): void => {
        setLoading(false);
        setForemanName(''); setCrewSize(0); setAvatar(''); setIsActive(false);
      })
      .catch((err: any): void => {
        setAlert({error: true, success: false});
      })
    }
  };

  return (
  <div className='crew-form-container'>
    <h1 className='crew-form-title'>Crew Form</h1>
    {alert.success && <Alert className='crew-form-alert' variant='success'>Great success!</Alert>}
    {alert.error && <Alert className='crew-form-alert'variant='danger'>Error: Your request could not be completed. Please try again.</Alert>}
    <Form className='crew-form'>
      <Form.Group className='mb-3' controlId='crewFormForemanName'>
        <Form.Label>Foreman:</Form.Label>
        <Form.Control type='text' value={foremanName} onChange={(e) => setForemanName(e.target.value)} placeholder='Enter name of foreman'/>
      </Form.Group>

      <Form.Group className='mb-3' controlId='crewFormCrewSize'>
        <Form.Label>Crew Size:</Form.Label>
        
        <Form.Select aria-label='crewsize' onChange={(e) => {setCrewSize(parseInt(e.currentTarget.value))}}>
          <option value="0">Select a number of workers</option>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
        </Form.Select>
    
      </Form.Group>

      <Form.Label>Avatar:</Form.Label>
      <InputGroup className='mb-3'>
          <InputGroup.Text>url</InputGroup.Text>
          <Form.Control type='text' value={avatar} onChange={(e) => setAvatar(e.target.value)} placeholder='Enter avatar url' /> 
      </InputGroup>     

      <Form.Label>Status:</Form.Label>
      <InputGroup className='mb-3'>
        <Form.Check type="checkbox" checked={isActive} onChange={(e) => setIsActive(prev => !prev)} label="Active crew" />
      </InputGroup>

      
      <Button disabled={!loading && !formFilled} type="submit" onClick={validate}>Submit</Button>
  
    </Form>
  </div>
  );
};

export default CrewForm;

interface CrewFormProps {
  onSubmit: Function;
  editCrew?: ICrew;
};