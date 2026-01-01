import React, { useState } from "react";
import NavBar from "../components/user/NavBar";
import { Link, useNavigate } from "react-router-dom";

const LoginPage = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const login = async (e) => {
    e.preventDefault(); // ✅ stop page refresh

    try {
      const res = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      });

      const data = await res.json();

      if (!res.ok) {
        console.log(data.message);
        return;
      }

      localStorage.setItem("token", data.token);
      navigate("/");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <NavBar />

      <div className="min-h-screen bg-gradient-to-b from-purple-600 to-purple-500 flex items-center justify-center px-4">
        <div className="bg-white w-full max-w-5xl h-[75vh] rounded-3xl shadow-2xl flex overflow-hidden">

          {/* Left */}
          <div className="hidden md:flex flex-col justify-center items-center w-1/2 bg-purple-50">
            <h1 className="text-4xl font-bold text-purple-800 mb-3">Welcome</h1>
            <p className="text-lg text-purple-600">
              Login for seamless shopping experience
            </p>
            <img
              src="https://img.freepik.com/free-vector/shopping-e-commerce-concept-isometric-poster_1284-15256.jpg"
              alt="login"
              className="mt-8 rounded-xl shadow-lg h-[50%]"
            />
          </div>

          {/* Right */}
          <div className="flex flex-col justify-center w-full md:w-1/2 px-8 md:px-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
              Login to your account
            </h2>

            <form className="space-y-5" onSubmit={login}>
              <input
                type="email"
                name="email"
                placeholder="Email address"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-purple-400 outline-none"
                required
              />

              <input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-purple-400 outline-none"
                required
              />

              <button
                type="submit"
                className="w-full bg-purple-700 text-white py-3 rounded-lg hover:bg-purple-800 transition font-semibold"
              >
                Login
              </button>
            </form>

            <p className="text-center text-gray-600 mt-6">
              Don’t have an account?{" "}
              <Link to="/signup" className="text-purple-700 font-semibold hover:underline">
                Sign up
              </Link>
            </p>
          </div>

        </div>
      </div>
    </>
  );
};

export default LoginPage;
