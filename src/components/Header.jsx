import React, { useContext, useState } from "react";
import todobuddyLogo from "../assets/todobuddy-logo.png";
import Button from "./Button";
import { useNavigate } from "react-router-dom";
import { UserPhotoUrlContext } from "../UserPhotoUrlContext";
import { defaultImage } from "../utils/constant";

const Header = () => {
  const [isloggedIn, setIsLoggedIn] = useState(false);
  const { photoUrl } = useContext(UserPhotoUrlContext);
  const navigate = useNavigate();

  const onLogin = () => {
    setIsLoggedIn((prev) => !prev);
  };
  return (
    <header className="px-4 shadow-md">
      <nav className="max-w-[1000px] mx-auto flex justify-between items-center  py-2">
        <img
          src={todobuddyLogo}
          alt="logo"
          onClick={() => navigate("/")}
          className="w-24 md:w-40 object-contain cursor-pointer hover:scale-105 duration-150 ease-in-out"
        />
        <ul className="flex space-x-3 md:space-x-6">
          <li>
            {isloggedIn ? (
              <Button onClick={onLogin}>Log Out</Button>
            ) : (
              <Button onClick={onLogin}>Log In</Button>
            )}
          </li>
          <img
            src={photoUrl ? photoUrl :  defaultImage}
            alt="user image"
            className="w-7 rounded-full sm:h-8 md:w-12 md:h-12"
          />
        </ul>
      </nav>
    </header>
  );
};

export default Header;
