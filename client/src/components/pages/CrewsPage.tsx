import { FC, ReactElement, useState } from "react";
import { ICrew } from "../../definitions";
import '../../styles/CrewsPage.scss';
import CrewCard from "../CrewCard";
import CustomSearchBar from "../CustomSearchBar";

const CrewsPage: FC<CrewsPageProps> = (props): ReactElement => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const { crews, onDelete } = props;

  const filteredCrews = searchTerm ? crews.filter(c => {
    return c.foreman_name.toLowerCase().includes(searchTerm.toLowerCase());
  }) : crews;

  const crewCards = filteredCrews.map((c, idx) => {
    return <CrewCard crew={c} key={idx} jobs={[]} onDelete={onDelete}/>;
  }).reverse();

  return (
    <div className='crews-container'>
      <h1>Crews: {crews.length}</h1>
      <CustomSearchBar value={searchTerm} onChange={setSearchTerm} placeholder='Search by foreman name'/>
      {crewCards}
    </div>
  );
};

export default CrewsPage;

interface CrewsPageProps {
  crews: ICrew[];
  onDelete: Function;
};