import React, { useState } from "react";
import axios from "axios";
import { url } from "../utils";

const Signup = ({ role }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if all required fields are provided based on the selected role
    if (
      !name ||
      !email ||
      !password
    ) {
      console.error("All fields are required");
      return;
    }
    if(role === "reader" && !username) {
      console.error("All fields are required");
      return;
    }
    try {
      let userData;
      if (role === "reader") {
        userData = { name, email, password, username, role };
      } else if (role === "writer") {
        userData = { name, email, password, score:0, skills: [""], role };
      }

      const response = await axios.post(`${url}/signup`, userData);
      console.log(response.data);
      // Handle success response
    } catch (error) {
      console.error("Signup error:", error);
      // Handle error response
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-[var(--brown)] rounded-lg flex flex-col my-2 h-fit"
    >
      <div className="p-3 pb-0">
        <label
          htmlFor="name"
          className="block text-lg font-medium text-white px-1"
        >
          Name
        </label>
        <input
          type="text"
          id="name"
          className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring focus:ring-[var(--dark-brown)] focus:ring-opacity-50 p-2"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
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
      <div className="p-3 pb-0">
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
      {role === "reader" && (
        <div className="p-3 pb-0">
          <label
            htmlFor="username"
            className="block text-lg font-medium text-white px-1"
          >
            Username
          </label>
          <input
            type="text"
            id="username"
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring focus:ring-[var(--dark-brown)] focus:ring-opacity-50 p-2"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
      )}
      <div className="p-3 pb-0">
        <label
          htmlFor="confirmPassword"
          className="block text-lg font-medium text-white px-1"
        >
          Confirm Password
        </label>
        <input
          type="password"
          id="confirmPassword"
          className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring focus:ring-[var(--dark-brown)] focus:ring-opacity-50 p-2"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
      </div>
      <button
        type="submit"
        className="m-3 bg-[var(--dark-brown)] text-white py-2 px-4 rounded-md font-semibold"
      >
        Signup as {role}
      </button>
    </form>
  );
};

export default Signup;
