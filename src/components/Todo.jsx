import { useContext, useEffect, useState } from "react";
import { BgOverlayContext } from "../BgOverlayContext";
import { collection, addDoc } from "firebase/firestore"; 
import { db } from "../config/firebase";

import TaskCard from "./TaskCard";
import TodoList from "./TodoList";

import NoTaskImage from "../assets/task-bg.png";
import Button from "./Button";
import { toast } from "react-toastify";
import SearchTask from "./SearchTask";

import NoResultsFound from "../assets/no-results-page.png";

const Todo = () => {
  const { setOverlay } = useContext(BgOverlayContext);
  const [cardShow, setCardShow] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [storedTaskData, setStoredTaskData] = useState(
    JSON.parse(localStorage.getItem("tasks")) || []
  );
  const [isSearchedInputEmpty, setIsSearchedInputEmpty] = useState(true);
  const [searchedTaskData, setSearchedTaskData] = useState([]);
  const [searchText, setSearchText] = useState("");

  const updateTaskStatuses = (tasks) => {
    const currentDate = new Date();
    let tasksChanged = false;

    const updatedTasks = tasks.map((task) => {
      if (task.taskStatus !== "completed" && task.date < currentDate) {
        task.taskStatus = "pending";
        tasksChanged = true;
      }
      return task;
    });

    if (tasksChanged) {
      setStoredTaskData(updatedTasks);
      localStorage.setItem("tasks", JSON.stringify(updatedTasks));
    }
  };

  useEffect(() => {
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];

    if (tasks !== null) {
      updateTaskStatuses(tasks);
    }

    const updateInterval = 60 * 60 * 1000;
    const intervalId = setInterval(() => {
      updateTaskStatuses(tasks);
    }, updateInterval);

    return () => {
      clearInterval(intervalId);
    };
  }, [storedTaskData]);

  const addTask = () => {
    setCardShow(true);
    setOverlay(true);
  };

  const handleSubmitTask = async (taskDetails) => {
    try {
      console.log("task: ", taskDetails);
      const docRef = await addDoc(collection(db, "tasks"), taskDetails);
      console.log("taskDetails: ", docRef);
    } catch (error) {
      console.log("error", error);
    }
    setCardShow(false);
  };

  const deleteTask = (taskId) => {
    const allTaskData = JSON.parse(localStorage.getItem("tasks"));
    const updateTaskData = allTaskData.filter((t) => t.id !== taskId);
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

  const onChangeTaskStatus = (taskId) => {
    const updatedTaskData = [...storedTaskData];

    const taskIndex = updatedTaskData.findIndex((task) => task.id === taskId);

    if (
      taskIndex !== -1 &&
      updatedTaskData[taskIndex].taskStatus !== "completed"
    ) {
      updatedTaskData[taskIndex].taskStatus = "completed";

      setStoredTaskData(updatedTaskData);
      localStorage.setItem("tasks", JSON.stringify(updatedTaskData));
      toast.success("Congrats, Task is completed");
    } else {
      toast.info("Task is already completed !!!");
    }
  };

  const clearLocalStorage = () => {
    localStorage.clear();
    setStoredTaskData([]);
  };

  const onFilterTasks = (type) => {
    let allTaskData = JSON.parse(localStorage.getItem("tasks"));

    if (type === "sort") {
      const userSortValue = document.getElementById("sort");
      let sortValue = userSortValue.options[userSortValue.selectedIndex].value;

      if (sortValue === "date") {
        allTaskData.sort((taskA, taskB) => {
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
        allTaskData.sort((taskA, taskB) => {
          const nameA = String(taskA.name).toLowerCase();
          const nameB = String(taskB.name).toLowerCase();
          return nameA.localeCompare(nameB);
        });
      }

      if (sortValue === "zToa") {
        allTaskData.sort((taskA, taskB) => {
          const nameA = String(taskA.name).toLowerCase();
          const nameB = String(taskB.name).toLowerCase();
          return nameB.localeCompare(nameA);
        });
      }

      setStoredTaskData(allTaskData);
    }

    if (type === "priority") {
      const userPriorityValue = document.getElementById("priority");
      let priorityValue =
        userPriorityValue.options[userPriorityValue.selectedIndex].value;

      if (priorityValue === "all") {
        setStoredTaskData(allTaskData);
      }

      if (priorityValue === "high") {
        const highTaskData = allTaskData.filter(
          (task) => task.priority === "high"
        );
        if (highTaskData.length > 0) {
          setStoredTaskData(highTaskData);
        } else {
          toast.error("None task were found");
        }
      }

      if (priorityValue === "medium") {
        const mediumTaskData = allTaskData.filter(
          (task) => task.priority === "medium"
        );
        if (mediumTaskData.length > 0) {
          setStoredTaskData(mediumTaskData);
        } else {
          toast.error("None task were found");
        }
      }

      if (priorityValue === "low") {
        const lowTaskData = allTaskData.filter(
          (task) => task.priority === "low"
        );
        if (lowTaskData.length > 0) {
          setStoredTaskData(lowTaskData);
        } else {
          toast.error("None task were found");
        }
      }

      if (priorityValue === "completed") {
        const completedTasksData = allTaskData.filter(
          (task) => task.taskStatus === "completed"
        );
        if (completedTasksData.length > 0) {
          setStoredTaskData(completedTasksData);
        } else {
          toast.error("None tasks were completed");
        }
      }

      if (priorityValue === "pending") {
        const pendingTasksData = allTaskData.filter(
          (task) => task.taskStatus === "pending"
        );

        if (pendingTasksData.length > 0) {
          setStoredTaskData(pendingTasksData);
        } else {
          toast.error("No pending tasks found");
        }
      }
    }

    if (type === "category") {
      const userCategory = document.getElementById("category");
      const userCategoryValue =
        userCategory.options[userCategory.selectedIndex].value;

      if (userCategoryValue === "category") {
        setStoredTaskData(allTaskData);
      }

      if (userCategoryValue === "personal") {
        let personalTasksData = allTaskData.filter(
          (task) => task.category === "personal"
        );

        if (personalTasksData.length > 0) {
          setStoredTaskData(personalTasksData);
        } else {
          toast.error("No tasks found");
        }
      }

      if (userCategoryValue === "home") {
        let workTasksData = allTaskData.filter(
          (task) => task.category === "home"
        );

        if (workTasksData.length > 0) {
          setStoredTaskData(workTasksData);
        } else {
          toast.error("No tasks found");
        }
      }

      if (userCategoryValue === "study") {
        let studyTasksData = allTaskData.filter(
          (task) => task.category === "study"
        );

        if (studyTasksData.length > 0) {
          setStoredTaskData(studyTasksData);
        } else {
          toast.error("No tasks found");
        }
      }

      if (userCategoryValue === "shopping") {
        let shoppingTasksData = allTaskData.filter(
          (task) => task.category === "shopping"
        );

        if (shoppingTasksData.length > 0) {
          setStoredTaskData(shoppingTasksData);
        } else {
          toast.error("No tasks found");
        }
      }
    }
  };

  const onClose = () => {
    setCardShow(false);
    setOverlay(false);
  };

  return (
    <section className={`px-4 py-8 relative`}>
      <div className="relative max-w-[1000px] mx-auto flex flex-col justify-between">
        <div className="md:flex justify-between">
          <Button onClick={addTask}>Add new task</Button>
          <div className="mt-5 md:mt-0 flex items-center space-x-6 text-gray-700 font-semibold ">
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
              <select
                name="priority"
                id="priority"
                onChange={() => onFilterTasks("priority")}
                className="cursor-pointer outline-none"
              >
                <option value="all">All</option>
                <option value="completed">Complete</option>
                <option value="pending">Pending</option>
                <option value="high">High</option>
                <option value="medium">Medium</option>
                <option value="low">Low</option>
              </select>
              <select
                name="category"
                id="category"
                onChange={() => onFilterTasks("category")}
                className="cursor-pointer outline-none"
              >
                <option value="category">Category</option>
                <option value="personal">Personal</option>
                <option value="study">Study</option>
                <option value="home">Home</option>
                <option value="shopping">Shopping</option>
              </select>
            </form>
          </div>
        </div>

        <div className="md:flex justify-between items-center mt-10 md:mt-12 my-2">
          <SearchTask
            storedTaskData={storedTaskData}
            setStoredTaskData={setStoredTaskData}
            isEmpty={setIsSearchedInputEmpty}
            setSearchedData={setSearchedTaskData}
            setSearchValue={setSearchText}
          />
          <div className="mt-6 md:mt-0 text-right">
            <Button onClick={clearLocalStorage} title="Clear all the tasks">
              Clear All
            </Button>
          </div>
        </div>
        {storedTaskData.length > 0 ? (
          isSearchedInputEmpty === true ? (
            <div className="sm:grid sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 2xl:grid-cols-4 mt-1 md:mt-9 mb-6 gap-4 p-1 overflow-hidden">
              {storedTaskData?.map((task) => (
                <TodoList
                  key={task.id}
                  task={task}
                  onDelete={deleteTask}
                  onEdit={onEditTask}
                  updateTask={onUpdateTask}
                  handleTaskStatus={onChangeTaskStatus}
                />
              ))}
            </div>
          ) : (
            <>
              {isSearchedInputEmpty === false ? (
                searchedTaskData.length > 0 ? (
                  <div className="sm:grid sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 2xl:grid-cols-4 mt-6 mb-6 gap-4 overflow-hidden">
                    {searchedTaskData?.map((task) => (
                      <TodoList
                        key={task.id}
                        task={task}
                        onDelete={deleteTask}
                        onEdit={onEditTask}
                        updateTask={onUpdateTask}
                        handleTaskStatus={onChangeTaskStatus}
                      />
                    ))}
                  </div>
                ) : (
                  <div className="flex flex-col justify-center items-center absolute  top-[240%] left-[50%] transform -translate-x-1/2 whitespace-nowrap -translate-y-1/2">
                    <p className=" text-xl text-gray-600">
                      Sorry, we couldn't find any results for
                      <span className="font-bold"> {searchText}</span>
                    </p>
                    <img src={NoResultsFound} alt="no result found" />
                  </div>
                )
              ) : null}
            </>
          )
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
              onClose={onClose}
            />
          </div>
        )}
      </div>
    </section>
  );
};

export default Todo;
