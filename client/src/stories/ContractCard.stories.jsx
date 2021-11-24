import ContractCard from "../components/ContractCard";

export default {
  title: 'CrewLauncher/ContractCard',
  component: ContractCard
};

const Template = (args) => <ContractCard {...args}/>;

export const Default = Template.bind({});
Default.args = {
  contract: { 
    "_id": "61787c58efa37244e2c35c13",
    client: { "_id": "616f7ceea703ecd4ec419646", "name": "Gregory Peck", "email": "regreg@peck.com", "phone": "403-552-9094", "createdAt": "2021-10-20T02:20:30.796Z", "updatedAt": "2021-10-20T02:20:30.796Z", "__v": 0 },
    address: "177 Mornersome Drive SW, Calgary AB",
    jobNotes: "There are no notes. Nothing to see here.",
    selectedPackage: { "_id": "616f7ceea703ecd4ec419647", "title": "Lawn Care Silver", "cost": 5000, "contract_length_days": 90, "visit_interval_days": 14,"man_hrs_per_visit": 4, "description": "3 Month, Biweekly: Mow, edge trim, blow off pathways", "createdAt": "2021-10-20T02:20:30.796Z", "updatedAt": "2021-10-20T02:20:30.796Z", "__v": 0 },
    startDate: new Date("2021-10-28T06:00:00.000Z") }
};