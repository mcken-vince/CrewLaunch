import DayCard from '../components/DayCard';
import { format } from 'date-fns';

export default {
  title: 'CrewLauncher/DayCard',
  component: DayCard
};

const Template = (args) => <DayCard {...args}/>;

export const EmptyDayCard = Template.bind({});
EmptyDayCard.args = {
  date: format(new Date(), 'eeee MMMM dd, yyyy'),
  jobs: []
}

export const DayCardWithJobs = Template.bind({});
DayCardWithJobs.args = {
  date: format(new Date(), 'eeee MMMM dd, yyyy'),
  jobs: [
    {address: '52 Yardwood Drive NW, Calgary AB', complete: false},
    {address: '712 Jerry Springer Road NW, Calgary AB', complete: false},
    {address: '1900 Terrace Way NE, Calgary AB', complete: true}
  ]
}