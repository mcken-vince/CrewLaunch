import { BrowserRouter } from "react-router-dom";
import DispatchNav from "../components/DispatchNav";

export default {
  title: 'Dispatch/Navigation',
  component: DispatchNav,
};

const Template = (args) => {

  return (
    <BrowserRouter>
      <DispatchNav {...args} />
    </BrowserRouter>
  );
};

export const LoggedOut = Template.bind({});

export const LoggedIn = Template.bind({});

LoggedIn.args = {
  user: {name: 'Test Test', email: 'testy_testerson@mail.com'}
};
