import React from "react";

const Login = () => {
  return (
    <section className="w-full flex flex-col items-center px-4 md:px-12 lg:px-96">
      <h1 className="mt-20 text-5xl md:text-6xl lg:text-7xl font-bold text-center">
        Organize your work and life, finally.
      </h1>
      <p className="mt-6 text-2xl text-gray-500 text-center ">Become focused, organized, and calm with Todoist. </p>
      <button className="mt-10 px-4 py-2 bg-red-500 rounded-md text-white text-lg cursor-pointer font-semibold hover:bg-red-600 transition duration-150 ease-in-out">Sign Up</button>
    </section>
  );
};

export default Login;
