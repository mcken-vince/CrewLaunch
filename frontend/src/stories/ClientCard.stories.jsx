import ClientCard from '../components/ClientCard';

export default {
  title: 'CrewLauncher/ClientCard',
  component: ClientCard
};

const Template = (args) => <ClientCard {...args}/>;

export const StandardClientCard = Template.bind({});
StandardClientCard.args = {
  client: {
    name: 'Rosie Posie',
    email: 'rosanna.posanna@mail.com',
    phone: '403-992-1536'
  }
};