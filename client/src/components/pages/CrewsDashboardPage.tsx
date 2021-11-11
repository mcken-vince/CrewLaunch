import { FC, ReactElement } from 'react';
import useAppData from '../../hooks/useAppData';


const CrewsDashboardPage: FC<null> = (): ReactElement => {
  const {state, updateState} = useAppData();
  return (
    <h1>Crews Dashboard</h1>
  );
};

export default CrewsDashboardPage;