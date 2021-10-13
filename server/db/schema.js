const { Timestamp } = require('bson');
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
  avatar: String
}, { timestamps: true });

const Crew = mongoose.model('Crew', crewSchema);

const clientSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  phone: String,
  email: {
    type: String,
    required: true
  }
}, { timestamps: true });

const Client = mongoose.model('Client', clientSchema);

const packageSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  flat_rate: {
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

const Package = mongoose.model('Package', packageSchema);

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
  start_date: Date
  
}, { timestamps: true });

const Contract = mongoose.model('Contract', contractSchema);

const jobSchema = new mongoose.Schema({
  crew_id: {
    type: String,
    required: true
  },
  contract_id: {
    type: String,
    required: true
  },
  date: Date,
  start_time: String,
  end_time: String,
  completed: {
    type: Boolean,
    default: false
  }
});

const Job = mongoose.model('Job', jobSchema);