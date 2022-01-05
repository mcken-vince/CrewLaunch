import ContractsPage from "../components/pages/ContractsPage";
import { localContracts } from "../tests/sampleData";

export default {
  title: 'Pages/Contracts',
  component: ContractsPage
};

const Template = (args) => <ContractsPage {...args}/>;

export const Default = Template.bind({});
Default.args = {
  contracts: localContracts,
  onDelete: () => {}
};