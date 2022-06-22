import React, { useState, useEffect } from "react";
import axios from "axios";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();
    const user = {
      username: username,
      password: password,
    };

    try {
      const res = await axios.post("http://127.0.0.1:8000/api/login", user);
      localStorage.clear();
      localStorage.setItem("token", res.data.token);
      const forumUser = res.data.user;
      localStorage.setItem("userid", forumUser.id);
      localStorage.setItem("username", forumUser.username);
      localStorage.setItem("useravatar", forumUser.avatar);
      window.location.replace("http://localhost:3000");
    } catch (err) {
      console.error(err);
      setUsername("");
      setPassword("");
      localStorage.clear();
      setErrors(true);
    }
  };

  return (
        <div className="relative flex bg-black flex-col justify-center min-h-screen overflow-hidden">
          <div className="w-full p-6 m-auto bg-black border-t-4 border-gray-700 rounded-md shadow-md border-top lg:max-w-md">
            <h1 className="text-3xl font-semibold text-center text-gray-200">
              Movie Potato
            </h1>
            <form className="mt-6" onSubmit={onSubmit}>
              <div>
                <label for="username" className="block text-sm text-gray-400">
                  Username
                </label>
                <input
                  type="text"
                  className="block w-full px-4 py-2 mt-2 text-gray-700 bg-gray-100 border rounded-md focus:border-orange-300 focus:ring-orange-200 focus:outline-none focus:ring focus:ring-opacity-40"
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
              <div className="mt-4">
                <div>
                  <label for="password" className="block text-sm text-gray-400">
                    Password
                  </label>
                  <input
                    type="password"
                    className="block w-full px-4 py-2 mt-2 text-gray-700 bg-gray-100 border rounded-md focus:border-blue-300 focus:ring-blue-200 focus:outline-none focus:ring focus:ring-opacity-40"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                {errors === true && (
                  <p className="text-red-500 text-xs mb-3 italic">
                    Cannot log in with provided credentials.
                  </p>
                )}
                <a href="#" className="text-xs text-blue-600 hover:underline">
                  Forget Password?
                </a>
                <div className="mt-6">
                  <button
                    type="submit"
                    className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-blue-500 rounded-md hover:bg-blue-400 focus:outline-none focus:bg-blue-500"
                  >
                    Login
                  </button>
                </div>
              </div>
            </form>
            <p className="mt-8 text-xs font-light text-center text-gray-400">
              {" "}
              Don't have an account?{" "}
              <a
                href="#"
                className="font-medium text-blue-600 hover:underline"
              >
                Sign up
              </a>
            </p>
          </div>
        </div>
  );
};

export default Login;
