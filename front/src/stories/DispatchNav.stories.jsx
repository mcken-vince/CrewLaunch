import DispatchNav from "../components/DispatchNav";

export default {
  title: 'Dispatch/Navigation',
  component: DispatchNav,
};

const Template = (args) => <DispatchNav {...args} />;

export const LoggedOut = Template.bind({});

export const LoggedIn = Template.bind({});

LoggedIn.args= {
  user: {name: 'Abe', email: 'abe_rahama@mail.com'}
};
