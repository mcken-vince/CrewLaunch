import DispatchDashboardPage from "../components/pages/DispatchDashboardPage";

export default {
  title: 'Pages/DispatchDashboard',
  component: DispatchDashboardPage
};

const Template = (args) => <DispatchDashboardPage {...args} />;

export const PageView = Template.bind({});