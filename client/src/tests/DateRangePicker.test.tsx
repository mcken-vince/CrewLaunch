import { render, screen } from '@testing-library/react';
import DateRangePicker, { DateRangePickerProps } from "../components/DateRangePicker";

const onChange = jest.fn();
let startDate = new Date('January 1, 2022');
let endDate = new Date('February 2, 2022');

const renderDateRangePicker = (props: Partial<DateRangePickerProps> = {}) => {
  const defaultProps = {
    onChange,
    startDate,
    endDate
  };
  return render (
    <DateRangePicker {...defaultProps} {...props}/>
  );
};

describe('<DateRangePicker />', () => {
  it('renders without crashing and displays start and end dates', () => {
    renderDateRangePicker();
    expect(screen.getByDisplayValue(new RegExp('01/01/2022'))).toBeInTheDocument();
    expect(screen.getByDisplayValue(new RegExp('02/02/2022'))).toBeInTheDocument();
  });
});