import React, { useState } from "react";

import DatePickerComponent from "./DatePicker";
import TimePicker from "./TimePicker";

const TaskCard = ({ onSubmitTask }) => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [priority, setPriority] = useState("");
  const [category, setCategory] = useState("");

  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);

  const [inputFocused, setInputFocused] = useState(false);
  const [taskData, setTaskData] = useState({
    name: "",
    description: "",
  });

  const { name, description } = taskData;

  const onChange = (e) => {
    setTaskData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  };

  const handleFocus = (inputId) => {
    setInputFocused(inputId);
  };

  const handleBlur = () => {
    setInputFocused(false);
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const handlePriority = (selectedPriority) => {
    setPriority(selectedPriority);
  };

  const handleCategory = (selectedCategory) => {
    setCategory(selectedCategory);
  };

  const handleStartTimeChange = (date) => {
    setStartTime(date);
  };

  const handleEndTimeChange = (date) => {
    setEndTime(date);
  };

  const isInputFocused = (inputId) => inputId === inputFocused;

  const formatDate = (date) => {
    const today = new Date();
    const selected = new Date(date);

    if (selected.toDateString() === today.toDateString()) {
      return "Today";
    } else {
      return selected.toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
    }
  };

  const formatTime = (date) => {
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  const onSubmit = () => {
    const taskDetails = {
      name,
      description,
      priority,
      category,
      date: formatDate(selectedDate),
      startTime: formatTime(startTime),
      endTime: formatTime(endTime),
    };
    onSubmitTask(taskDetails);

    setTaskData({ name: "", description: "" });
    setPriority("");
    setCategory("");
    setSelectedDate(new Date());
  };

  return (
    <section className="relative bg-white max-w-[480px] min-w-[480px] shadow-2xl rounded">
      <form onSubmit={onSubmit} className="p-8">
        <div className="">
          <label
            className={`absolute text-gray-700 font-bold text-lg whitespace-nowrap ${
              isInputFocused("taskname") || name.length > 0
                ? "text-[11px] top-[10px]"
                : "text-base"
            } transition-all duration-200`}
          >
            Task name :
          </label>
          <input
            type="text"
            id="name"
            value={name}
            onFocus={() => handleFocus("taskname")}
            onBlur={handleBlur}
            onChange={onChange}
            minLength={3}
            maxLength={30}
            required
            className="w-full mt-1 font-bold outline-none text-lg text-gray-700 border-b-2 border-spacing-x-2 border-gray-300 bg-white transition duration-150 ease-in-out focus:border-gray-700 focus:text-gray-700 mb-6"
          />
        </div>
        <div className={`${inputFocused === "description" ? "mt-2" : "mt-2"}`}>
          <label
            className={`absolute text-gray-700 font-bold text-lg whitespace-nowrap ${
              isInputFocused("description") || description.length > 0
                ? "text-[11px] top-[70px]"
                : "text-base"
            } transition-all duration-200`}
          >
            Description :
          </label>
          <input
            type="text"
            id="description"
            value={description}
            onFocus={() => handleFocus("description")}
            onBlur={handleBlur}
            onChange={onChange}
            minLength={5}
            maxLength={70}
            required
            className="w-full outline-none text-gray-700 border-b-2 border-gray-300 font-bold text-lg
            focus:border-gray-700"
          />
        </div>
        <div className="mt-5 flex  space-x-28">
          <label className="block text-gray-700 font-bold text-lg">Date:</label>
          <DatePickerComponent
            selectedDate={selectedDate}
            handleDateChange={handleDateChange}
          />
        </div>
        <div className="flex justify-between">
          <TimePicker
            label="Start Time"
            selectedTime={startTime}
            onTimeChange={handleStartTimeChange}
          />
          <TimePicker
            label="End Time"
            selectedTime={endTime}
            onTimeChange={handleEndTimeChange}
          />
        </div>
        <div className="mt-3 flex justify-between items-center">
          <label className="text-gray-700 font-bold text-lg">Priority</label>
          <div className="flex items-center space-x-4">
            <p
              id="High"
              onClick={() => handlePriority("hard")}
              className="flex items-center gap-2 text-xm font-semibold text-gray-700 cursor-pointer"
            >
              High
              <span className="w-4 h-4 rounded-full bg-orange-400 hover:bg-orange-500 active:bg-orange-600"></span>
            </p>
            <p
              id="Medium"
              onClick={() => handlePriority("medium")}
              className="flex items-center gap-1 text-xm font-semibold text-gray-700 cursor-pointer"
            >
              Medium
              <span className="w-4 h-4 rounded-full bg-yellow-400 hover:bg-yellow-500 active:bg-yellow-600"></span>
            </p>
            <p
              id="Low"
              onClick={() => handlePriority("low")}
              className="flex items-center gap-2 text-xm font-semibold text-gray-700 cursor-pointer"
            >
              Low
              <span className="w-4 h-4 rounded-full bg-gray-400 hover:bg-gray-500 active:bg-gray-600"></span>
            </p>
          </div>
        </div>
        <div className="mt-6 flex items-center justify-between">
          <label className="text-lg font-bold text-gray-700">Tags</label>
          <div className="flex space-x-4">
            <span className="text-xs font-semibold text-gray-700 px-2 py-2 border border-gray-300 rounded transition duration-150 ease-in-out hover:border-gray-700 cursor-pointer bg-purple-200 hover:bg-purple-300 active:bg-purple-500 active:text-white">
              Meeting
            </span>
            <span className="text-xs font-semibold text-gray-700 px-2 py-2 border border-gray-300 rounded transition duration-150 ease-in-out hover:border-gray-700 cursor-pointer bg-purple-200 hover:bg-purple-300 active:bg-purple-500 active:text-white">
              UI Desing
            </span>
            <span className="text-xs font-semibold text-gray-700 px-2 py-2 border border-gray-300 rounded transition duration-150 ease-in-out hover:border-gray-700 cursor-pointer bg-purple-200 hover:bg-purple-300 active:bg-purple-500 active:text-white">
              Development
            </span>
          </div>
        </div>
        <div className="mt-6 flex items-center justify-between">
          <label className="text-lg font-bold text-gray-700">Category</label>
          <div className="flex space-x-4">
            <span
              onClick={() => handleCategory("personal")}
              className="text-xs font-semibold text-gray-700 px-2 py-2 border border-gray-300 rounded transition duration-150 ease-in-out hover:border-gray-700 cursor-pointer bg-orange-200 hover:bg-orange-300 active:bg-orange-500 active:text-white"
            >
              Personal
            </span>
            <span
              onClick={() => handleCategory("work")}
              className="text-xs font-semibold text-gray-700 px-2 py-2 border border-gray-300 rounded transition duration-150 ease-in-out hover:border-gray-700 cursor-pointer bg-blue-200 hover:bg-blue-300 active:bg-blue-500 active:text-white"
            >
              Work
            </span>
            <span
              onClick={() => handleCategory("home")}
              className="text-xs font-semibold text-gray-700 px-2 py-2 border border-gray-300 rounded transition duration-150 ease-in-out hover:border-gray-700 cursor-pointer bg-pink-200 hover:bg-pink-300 active:bg-pink-500 active:text-white"
            >
              Home
            </span>
            <span
              onClick={() => handleCategory("shopping")}
              className="text-xs font-semibold text-gray-700 px-2 py-2 border border-gray-300 rounded transition duration-150 ease-in-out hover:border-gray-700 cursor-pointer bg-green-200 hover:bg-green-300 active:bg-green-500 active:text-white"
            >
              Shopping
            </span>
          </div>
        </div>
        <div className="flex justify-end mt-8">
          <button
            type="submit"
            className="right-0 text-lg text-[#00214d] font-bold border border-gray-300 hover:border-gray-700 px-6 py-2 rounded bg-[#00ebc7] hover:bg-cyan-500 transition duration-150 ease-in-out active:bg-cyan-400 active:text-white"
          >
            Done
          </button>
        </div>
      </form>
    </section>
  );
};

export default TaskCard;
