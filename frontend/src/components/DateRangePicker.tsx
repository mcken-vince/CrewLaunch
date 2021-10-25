import DatePicker, { ReactDatePickerProps} from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

interface DateRangePickerProps extends ReactDatePickerProps {
  onChange: VoidFunction;
  selected: Date;
  startDate: Date;
  endDate: Date
  inheritClassName? : string;
}


const DateRangePicker = (props: DateRangePickerProps) => {
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