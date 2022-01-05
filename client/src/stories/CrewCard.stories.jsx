import { BrowserRouter } from "react-router-dom";
import CrewCard from "../components/CrewCard";

export default {
  title: 'Dispatch/CrewCard',
  component: CrewCard
};

const Template = (args) => {
  return (
    <BrowserRouter>
      <CrewCard {...args} />
    </BrowserRouter>
  );
}

export const WithNoJobs = Template.bind({});

WithNoJobs.args = {
  crew: {
    foreman_name: 'Andy Bandy',
    crew_size: 2,
    avatar: "https://avataaars.io/?avatarStyle=Transparent&topType=ShortHairShaggyMullet&accessoriesType=Wayfarers&hairColor=Brown&facialHairType=BeardLight&facialHairColor=BrownDark&clotheType=ShirtScoopNeck&clotheColor=Red&eyeType=Happy&eyebrowType=RaisedExcitedNatural&mouthType=Twinkle&skinColor=Pale'"
  }, 
  jobs: [],
  onDelete: () => {}
}

export const WithJobs = Template.bind({});

WithJobs.args = {
  crew: {
    foreman_name: 'Andy Bandy',
    crew_size: 2,
    avatar: "https://avataaars.io/?avatarStyle=Transparent&topType=ShortHairShaggyMullet&accessoriesType=Wayfarers&hairColor=Brown&facialHairType=BeardLight&facialHairColor=BrownDark&clotheType=ShirtScoopNeck&clotheColor=Red&eyeType=Happy&eyebrowType=RaisedExcitedNatural&mouthType=Twinkle&skinColor=Pale'"
  }, 
  jobs: [
    {
      address: '525 Yondervan Cres SW, Calgary AB',
      date: new Date('October 5, 2021'),
      completed: true
    },
    { 
      address: '72 Indeed Ave NW, Calgary AB',
      date: new Date('October 12, 2021'),
      completed: true
    },
    {
      address: '525 Yondervan Cres SW, Calgary AB',
      date: new Date('October 1, 2021'),
      completed: true
    },
    { 
      address: '72 Indeed Ave NW, Calgary AB',
      date: new Date('October 20, 2021'),
      completed: false
    },
    {
      address: '525 Yondervan Cres SW, Calgary AB',
      date: new Date('November 12, 2021'),
      completed: false
    },
    { 
      address: '72 Indeed Ave NW, Calgary AB',
      date: new Date('November 1, 2021'),
      completed: false
    },
    {
      address: '525 Yondervan Cres SW, Calgary AB',
      date: new Date('October 30, 2021'),
      completed: false
    },
    { 
      address: '72 Indeed Ave NW, Calgary AB',
      date: new Date('December 1, 2021'),
      completed: false
    }
  ]
}