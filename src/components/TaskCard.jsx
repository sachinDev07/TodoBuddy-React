import React, { useEffect, useState, memo, useContext } from "react";
import DatePickerComponent from "./DatePicker";
import TimePicker from "./TimePicker";
import Button from "./Button";
import { BgOverlayContext } from "../BgOverlayContext";
import CrossButton from "./CrossButton";
import { formatTime, formatDate } from "../utils/helper";

const TaskCard = memo(({ onSubmitTask, editingTask, onUpdate, onClose }) => {
  const { setOverlay } = useContext(BgOverlayContext);
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

  useEffect(() => {
    if (editingTask) {
      setTaskData({
        name: editingTask.name,
        description: editingTask.description,
      });

      setPriority(editingTask.priority);
      setCategory(editingTask.category);
    }
  }, [editingTask]);

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

  const compareDatesByDayMonthYear = (dateA, dateB) => {
    const dayA = dateA.getDate();
    const monthA = dateA.getMonth();
    const yearA = dateA.getFullYear();

    const dayB = dateB.getDate();
    const monthB = dateB.getMonth();
    const yearB = dateB.getFullYear();

    if (yearA !== yearB) {
      return yearA - yearB;
    } else if (monthA !== monthB) {
      return monthA - monthB;
    } else {
      return dayA - dayB;
    }
  };

  const handleDateChange = (selectedDate) => {
    let currentDate = new Date();
    let comparisonResult = compareDatesByDayMonthYear(
      selectedDate,
      currentDate,
    );
    if (comparisonResult >= 0) {
      setSelectedDate(selectedDate);
    } else {
      alert("Please select a valid date !!!");
    }
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

  const onSubmit = (e) => {
    e.preventDefault();

    if (startTime >= endTime) {
      alert("Start time should be less than end time");
    } else {
      const taskDetails = {
        name,
        description,
        priority,
        category,
        date: formatDate(selectedDate),
        startTime: formatTime(startTime),
        endTime: formatTime(endTime),
      };

      if (editingTask) {
        onUpdate(editingTask.id, taskDetails);
      } else {
        onSubmitTask(taskDetails);
      }

      setTaskData({ name: "", description: "" });
      setPriority("");
      setCategory("");
      setSelectedDate(new Date());
      setOverlay(false);
    }
  };

  return (
    <section className=" bg-white w-[380px] max-w-[480px] md:min-w-[480px] shadow-slate-800 shadow-2xl rounded-md z-50">
      <form onSubmit={onSubmit} className="p-4 md:p-8">
        <div className="flex justify-end">
          <CrossButton title="Cut" onClick={onClose} size="1.2em" color="red" />
        </div>
        <div className="mt-4 relative">
          <label
            className={`absolute text-gray-700 font-bold whitespace-nowrap ${
              isInputFocused("taskname") || name.length > 0
                ? "text-[10px] -top-[15px] text-gray-400 font-semibold "
                : "text-lg text-gray-700 font-bold"
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
        <div className={`relative`}>
          <label
            className={`absolute text-gray-700 font-bold whitespace-nowrap ${
              isInputFocused("description") || description.length > 0
                ? "text-[10px] -top-[15px] text-gray-400 font-semibold"
                : "text-base text-gray-700 font-bold"
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
        <div className="mt-5 flex space-x-12  md:space-x-28">
          <label className="block text-gray-700 font-bold text-lg">Date:</label>
          <DatePickerComponent
            selectedDate={selectedDate}
            handleDateChange={handleDateChange}
          />
        </div>
        <div className="md:flex justify-between">
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
        <div className="mt-3 md:flex justify-between items-center">
          <label className="text-gray-700 font-bold text-lg">Priority</label>
          <div className="mt-2 md:mt-0 flex items-center space-x-4">
            <label htmlFor="high" className="flex gap-2 items-center">
              <span>High</span>
              <input
                id="high"
                type="radio"
                name="priority"
                value="high"
                required
                onClick={() => handlePriority("hard")}
                className="flex items-center gap-2 text-xm font-semibold text-gray-700 cursor-pointer"
              />
            </label>

            <label htmlFor="medium" className="flex gap-2 items-center">
              <span>Medium</span>
              <input
                id="medium"
                type="radio"
                name="priority"
                value="medium"
                required
                onClick={() => handlePriority("medium")}
                className="flex items-center gap-1 text-xm font-semibold text-gray-700 cursor-pointer"
              />
            </label>

            <label htmlFor="low" className="flex gap-2 items-center">
              <span>Low</span>
              <input
                id="low"
                type="radio"
                name="priority"
                value="low"
                required
                onClick={() => handlePriority("low")}
                className="flex items-center gap-2 text-xm font-semibold text-gray-700 cursor-pointer"
              />
            </label>
          </div>
        </div>
        <div className="mt-6 md:flex items-center justify-between">
          <label className="text-lg font-bold text-gray-700">Category</label>
          <div className="flex space-x-2 mt-2 md:mt-0">
            <span
              onClick={() => handleCategory("personal")}
              className={`${category === "personal" ? "border-2 border-orange-700" : ""} text-xs font-semibold text-gray-700 px-2 py-2 border border-gray-300 rounded transition duration-150 ease-in-out hover:border-gray-700 cursor-pointer bg-orange-200 hover:bg-orange-300 active:bg-orange-500 active:text-white`}
          >
              Personal
            </span>
            <span
              onClick={() => handleCategory("study")}
              className={`${category === "study" ? "border-2 border-blue-700" : ""} text-xs font-semibold text-gray-700 px-2 py-2 border border-gray-300 rounded transition duration-150 ease-in-out hover:border-gray-700 cursor-pointer bg-blue-200 hover:bg-blue-300 active:bg-blue-500 active:text-white`}
            >
              Study
            </span>
            <span
              onClick={() => handleCategory("home")}
              className={`${category === "home" ? "border-2 border-pink-700" : ""} text-xs font-semibold text-gray-700 px-2 py-2 border border-gray-300 rounded transition duration-150 ease-in-out hover:border-gray-700 cursor-pointer bg-pink-200 hover:bg-pink-300 active:bg-pink-500 active:text-white`}
            >
              Home
            </span>
            <span
              onClick={() => handleCategory("shopping")}
              className={`${category === "shopping" ? "border-2 border-green-700" : ""} text-xs font-semibold text-gray-700 px-2 py-2 border border-gray-300 rounded transition duration-150 ease-in-out hover:border-gray-700 cursor-pointer bg-green-200 hover:bg-green-300 active:bg-green-500 active:text-white`}
            >
              Shopping
            </span>
          </div>
        </div>
        <div className="flex justify-end mt-8">
          {editingTask ? (
            <Button onClick={onSubmit}>Edit</Button>
          ) : (
            <Button type="submit">Add Task</Button>
          )}
        </div>
      </form>
    </section>
  );
});

export default TaskCard;
