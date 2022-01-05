import { BrowserRouter } from "react-router-dom";
import DispatchDashboardPage from "../components/pages/DispatchDashboardPage";

export default {
  title: 'Pages/DispatchDashboard',
  component: DispatchDashboardPage
};

const Template = (args) => {
  return (
    <BrowserRouter>
      <DispatchDashboardPage {...args} />
    </BrowserRouter>
  );
};

export const PageView = Template.bind({});

PageView.args = {
  user: {name: 'Test Test', email: 'testy_testerson@mail.com', admin: false},
  onLogout: () => {}
}