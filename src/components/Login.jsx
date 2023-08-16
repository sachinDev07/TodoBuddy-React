import React from "react";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const navigate = useNavigate();
  return (
    <section className="w-full flex flex-col items-center px-4 md:px-12 lg:px-96">
      <h1 className="mt-32 text-5xl md:text-6xl lg:text-7xl font-bold text-center">
        Organize your work and life, finally.
      </h1>
      <p className="mt-6 text-2xl text-gray-500 text-center ">
        Become focused, organized, and calm with Todoist.{" "}
      </p>
      <button
        onClick={() => navigate("/todo")}
        className="mt-10 px-4 py-2 bg-red-500 rounded-md text-white text-lg cursor-pointer font-semibold hover:bg-red-600 transition duration-150 ease-in-out hover:scale-105"
      >
        Start for free
      </button>
    </section>
  );
};

export default HomePage;
