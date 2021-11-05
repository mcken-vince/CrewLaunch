import { FC, ReactElement } from "react";
import { ICrew } from "../../definitions";


const CrewsPage: FC<CrewsPageProps> = (props): ReactElement => {
  const crews = props.crews;

  return (
    <div className='crews-container'>
      <h1>Crews: {crews.length}</h1>
    </div>
  );
};

export default CrewsPage;

interface CrewsPageProps {
  crews: ICrew[];
};