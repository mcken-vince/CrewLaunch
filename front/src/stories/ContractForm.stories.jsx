import ContractForm from "../components/ContractForm";

export default {
  title: 'Dispatch/ContractForm',
  component: ContractForm
};

const Template = (args) => <ContractForm {...args} />;

export const EmptyForm = Template.bind({});
EmptyForm.args = {
  packages: [
    {
      title: 'Lawn Care Silver',
      description: '3 Month, Biweekly: Mow, edge trim, blow off pathways',
      cost: 5000,
      contract_length_days: 90,
      visit_interval_days: 14,
      man_hrs_per_visit: 4
    },
    {  
      title: 'Lawn Care Gold',
      description: 'Two week, Daily: Mow, edge trim, blow off pathways',
      cost: 5000,
      contract_length_days: 14,
      visit_interval_days: 1,
      man_hrs_per_visit: 5
    }
  ]
}

