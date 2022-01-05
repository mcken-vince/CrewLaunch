import { BrowserRouter } from 'react-router-dom';
import ClientCard from '../components/ClientCard';
import { localContracts, localClients } from '../tests/sampleData';


export default {
  title: 'CrewLauncher/ClientCard',
  component: ClientCard
};

const Template = (args) => {
  return (
    <BrowserRouter>
      <ClientCard {...args}/>
    </BrowserRouter>
  );
};

export const StandardClientCard = Template.bind({});
StandardClientCard.args = {
  client: localClients[0],
  contracts: localContracts
};