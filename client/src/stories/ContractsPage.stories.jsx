import ContractsPage from "../components/pages/ContractsPage";

export default {
  title: 'Pages/Contracts',
  component: ContractsPage
};

const Template = (args) => <ContractsPage {...args}/>;

export const Default = Template.bind({});
Default.args = {
  contracts: [ { "_id": "61787c58efa37244e2c35c13", "client_id": "616f7ceea703ecd4ec419646", "address": "177 Mornersome Drive SW, Calgary AB", "job_notes": "There are no notes. Nothing to see here.", "package_id": "616f7ceea703ecd4ec419647", "start_date": "2021-10-28T06:00:00.000Z" } ]
};