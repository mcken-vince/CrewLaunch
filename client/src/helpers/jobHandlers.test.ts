import { IContractLocal } from "../components/component-types";
import { generateJobsFromContract } from "./jobHandlers";


const contract: IContractLocal = {
  _id: '1111',
  client_id: '2222',
  client: {_id: '2222', name: 'Testman', email: 'test@mail.com', phone: '403-414-6262'},
  address: '144 Rosewood Rd',
  start_date: new Date(),
  package_id: '3333',
  selectedPackage: {
    _id: '3333',
    title: 'Test Package',
    cost: 10000,
    description: 'Nothing to add.',
    visit_interval_days: 7,
    man_hrs_per_visit: 2,
    contract_length_days: 56
  }
}
const result = generateJobsFromContract(contract);
console.log('result: ', result);
describe('generateJobsFromContract()', () => {
  it('should return an array of jobs', () => {
    expect(result).toBeInstanceOf(Array);
  });

  it('should return the correct number of jobs', () => {
    expect(result.length).toBe(8);
  });
});