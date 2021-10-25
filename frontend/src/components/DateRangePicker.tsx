import { FC, ReactElement } from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { DateRangePickerProps } from './component-types';


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