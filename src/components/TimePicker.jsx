import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const TimePicker = ({ label, selectedTime, onTimeChange }) => {
  const formatTime = (time) => {
    return time.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    });
  };

  return (
    <div className="mb-4">
      <label className="block text-gray-700 font-bold mb-2">{label}</label>
      <DatePicker
        selected={selectedTime}
        onChange={(date) => onTimeChange(date)}
        showTimeSelect
        showTimeSelectOnly
        required
        timeIntervals={30}
        dateFormat="h:mm aa"
        className="border-2 rounded p-2"
      />
    </div>
  );
};

export default TimePicker;
