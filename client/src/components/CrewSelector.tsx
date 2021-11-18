import { ICrew } from "../definitions";
import Dropdown from "react-bootstrap/Dropdown";
import '../styles/CrewSelector.scss';
import { Image } from "react-bootstrap";

const CrewSelector = (props: CrewSelectorProps) => {
  const { crews, onSelect, selectedCrew } = props;

  const crewItems = crews.map(c => {
    return (
      <Dropdown.Item onClick={() => onSelect(c)}>
        <Image className='crew-image' src={c.avatar} alt={c.foreman_name + "'s avatar"} />
        <p>{c.foreman_name} - {c.crew_size} workers</p>
      </Dropdown.Item>);
  });

  return (
    <div className='crew-selector'>
      <Dropdown>
        <Dropdown.Toggle>{selectedCrew ? 'Change crew' : 'Select a crew'}</Dropdown.Toggle>
        <Dropdown.Menu>
          <Dropdown.Item onClick={() => onSelect({_id: undefined})}>
            <p>Reset crew field</p>
          </Dropdown.Item>
          {crewItems}
        </Dropdown.Menu>
      </Dropdown>
    </div>
  );
};

export default CrewSelector;

interface CrewSelectorProps {
  crews: ICrew[];
  onSelect: Function;
  selectedCrew: ICrew | null;
}