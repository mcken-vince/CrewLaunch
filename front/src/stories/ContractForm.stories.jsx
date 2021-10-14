import ContractForm from "../components/ContractForm";

export default {
  title: 'Dispatch/ContractForm',
  component: ContractForm
};

const Template = (args) => <ContractForm {...args} />;

export const EmptyForm = Template.bind({});
