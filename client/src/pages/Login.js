import axios from "axios";
import React, { useState } from "react";
import { url } from "../utils";
import { store } from "../store";
import { useNavigate } from "react-router-dom";

const Login = ({ role }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const {setUser} = store();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Implement form submission handling (e.g., send login request)
    if (!email || !password) {
      console.error("All fields are required");
      return;
    }

    try {
      // Send login request
      let userData = { email, password, role };
      const response = await axios.post(`${url}/login`, userData);

      console.log(response.data);

      setUser(response.data.user);
      setLoginError("");
      navigate("/");
    } catch (error) {
      console.error("Login error:", error);
      setLoginError("Invalid email or password");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-[var(--brown)] rounded-lg flex flex-col my-2 h-fit"
    >
      <div className="p-3 pb-0">
        <label
          htmlFor="email"
          className="block text-lg font-medium text-white px-1"
        >
          Email
        </label>
        <input
          type="email"
          id="email"
          className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring focus:ring-[var(--dark-brown)] focus:ring-opacity-50 p-2"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className="p-3">
        <label
          htmlFor="password"
          className="block text-lg font-medium text-white px-1"
        >
          Password
        </label>
        <input
          type="password"
          id="password"
          className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring focus:ring-[var(--dark-brown)] focus:ring-opacity-50 p-2"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      {loginError && (
        <div className="text-red bg-white py-2 px-2">
          {/* Display error message here */}
          {loginError}
        </div>
      )}
      <button
        type="submit"
        className="m-3 bg-[var(--dark-brown)] text-white py-2 px-4 rounded-md font-semibold"
      >
        Login as {role}
      </button>
    </form>
  );
};

export default Login;
