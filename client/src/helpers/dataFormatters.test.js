import { getMonthObject, formatDate } from "./dataFormatters";

describe('formatDate helper function', () => {
  it('should return a string', () => {
    const result = formatDate(new Date());
    expect(typeof result).toBe('string');
  });
});


describe('getMonthObject helper function', () => {
  it("should return an object with 'startsOn', 'name', 'days' properties", () => {
    const result = getMonthObject(new Date());
    expect(typeof result.startsOn).not.toBe(undefined);
    expect(typeof result.name).toBe('string');
    expect(typeof result.year).toBe('string');
    expect(typeof result.days).toBe('number');
  });
});