import { useEffect, useState } from "react";
import { AiFillEdit } from "react-icons/ai";
import { TiTick } from "react-icons/ti";
import CrossButton from "./CrossButton";

const TodoList = ({ task, onDelete, onEdit, handleTaskStatus }) => {
  const [truncateText, setTruncateText] = useState("");
  const { id, name, startTime, endTime, date } = task;

  useEffect(() => {
    if (name.length > 30) {
      setTruncateText(name.slice(0, 30) + "...");
    } else {
      setTruncateText(name);
    }
  }, [name]);

  return (
    <div className="mb-6 max-h-68 md:mb-2 flex flex-col justify-between p-3 rounded-md shadow-7xl hover:scale-105 transition duration-150 ease-in-out  overflow-hidden">
      <div className="flex justify-between items-center mb-4">
        <p className="text-xs font-semibold text-gray-700 ">{date}</p>
        <TiTick
          onClick={() => handleTaskStatus(id)}
          title="Click to complete the task"
          className="text-xl bg-white rounded-full text-green-600 cursor-pointer border border-green-300 hover:border-green-600 active:text-white active:bg-green-600 transition duration-150 ease-in-out"
        />
      </div>
      <h1 className={`text-5xl md:text-3xl text-gray-800 font-semibold `}>
        {truncateText}
      </h1>
      <div className="flex items-center justify-between mt-8">
        <div className="flex items-center space-x-1 text-base text-gray-700 font-semibold">
          <p className="">{startTime}</p>
          <span className="font-bold text-lg text-gray-700">-</span>
          <p className="">{endTime}</p>
        </div>
        <div className="flex space-x-3 items-center">
          <AiFillEdit
            title="Edit"
            onClick={() => onEdit(id)}
            className="cursor-pointer font-bold text-lg text-green-700 hover:text-green-600 transition duration-150 ease-in-out"
          />
          <CrossButton
            title="Remove"
            onClick={() => onDelete(id)}
            size="1.1em"
            color="red"
          />
        </div>
      </div>
    </div>
  );
};

export default TodoList;
