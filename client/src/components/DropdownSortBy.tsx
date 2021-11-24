import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import { useState } from 'react';

const DropdownSortBy = (props: DropdownSortByProps) => {
  const [sortBy, setSortBy] = useState<string>(props.items[0].name)

  const dropDownItems = props.items.map((i, idx) => {
    return (
      <Dropdown.Item 
        onClick={() => {
          i.onClick(i.name)
          setSortBy(i.name);
        }}
      >
          {i.name}
      </Dropdown.Item>
    );
  });

  return (
    <DropdownButton id='dropdown-button' title={`Sort By: ${sortBy}`}>
      {dropDownItems}
    </DropdownButton>
  );
};

export default DropdownSortBy;

export interface DropdownSortByProps {
  items: IItem[];
};

interface IItem {
  name: string;
  onClick: Function;
}
