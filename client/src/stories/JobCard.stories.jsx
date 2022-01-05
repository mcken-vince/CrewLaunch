import JobCard from "../components/JobCard";
import { localJobs, sampleState } from "../tests/sampleData";

export default {
  title: 'CrewLauncher/JobCard',
  component: JobCard
};

const Template = (args) => <JobCard {...args}/>;

export const IncompleteJob = Template.bind({});
IncompleteJob.args = {
  job: localJobs[0],
  crews: sampleState.crews,
  markJobComplete: () => {},
  assignJobToCrew: () => {}
};

export const CompleteJob = Template.bind({});
CompleteJob.args = {
  job: {...localJobs[0], completed: true},
  crews: sampleState.crews,
  markJobComplete: () => {},
  assignJobtoCrew: () => {}
};