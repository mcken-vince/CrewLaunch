import React from 'react';
import DispatchNav from "../components/DispatchNav";

export default {
  title: 'Dispatch/Navigation',
  component: DispatchNav,
  // argTypes: {
  //   backgroundColor: { control: 'color' },
  // },
};

const Template = (args) => <DispatchNav {...args} />;

export const LoggedOut = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
LoggedOut.args = {
  label: 'DispatchNav',
};