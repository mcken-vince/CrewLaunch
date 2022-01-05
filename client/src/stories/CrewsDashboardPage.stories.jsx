import { BrowserRouter } from "react-router-dom";
import CrewsDashboardPage from "../components/pages/CrewsDashboardPage";

export default {
  title: 'Pages/CrewsDashboard',
  component: CrewsDashboardPage
};

const Template = (args) => {
  return (
    <BrowserRouter>
      <CrewsDashboardPage {...args} />
    </BrowserRouter>
  );
};

export const PageView = Template.bind({});

PageView.args = {
  onLogout: () => {},
  user: {name: 'Test Test', email: 'testy_testerson@mail.com', admin: false}
};