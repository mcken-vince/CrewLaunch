import CrewsDashboardPage from "../components/pages/CrewsDashboardPage";

export default {
  title: 'Pages/CrewsDashboard',
  component: CrewsDashboardPage
};

const Template = (args) => <CrewsDashboardPage {...args} />;

export const PageView = Template.bind({});

PageView.args = {

};