import { useContext, useState } from "react";
import { BgOverlayContext } from "../BgOverlayContext";

import TaskCard from "./TaskCard";
import TodoList from "./TodoList";

import NoTaskImage from "../assets/task-bg.png";
import Button from "./Button";

const Todo = () => {
  const { setOverlay } = useContext(BgOverlayContext);
  const [cardShow, setCardShow] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [storedTaskData, setStoredTaskData] = useState(
    JSON.parse(localStorage.getItem("tasks")) || []
  );

  const addTask = () => {
    setCardShow(true);
    setOverlay(true);
  };

  const handleSubmitTask = (taskDetails) => {
    const taskId = Date.now();
    const updatedTaskData = [{ id: taskId, ...taskDetails }, ...storedTaskData];
    setStoredTaskData(updatedTaskData);
    localStorage.setItem("tasks", JSON.stringify(updatedTaskData));
    setCardShow(false);
  };

  const deleteTask = (taskId) => {
    const updateTaskData = storedTaskData.filter((t) => t.id !== taskId);
    localStorage.setItem("tasks", JSON.stringify(updateTaskData));
    setStoredTaskData(updateTaskData);
  };

  const onEditTask = (taskId) => {
    const editTask = storedTaskData.find((task) => task.id === taskId);
    setEditingTask(editTask);
    setCardShow(true);
    setOverlay(true);
  };

  const onUpdateTask = (taskId, updatedTaskDetails) => {
    if (updatedTaskDetails.startTime >= updatedTaskDetails.endTime) {
      alert("Start time should be less than end time");
    } else {
      const updatedTaskData = storedTaskData.map((task) =>
        task.id === taskId ? { ...task, ...updatedTaskDetails } : task
      );
      setStoredTaskData(updatedTaskData);
      localStorage.setItem("tasks", JSON.stringify(updatedTaskData));
      setEditingTask("");
      setCardShow(false);
    }
  };

  const clearLocalStorage = () => {
    localStorage.clear();
    setStoredTaskData([]);
  };

  const onFilterTasks = (type) => {
    if (type === "sort") {
      const userSortValue = document.getElementById("sort");
      let sortValue = userSortValue.options[userSortValue.selectedIndex].value;

      let sortedTaskData = [...storedTaskData];

      if (sortValue === "date") {
        sortedTaskData.sort((taskA, taskB) => {
          if (taskA.date === "Today" && taskB.date === "Today") {
            return taskA.id - taskB.id;
          } else if (taskA.date === "Today") {
            return -1;
          } else if (taskB.date === "Today") {
            return 1;
          } else {
            const dateA = new Date(taskA.date);
            const dateB = new Date(taskB.date);
            return dateA - dateB;
          }
        });
      }

      if (sortValue === "aToz") {
        sortedTaskData.sort((taskA, taskB) => {
          const nameA = String(taskA.name).toLowerCase();
          const nameB = String(taskB.name).toLowerCase();
          return nameA.localeCompare(nameB);
        });
      }

      if (sortValue === "zToa") {
        sortedTaskData.sort((taskA, taskB) => {
          const nameA = String(taskA.name).toLowerCase();
          const nameB = String(taskB.name).toLowerCase();
          return nameB.localeCompare(nameA);
        });
      }

      setStoredTaskData(sortedTaskData);
    }
  };

  return (
    <section className={`px-4 py-8 relative`}>
      <div className="relative max-w-[1000px] mx-auto flex flex-col justify-between">
        <div className="flex justify-between">
          <Button onClick={addTask}>Add new task</Button>
          <div className="flex items-center space-x-6 text-gray-700 font-semibold ">
            <form className="flex space-x-3">
              <select
                name="sort"
                id="sort"
                onChange={() => onFilterTasks("sort")}
                className="cursor-pointer outline-none"
              >
                <option value="">Sort</option>
                <option value="date">Date</option>
                <option value="aToz">A-Z</option>
                <option value="zToa">Z-A</option>
              </select>
              <select name="priority" id="priority" className="cursor-pointer">
                <option value="">Filter</option>
                <option value="completed">Complete</option>
                <option value="pending">Pending</option>
                <option value="hard">Hard</option>
                <option value="medium">Medium</option>
                <option value="low">Low</option>
              </select>
              <select name="category" id="category" className="cursor-pointer">
                <option value="">Category</option>
                <option value="personal">Personal</option>
                <option value="study">Study</option>
                <option value="home">Home</option>
                <option value="shopping">Shopping</option>
              </select>
            </form>
          </div>
        </div>

        <div className="flex justify-end mt-12 my-2">
          <button
            onClick={clearLocalStorage}
            title="Clear all the tasks"
            className=" text-gray-700 font-semibold px-2 py-2 bg-gray-300 rounded-md hover:bg-gray-200 active:bg-gray-300 border border-gray-300 transition duration-150 ease-in-out"
          >
            Clear All
          </button>
        </div>
        {storedTaskData.length > 0 ? (
          <div className="sm:grid sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 2xl:grid-cols-4 mt-2 mb-6 gap-4 overflow-hidden">
            {storedTaskData?.map((task) => (
              <TodoList
                key={task.id}
                task={task}
                onDelete={deleteTask}
                onEdit={onEditTask}
                updateTask={onUpdateTask}
              />
            ))}
          </div>
        ) : (
          <div className="flex flex-col justify-center items-center bg-white">
            <img src={NoTaskImage} alt="image" className="w-[500px]" />
            <strong className="text-xl text-gray-600">
              No tasks have been added yet !!!
            </strong>
          </div>
        )}
      </div>
      <div
        className={`absolute top-0 left-1/2 transform -translate-x-1/2  z-40`}
      >
        {cardShow && (
          <div className="">
            <TaskCard
              onSubmitTask={handleSubmitTask}
              editingTask={editingTask}
              onUpdate={onUpdateTask}
            />
          </div>
        )}
      </div>
    </section>
  );
};

export default Todo;
