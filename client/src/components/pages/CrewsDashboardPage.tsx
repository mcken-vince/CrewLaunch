import { MouseEventHandler } from 'react';
import { IUser } from '../../definitions';
import useAppData from '../../hooks/useAppData';
import CrewsNav from '../CrewsNav';

const CrewsDashboardPage = (props: CrewsDashboardPageProps) => {
  const { onLogout, user } = props;
  const {state, updateState} = useAppData();
  
  return (<>
    <CrewsNav onLogout={onLogout} user={user}/>
    <h1>Crews Dashboard</h1>
  </>);
};

export default CrewsDashboardPage;

export interface CrewsDashboardPageProps {
  onLogout: MouseEventHandler<HTMLButtonElement>;
  user: IUser;
};