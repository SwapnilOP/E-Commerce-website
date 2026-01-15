import React, { useState } from "react";
import NavBar from "../components/user/NavBar";
import { Link, useNavigate } from "react-router-dom";

const RegistrationPage = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: ""
  });


  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const signup = async (e) => {
    e.preventDefault();
    setError("");

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          password: formData.password
        })
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Registration failed");
        return;
      }

      // optional: auto-login after signup
      localStorage.setItem("token", data.token);

      navigate("/");
    } catch (err) {
      console.error(err);
      setError("Something went wrong");
    }
  };

  return (
    <>
      <NavBar />

      <div className="min-h-screen bg-gradient-to-b from-purple-600 to-purple-500 flex items-center justify-center px-4">
        <div className="bg-white w-full max-w-5xl h-[75vh] rounded-3xl shadow-2xl flex overflow-hidden">

          {/* Left Section */}
          <div className="hidden md:flex flex-col justify-center items-center w-1/2 bg-purple-50">
            <h1 className="text-4xl font-bold text-purple-800 mb-3">
              Welcome
            </h1>
            <p className="text-lg text-purple-600">
              Register now to get started with ShopEase
            </p>
            <img
              src="https://img.freepik.com/free-vector/shopping-e-commerce-concept-isometric-poster_1284-15256.jpg"
              alt="signup"
              className="mt-8 rounded-xl shadow-lg h-[50%]"
            />
          </div>

          {/* Right Section */}
          <div className="flex flex-col justify-center w-full md:w-1/2 px-8 md:px-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
              Signup to get started
            </h2>

            <form className="space-y-5" onSubmit={signup}>

              <input
                type="text"
                name="name"
                placeholder="Full name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-purple-400 outline-none"
                required
              />

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

              <input
                type="password"
                name="confirmPassword"
                placeholder="Confirm password"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-purple-400 outline-none"
                required
              />

              {error && (
                <p className="text-red-600 text-sm text-center">{error}</p>
              )}

              <button
                type="submit"
                className="w-full bg-purple-700 text-white py-3 rounded-lg hover:bg-purple-800 transition font-semibold"
              >
                Signup
              </button>
            </form>

            <p className="text-center text-gray-600 mt-6">
              Already have an account?{" "}
              <Link
                to="/login"
                className="text-purple-700 font-semibold hover:underline"
              >
                Login
              </Link>
            </p>
          </div>

        </div>
      </div>
    </>
  );
};

export default RegistrationPage;
