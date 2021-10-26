import { FC, ReactElement } from 'react';
import { IState } from '../../definitions';
import '../../styles/DispatchDashboardPage.scss';
import DispatchCalendar from '../DispatchCalendar';


const DispatchDashboardPage: FC<any> = (props): ReactElement => {
  const state: IState = props.state;

  return (
    <>
      <h1>DispatchDashboardPage</h1>
      <DispatchCalendar jobs={state.jobs}/>
    </>
  );
};

export default DispatchDashboardPage;