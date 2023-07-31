import React from "react";
import todobuddyLogo from "../assets/todobuddy-logo.png";

const Header = () => {
  return (
    <header className="px-4">
      <nav className="max-w-[1000px] mx-auto flex justify-between items-center  py-2">
        <img
          src={todobuddyLogo}
          alt="logo"
          className="w-32 h-16 object-contain cursor-pointer"
        />
        <ul className="flex space-x-6">
          <li className="px-6 py-2 text-lg font-bold text-[#00214d] bg-[#00ebc7] border rounded hover:bg-cyan-400 transition duration-150 active:bg-cyan-500 cursor-pointer">
            Logout
          </li>
          <li className="p-6 bg-blue-500 rounded-full"></li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
