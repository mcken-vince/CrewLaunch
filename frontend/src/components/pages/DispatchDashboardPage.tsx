import { FC, ReactElement } from 'react';
import { IState } from '../../definitions';
import '../../styles/DispatchDashboardPage.scss';
import DispatchCalendar from '../DispatchCalendar';
import DispatchNav from '../DispatchNav';
import { getJobsWithDetails } from '../../helpers/dataCombiners';

const DispatchDashboardPage: FC<any> = (props): ReactElement => {
  const state: IState = props.state;

  const detailedJobs = state.jobs ? getJobsWithDetails(state.jobs, state.contracts, state.packages) : [];
  return (
    <>
      <DispatchNav user={{name: 'Testy Tester', email: 'testy.testerforce@mail.com', password: 'secretpassword' }}/>
      <div className='dispatch-dashboard-container'> 
        <DispatchCalendar jobs={detailedJobs}/>
      </div>
    </>
  );
};

export default DispatchDashboardPage;