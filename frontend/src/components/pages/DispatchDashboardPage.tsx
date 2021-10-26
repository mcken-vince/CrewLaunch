import { FC, ReactElement } from 'react';
import { IState } from '../../definitions';
import '../../styles/DispatchDashboardPage.scss';
import DispatchCalendar from '../DispatchCalendar';
import { getJobsWithDetails } from '../../helpers/dataCombiners';

const DispatchDashboardPage: FC<any> = (props): ReactElement => {
  const state: IState = props.state;

  const detailedJobs = state.jobs ? getJobsWithDetails(state.jobs, state.contracts, state.packages) : [];
  return (
    <>
      <h1>DispatchDashboardPage</h1>
      <DispatchCalendar jobs={detailedJobs}/>
    </>
  );
};

export default DispatchDashboardPage;