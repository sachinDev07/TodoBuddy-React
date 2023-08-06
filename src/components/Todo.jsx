import { useState } from "react";
import { BsChevronDown } from "react-icons/bs";

import TaskCard from "./TaskCard";

const Todo = () => {
  const [cardShow, setCardShow] = useState(false);

  const addTask = () => {
    setCardShow(true);
  };

  return (
    <section className="px-4 mt-8 relative">
      <div className="max-w-[1000px] mx-auto flex justify-between">
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

      <div className="flex justify-center">
      {cardShow && (
        <div className="">
          <TaskCard cardShow={cardShow}/>
        </div>
      )}

      </div>
        
    </section>
  );
};

export default Todo;
