import CrewCard from "../components/CrewCard";

export default {
  title: 'Dispatch/CrewCard',
  component: CrewCard
};

const Template = (args) => <CrewCard {...args} />;

export const WithNoJobs = Template.bind({});

WithNoJobs.args = {
  crew: {
    foreman_name: 'Andy Bandy',
    crew_size: 2,
    avatar: "https://avataaars.io/?avatarStyle=Transparent&topType=ShortHairShaggyMullet&accessoriesType=Wayfarers&hairColor=Brown&facialHairType=BeardLight&facialHairColor=BrownDark&clotheType=ShirtScoopNeck&clotheColor=Red&eyeType=Happy&eyebrowType=RaisedExcitedNatural&mouthType=Twinkle&skinColor=Pale'"
  }, 
  jobs: []
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
      date: new Date(),
      complete: true
    },
    { 
      address: '72 Indeed Ave NW, Calgary AB',
      date: new Date(),
      complete: true
    },
    {
      address: '525 Yondervan Cres SW, Calgary AB',
      date: new Date(),
      complete: true
    },
    { 
      address: '72 Indeed Ave NW, Calgary AB',
      date: new Date(),
      complete: false
    },
    {
      address: '525 Yondervan Cres SW, Calgary AB',
      date: new Date(),
      complete: false
    },
    { 
      address: '72 Indeed Ave NW, Calgary AB',
      date: new Date(),
      complete: false
    },
    {
      address: '525 Yondervan Cres SW, Calgary AB',
      date: new Date(),
      complete: false
    },
    { 
      address: '72 Indeed Ave NW, Calgary AB',
      date: new Date(),
      complete: false
    }
  ]
}