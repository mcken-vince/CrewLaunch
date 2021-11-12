import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';
import '../styles/ConfirmAlert.scss';

export interface ConfirmAlertProps {
  show: boolean;
  message: String;
  onConfirm: (...args: any) => void;
  onCancel: (...args: any) => void;
  variant?: 'EDIT' | 'DELETE' | 'NONE';
  customClass?: String;
};

function ConfirmAlert(props: ConfirmAlertProps) {
  const { show, message, onConfirm, onCancel, variant } = props;
  let variantString = 'primary';
  
  if (variant === 'DELETE') {
    variantString = 'danger';
  }

  return (
      <Alert className='confirm-alert z-index-10' show={show} variant={variantString}>
        <div className="alert-body">
          <Alert.Heading>{message}</Alert.Heading>
          <div className='alert-actions'>  
          <Button onClick={onConfirm} variant={`outline-primary`}>
            Confirm
          </Button>
          <Button onClick={onCancel} variant="outline-danger">
            Cancel
          </Button>
          </div>
        </div>
      </Alert>
  );
};

export default ConfirmAlert;