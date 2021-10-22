import JobCard from "../components/JobCard";
import { format } from 'date-fns';

export default {
  title: 'CrewLauncher/JobCard',
  component: JobCard
};

const Template = (args) => <JobCard {...args}/>;

export const IncompleteJob = Template.bind({});
IncompleteJob.args = {
  address: '121 Bowermere Crescent NW, Calgary AB',
  date: format(new Date(), 'EEEE MMMM dd, yyyy'),
  complete: false
};

export const CompleteJob = Template.bind({});
CompleteJob.args = {
  address: '121 Bowermere Crescent NW, Calgary AB',
  date: format(new Date(), 'EEEE MMMM dd, yyyy'),
  complete: true
};