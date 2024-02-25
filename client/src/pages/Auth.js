import React, { useState } from "react";
import Login from "./Login"; // Import the Login component
import Signup from "./Signup"; // Import the Signup component
import bg from "../assets/bg.jpg"; // Import the background image
import logo from "../assets/logo.png"; // Import the logo image
const Auth = () => {
  const [mode, setMode] = useState("login"); // 'login' or 'signup'
  const [role, setRole] = useState("reader"); // 'reader' or 'writer'

  const toggleMode = (mode) => {
    setMode(mode);
  };

  const toggleRole = (role) => {
    setRole(role);
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-no-repeat"
      style={{
        backgroundImage: `url(${bg})`,
      }}
    >
      <div className="bg-white bg-opacity-80 pt-2 p-8 rounded-lg shadow-md w-full sm:w-96">
        <img src={logo} alt="logo" className="w-48 mx-auto" />
        <div className="flex justify-evenly gap-2 items-center">
          <button
            className={`${
              mode === "login"
                ? "bg-[var(--brown)] text-white"
                : "bg-white text-[var(--brown)]"
            }  py-2 px-4 rounded-md focus:outline-none w-full shadow-black shadow-sm`}
            onClick={() => toggleMode("login")}
          >
            {"Login"}
          </button>
          <button
            className={`${
              mode === "signup"
                ? "bg-[var(--brown)] text-white"
                : "bg-white text-[var(--brown)]"
            }  py-2 px-4 rounded-md focus:outline-none w-full shadow-black shadow-sm`}
            onClick={() => toggleMode("signup")}
          >
            {"Signup"}
          </button>
        </div>
        <div className="flex justify-evenly gap-2 items-center mt-4">
          <button
            className={`${
              role === "reader"
                ? "bg-[var(--brown)] text-white"
                : "bg-white text-[var(--brown)]"
            }  py-2 px-4 rounded-md focus:outline-none w-full shadow-black shadow-sm`}
            onClick={() => toggleRole("reader")}
          >
            {"Reader"}
          </button>
          <button
            className={`${
              role === "writer"
                ? "bg-[var(--brown)] text-white"
                : "bg-white text-[var(--brown)]"
            }  py-2 px-4 rounded-md focus:outline-none w-full shadow-black shadow-sm`}
            onClick={() => toggleRole("writer")}
          >
            {"Writer"}
          </button>
        </div>
        {mode === "login" ? <Login role={role} /> : <Signup role={role} />}
      </div>
    </div>
  );
};

export default Auth;
