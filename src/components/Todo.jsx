import { useState } from "react";
import { BsChevronDown } from "react-icons/bs";

import TaskCard from "./TaskCard";
import TodoList from "./TodoList";

const Todo = () => {
  const [cardShow, setCardShow] = useState(false);
  const [storedTaskData, setStoredTaskData] = useState(
    JSON.parse(localStorage.getItem("tasks")) || []
  );

  const addTask = () => {
    setCardShow(true);
  };

  const handleSubmitTask = (taskDetails) => {
    const taskId = Date.now();
    const updatedTaskData = [...storedTaskData, { id: taskId, ...taskDetails }];
    localStorage.setItem("tasks", JSON.stringify(updatedTaskData));
    setCardShow(false);
  };


  const deleteTask = (id) => {
    const updateTaskData = storedTaskData.filter((t) => t.id !== id);
    localStorage.setItem("tasks", JSON.stringify(updateTaskData));
    setStoredTaskData(updateTaskData);
  };

  const clearLocalStorage = () => {
    localStorage.clear();
  };

  return (
    <section className={`px-4 mt-8 relative`}>
      <div className="relative max-w-[1000px] mx-auto flex flex-col justify-between">
        <div className="flex justify-between">
          <button
            type="button"
            onClick={addTask}
            className="px-4 py-2 text-lg text-[#00214d] bg-[#00ebc7] font-semibold rounded hover:bg-cyan-400 cursor-pointer transition duration-150 ease-in-out "
          >
            Add New Task
          </button>
          <div className="flex items-center space-x-6 text-gray-700 font-semibold ">
            <button className="flex items-center">
              Sort <BsChevronDown className="ml-1 text-black" />
            </button>
            <button className="flex items-center">
              Filter <BsChevronDown className="ml-1 text-black" />
            </button>
            <button className="flex items-center">
              Category <BsChevronDown className="ml-1 text-black" />
            </button>
          </div>
        </div>

        <div className="flex justify-end mt-12 my-2">
          <button
            onClick={clearLocalStorage}
            className=" text-gray-700 font-semibold px-2 py-2 bg-gray-300 rounded-md hover:bg-gray-200 active:bg-gray-300 border border-gray-300 transition duration-150 ease-in-out"
          >
            Clear All
          </button>
        </div>
        <div className="sm:grid sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 2xl:grid-cols-4 mt-2 mb-6 gap-4 overflow-hidden">
          {storedTaskData.length > 0 &&
            storedTaskData?.map((task) => (
              <TodoList key={task.id} task={task} onDelete={deleteTask} />
            ))}
        </div>
      </div>
      <div
        className={`absolute top-0 left-1/2 transform -translate-x-1/2  z-40`}
      >
        {cardShow && (
          <div className="">
            <TaskCard onSubmitTask={handleSubmitTask} />
          </div>
        )}
      </div>
    </section>
  );
};

export default Todo;
