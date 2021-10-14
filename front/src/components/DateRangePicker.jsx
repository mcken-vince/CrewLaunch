import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

const DateRangePicker = (props) => {
  const { onChange, startDate, endDate } = props;

  return (
    <DatePicker
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