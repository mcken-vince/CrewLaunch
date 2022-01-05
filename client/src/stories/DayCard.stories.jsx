import DayCard from '../components/DayCard';
import { formatDate } from '../helpers/dataFormatters';

export default {
  title: 'CrewLauncher/DayCard',
  component: DayCard
};

const Template = (args) => <DayCard {...args}/>;

export const EmptyDayCard = Template.bind({});
EmptyDayCard.args = {
  date: formatDate(new Date()),
  jobs: []
};

export const DayCardWithJobs = Template.bind({});
DayCardWithJobs.args = {
  date: formatDate(new Date()),
  jobs: [
    {address: '52 Yardwood Drive NW, Calgary AB', complete: false},
    {address: '712 Jerry Springer Road NW, Calgary AB', complete: false},
    {address: '1900 Terrace Way NE, Calgary AB', complete: true}
  ]
};