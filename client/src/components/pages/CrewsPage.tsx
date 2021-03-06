import { FC, ReactElement, useState } from "react";
import { ICrew } from "../../definitions";
import '../../styles/CrewsPage.scss';
import CrewCard from "../CrewCard";
import CustomSearchBar from "../CustomSearchBar";
import { IAlert } from "../../definitions";
import { Alert } from "react-bootstrap";
import classNames from "classnames";

const CrewsPage: FC<CrewsPageProps> = (props): ReactElement => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [alert, setAlert] = useState<IAlert>({show: false, type: true, message: ''});
  const { crews, onDelete } = props;

  const handleDelete = async (id: string) => {
    try {
      const result: {type: boolean, message: string} = await onDelete(id);
      console.log('result: ', result);
      setAlert({show: true, type: result.type, message: result.message});
    } catch (err: any) {
      setAlert({show: true, type: false, message: `Internal Error: ${err.message}`});
    }
  };
  const lcSearchTerm: string = searchTerm.toLowerCase();
  const filteredCrews = searchTerm ? crews.filter(c => {
    return (
      c.foreman_name.toLowerCase().includes(lcSearchTerm) ||
      c.crew_size.toString().includes(lcSearchTerm)
    );
  }) : crews;

  const crewCards = filteredCrews.map((c, idx) => {
    return <CrewCard crew={c} key={idx} jobs={[]} onDelete={handleDelete}/>;
  }).reverse();

  const alertVariant = classNames({'success': alert.type, 'danger': !alert.type});

  return (
    <div className='crews-container'>
      <h1>Crews: {filteredCrews.length}/{crews.length}</h1>
      <Alert dismissible show={alert.show} variant={alertVariant} onClose={() => setAlert({show: false, type: true, message: ''})}>
        <Alert.Heading>{alert.message}</Alert.Heading>
      </Alert>
      <div className='crews-search search'>
        <CustomSearchBar value={searchTerm} onChange={setSearchTerm} placeholder='Search by name or crew size'/>
        {
          crewCards && crewCards.length > 0 ? 
          crewCards : <h2>No matching crews found.</h2>
        }
      </div>
    </div>
  );
};

export default CrewsPage;

export interface CrewsPageProps {
  crews: ICrew[];
  onDelete: any;
};