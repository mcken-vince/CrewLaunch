import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import { FC, ReactElement } from 'react';

const CustomSearchBar: FC<CustomSearchBarProps> = (props): ReactElement => {
  const { value, onChange, label, placeholder } = props;

  return (
    <InputGroup className='mb-3'>
      {label && <InputGroup.Text id='search'>{label}</InputGroup.Text>}
      <FormControl
        aria-describedby='search-term'
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </InputGroup>
  );
};

export default CustomSearchBar;

export interface CustomSearchBarProps {
  value: string;
  onChange: Function;
  label?: string;
  placeholder?: string;
};