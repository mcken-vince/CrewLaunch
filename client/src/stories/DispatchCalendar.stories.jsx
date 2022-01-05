import DispatchCalendar from "../components/DispatchCalendar";
import { localJobs, sampleState } from "../tests/sampleData";

export default {
  title: 'Dispatch/DispatchCalendar',
  component: DispatchCalendar
};

const Template = (args) => <DispatchCalendar {...args} />;

export const Calendar = Template.bind({});

Calendar.args = {
  jobs: localJobs,
  crews: sampleState.crews,
  assignJobtoCrew: () => {},
  markJobComplete: () => {}
};
