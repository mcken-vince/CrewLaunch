import { EventHandler, FC, ReactElement } from 'react';
import DatePicker, { ReactDatePickerProps } from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";


const DateRangePicker: FC<DateRangePickerProps> = (props): ReactElement => {
  const { onChange, startDate, endDate, inheritClassName } = props;

  return (
    <DatePicker
      className={inheritClassName}
      selected={startDate}
      onChange={onChange}
      startDate={startDate}
      endDate={endDate}
      selectsRange
      withPortal
    />
  );
};

export default DateRangePicker;

export interface DateRangePickerProps extends ReactDatePickerProps {
  onChange: EventHandler<any>;
  selected?: Date;
  startDate: Date;
  endDate: Date
  inheritClassName? : string;
};