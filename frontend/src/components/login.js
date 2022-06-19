import React, { useState, useEffect } from "react";
import axios from "axios";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (localStorage.getItem("token") !== null) {
      window.location.replace("http://localhost:3000");
    } else {
      setLoading(false);
    }
  }, []);

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
    <>
      {loading === false && (
        <div className="relative flex flex-col justify-center min-h-screen overflow-hidden">
          <div className="w-full p-6 m-auto bg-white border-t-4 border-orange-600 rounded-md shadow-md border-top lg:max-w-md">
            <h1 className="text-3xl font-semibold text-center text-orange-600">
              Movie Potato
            </h1>
            <form className="mt-6" onSubmit={onSubmit}>
              <div>
                <label for="username" className="block text-sm text-gray-800">
                  Username
                </label>
                <input
                  type="text"
                  className="block w-full px-4 py-2 mt-2 text-orange-600 bg-white border rounded-md focus:border-orange-300 focus:ring-orange-200 focus:outline-none focus:ring focus:ring-opacity-40"
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
              <div className="mt-4">
                <div>
                  <label for="password" className="block text-sm text-gray-800">
                    Password
                  </label>
                  <input
                    type="password"
                    className="block w-full px-4 py-2 mt-2 text-orange-600 bg-white border rounded-md focus:border-orange-300 focus:ring-orange-200 focus:outline-none focus:ring focus:ring-opacity-40"
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
                <a href="#" className="text-xs text-gray-600 hover:underline">
                  Forget Password?
                </a>
                <div className="mt-6">
                  <button
                    type="submit"
                    className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-orange-500 rounded-md hover:bg-orange-400 focus:outline-none focus:bg-orange-500"
                  >
                    Login
                  </button>
                </div>
              </div>
            </form>
            <p className="mt-8 text-xs font-light text-center text-gray-700">
              {" "}
              Don't have an account?{" "}
              <a
                href="#"
                className="font-medium text-orange-600 hover:underline"
              >
                Sign up
              </a>
            </p>
          </div>
        </div>
      )}
    </>
  );
};

export default Login;
