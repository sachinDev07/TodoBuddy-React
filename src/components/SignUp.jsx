import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";

import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, db } from "../config/firebase";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import { toast } from "react-toastify";
import Auth from "./Auth";
import { UserPhotoUrlContext } from "../UserPhotoUrlContext";

const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { setPhotoUrl } = useContext(UserPhotoUrlContext);

  const navigate = useNavigate();

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      updateProfile(auth.currentUser, {
        displayName: name,
      });

      const user = userCredential.user;
      setPhotoUrl(user.photoURL)
      const userData = { name: name, email: email };
      userData.timestamp = serverTimestamp();
      setDoc(doc(db, "users", user.uid), userData);

      toast.success("Sign up was successful!");
      navigate("/todo");
    } catch (error) {
      if (error.code === "auth/email-already-in-use") {
        toast.error(
          "The email is already in use. Please log in or reset your password."
        );
      } else {
        toast.error("Something went wrong with the registration!");
      }
    }
  };

  return (
    <section>
      <h1 className="text-center mt-6 text-3xl font-bold">Sign Up</h1>
      <div className="flex flex-wrap items-center justify-center my-12 mx-auto max-w-6xl px-6">
        <div className="md:w-[67%] lg:w-[50%] mb-12 md:mb-6">
          <img
            src="https://plus.unsplash.com/premium_photo-1661775953246-410e3a33977c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"
            alt="key"
            className="w-full rounded-2xl"
          />
        </div>
        <div className="w-full md:w-[67%] lg:w-[40%] lg:ml-20">
          <form onSubmit={onSubmit}>
            <input
              type="text"
              name="name"
              id="name"
              value={name}
              placeholder="Your name"
              onChange={(e) => setName(e.target.value)}
              className="w-full mb-6 px-4 py-2 text-xl text-gray-700 bg-white border-2 border-gray-300 rounded transition ease-in-out"
            />
            <input
              type="email"
              name="email"
              id="email"
              value={email}
              placeholder="Email address"
              onChange={(e) => setEmail(e.target.value)}
              className="w-full mb-6 px-4 py-2 text-xl text-gray-700 bg-white border-2 border-gray-300 rounded transition ease-in-out"
            />
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                id="password"
                value={password}
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
                className="w-full mb-6 text-xl text-gray-700 bg-white border-2 border-gray-300 px-4 py-2 rounded transition ease-in-out"
              />
              <div
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute top-4 right-4 text-xl cursor-pointer"
              >
                {showPassword ? <AiFillEyeInvisible /> : <AiFillEye />}
              </div>
            </div>
            <div className="w-full flex justify-between items-center whitespace-nowrap text-sm sm:text-lg">
              <p>
                Do you have a account?
                <Link
                  to={"/sign-up"}
                  className="text-red-600 hover:text-red-800 transition duration-200 ease-in-out ml-1"
                >
                  Register
                </Link>
              </p>
              <p>
                <Link
                  // to={"forgot-password"}
                  className="text-blue-600 hover:text-blue-800 transition duration-200 ease-in-out"
                >
                  Forgot password?
                </Link>
              </p>
            </div>
            <button
              type="submit"
              className="w-full px-7 py-3 mt-6 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 shadow-md hover:shadow-lg active:bg-blue-800 uppercase rounded transition duration-200 ease-in-out"
            >
              Sign Up
            </button>
            <div className="flex items-center my-4 before:border-t before:flex-1 before:border-gray-500 after:border-t after:flex-1 after:border-gray-500 mx-4 ">
              <p className="text-center font-semibold mx-4">OR</p>
            </div>
            <Auth />
          </form>
        </div>
      </div>
    </section>
  );
};

export default SignUp;
