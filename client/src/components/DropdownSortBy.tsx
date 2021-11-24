import Dropdown from 'react-bootstrap/Dropdown';
import Button from 'react-bootstrap/Button';

const DropdownSortBy = (props: DropdownSortByProps) => {

  return (
    <Dropdown as={Button}>
      <Dropdown.Toggle id='dropdown-button'>
        Sort By:
      </Dropdown.Toggle>
    </Dropdown>
  );
};

export default DropdownSortBy;

export interface DropdownSortByProps {
  
};