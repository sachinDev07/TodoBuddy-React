import React from "react";
import todobuddyLogo from "../assets/todobuddy-logo.png";
import Button from "./Button";

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
          <li >
            <Button >Log out</Button>
          </li>
          <li className="p-6 bg-blue-500 rounded-full"></li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
