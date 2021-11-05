import PackageForm from "../components/forms/PackageForm";

export default {
  title: 'Dispatch/PackageForm',
  component: PackageForm
};

const Template = (args) => <PackageForm {...args} />;

export const EmptyForm = Template.bind({});

export const EditForm = Template.bind({});

EditForm.args = {
  editPackage: {
    title: 'Sweet Lawn Care',
    description: 'Mow, edge trim, and we will blow your leaves all over the place!',
    cost: 5000,
    interval: 7,
    contractLength: 30,
    timeEst: 3
  },
  onSubmit: ()=> new Promise((res, rej) => res('yay'))
};