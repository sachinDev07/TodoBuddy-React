import React from "react";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

const DatePickerComponent = ({selectedDate, handleDateChange}) => {
  return (
    <>
      <DatePicker
        selected={selectedDate}
        onChange={handleDateChange}
        dateFormat="dd-MM-yyyy"
        className="w-full mt-1 font-bold outline-none text-lg text-gray-700 border-b-2 border-spacing-x-2 border-gray-300 bg-white transition duration-150 ease-in-out focus:border-gray-700 focus:text-gray-700 mb-6"
      />
    </>
  );
};

export default DatePickerComponent;
