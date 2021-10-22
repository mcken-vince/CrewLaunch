import DateRangePicker from "../components/DateRangePicker";

export default {
  title: 'CrewLauncher/DateRangePicker',
  component: DateRangePicker
};

const Template = (args) => <DateRangePicker {...args} />;

export const DefaultDateRangePicker = Template.bind({});

DefaultDateRangePicker.args = {
  startDate: new Date('October 1, 2021'),
  endDate: new Date('October 8, 2021'),
};