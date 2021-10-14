import PackageForm from "../components/PackageForm";

export default {
  title: 'Dispatch/PackageForm',
  component: PackageForm
};

const Template = (args) => <PackageForm {...args} />;

export const EmptyForm = Template.bind({});