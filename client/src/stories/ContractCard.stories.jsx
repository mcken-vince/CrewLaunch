import ContractCard from "../components/ContractCard";
import { localContracts } from "../tests/sampleData";

export default {
  title: 'CrewLauncher/ContractCard',
  component: ContractCard
};

const Template = (args) => <ContractCard {...args}/>;

export const Undeletable = Template.bind({});
Undeletable.args = {
  contract: localContracts[0]
};

export const Deletable = Template.bind({});
Deletable.args = {
  contract: localContracts[0],
  onDelete: () => {}
};