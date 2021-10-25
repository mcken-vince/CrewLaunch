import { FC, ReactElement } from 'react';
import '../../styles/DispatchDashboardPage.scss';
import DispatchCalendar from '../DispatchCalendar';

const DispatchDashboardPage: FC<null> = (): ReactElement => {

  return (
    <>
      <h1>DispatchDashboardPage</h1>
      <DispatchCalendar />
    </>
  );
};

export default DispatchDashboardPage;