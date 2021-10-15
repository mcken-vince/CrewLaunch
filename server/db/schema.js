const mongoose = require('mongoose');

const crewSchema = new mongoose.Schema({
  foreman_name: {
    type: String,
    required: true
  },
  crew_size: {
    type: Number,
    required: true
  },
  is_active: {
    type: Boolean,
    default: true
  },
  avatar: String
}, { timestamps: true });

const clientSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true
  },
  phone: String
}, { timestamps: true });

const packageSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  cost: {
    type: Number,
    required: true
  },
  contract_length_days: {
    type: Number,
    required: true
  },
  visit_interval_days: {
    type: Number,
    required: true
  },
  man_hrs_per_visit: {
    type: Number,
    required: true
  },
  description: String,
  
}, { timestamps: true });

const contractSchema = new mongoose.Schema({
  package_id: {
    type: String,
    required: true
  },
  client_id: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  job_notes: {
    type: String,
    required: true
  },
  start_date: {
    type: Date,
    required: true
  }
}, { timestamps: true });

const jobSchema = new mongoose.Schema({
  crew_id: {
    type: String,
    required: true
  },
  contract_id: {
    type: String,
    required: true
  },
  completed: {
    type: Boolean,
    default: false
  },
  date: Date
});

const Crew = mongoose.model('Crew', crewSchema);
const Client = mongoose.model('Client', clientSchema);
const Package = mongoose.model('Package', packageSchema);
const Contract = mongoose.model('Contract', contractSchema);
const Job = mongoose.model('Job', jobSchema);


Promise.all([
  Crew.deleteMany({}),
  Client.deleteMany({}),
  Package.deleteMany({}),
  Contract.deleteMany({}),
  Job.deleteMany({})
])
.then(() => {
  console.log('Models wiped squeaky clean!')
  // Some seeds here below
  const cr1 = new Crew({
    foreman_name: 'Andy Bandy',
    crew_size: 2,
    avatar: "https://avataaars.io/?avatarStyle=Transparent&topType=ShortHairShaggyMullet&accessoriesType=Wayfarers&hairColor=Brown&facialHairType=BeardLight&facialHairColor=BrownDark&clotheType=ShirtScoopNeck&clotheColor=Red&eyeType=Happy&eyebrowType=RaisedExcitedNatural&mouthType=Twinkle&skinColor=Pale'"
  });
  cr1.save().then((crew1) => console.log('crew1 created: '));
  
  const cr2 = new Crew({
    foreman_name: 'Heddy Ready',
    crew_size: 4,
    avatar: "https://getavataaars.com/?accessoriesType=Prescription02&avatarStyle=Transparent&clotheColor=PastelRed&clotheType=ShirtCrewNeck&eyeType=Squint&eyebrowType=FlatNatural&facialHairColor=BrownDark&facialHairType=BeardMajestic&graphicType=Resist&hairColor=PastelPink&mouthType=Smile&skinColor=Tanned&topType=WinterHat2"
  });
  cr2.save().then(console.log('crew2 created'));
  
  const cli1 = new Client({
    name: 'Gregory Peck',
    phone: '403-552-9094',
    email: 'regreg@peck.com'
  });
  cli1.save().then(console.log('client1 created'));
  
  const pack1 = new Package({
    title: 'Lawn Care Silver',
    description: '3 Month, Biweekly: Mow, edge trim, blow off pathways',
    cost: 5000,
    contract_length_days: 90,
    visit_interval_days: 14,
    man_hrs_per_visit: 4
  });
  pack1.save().then(console.log('package1 created'));
  
  const pack2 = new Package({
    title: 'Lawn Care Gold',
    description: 'Two week, Daily: Mow, edge trim, blow off pathways',
    cost: 5000,
    contract_length_days: 14,
    visit_interval_days: 1,
    man_hrs_per_visit: 5
  });
  
  pack2.save().then(console.log('package2 created'));
})
.catch((err) => {
  console.log('Error resetting database: ', err);
});


module.exports = { Crew, Client, Package, Contract, Job };
