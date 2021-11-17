import { IthisMonth } from "../components/component-types";
import { getMonthObject, formatDate, calculateContractStatus } from "./dataFormatters";
import { addDays } from 'date-fns';

describe('formatDate()', () => {
  it('should return a string', () => {
    const result: string = formatDate(new Date());
    expect(typeof result).toBe('string');
  });
});


describe('getMonthObject()', () => {
  it("should return an object with 'startsOn', 'name', 'days' properties", () => {
    const result: IthisMonth = getMonthObject(new Date());
    expect(typeof result.startsOn).not.toBe(undefined);
    expect(typeof result.name).toBe('string');
    expect(typeof result.year).toBe('string');
    expect(typeof result.days).toBe('number');
  });
});

describe('calculateContractStatus()', () => {
  let startDate = addDays(new Date(), -5);
  let endDate = addDays(new Date(), 10);
  const past = 'Complete';
  const current = 'Active';
  const upcoming = 'Upcoming';
  it("should return a string and 'current' if contract is current", () => {
    const currentResult = calculateContractStatus(startDate, endDate);
    expect(typeof currentResult).toBe('string');
    expect(currentResult).toBe(current);
  });
  it("should return 'past' if contract is past", () => {
    startDate = addDays(new Date(), -30);
    endDate = addDays(new Date(), -10);
    const pastResult = calculateContractStatus(startDate, endDate);
    expect(pastResult).toBe(past);
  });
  it("should return 'upcoming' if contract hasn't started yet", () => {
    startDate = addDays(new Date(), 1);
    endDate = addDays(new Date(), 60);
    const upcomingResult = calculateContractStatus(startDate, endDate);
    expect(upcomingResult).toBe(upcoming);
  });
});