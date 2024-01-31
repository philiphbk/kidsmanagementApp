"use client";
import React, { useState, ChangeEvent } from "react";
import axios from "axios";
import ImageBg from "./components/ImageBg";
import BgImg from "@/public/images/children-bg.jpg";

export default function Login() {
  const [email, setEmail] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false); // New loading state

  const handleEmailChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setEmail(event.target.value);
  };

  const handleLogin = async () => {
    setIsLoading(true); // Start loading
    try {
      const response = await axios.post("/api/login", { email });
      setMessage(
        response.status === 201
          ? "Link has been sent successfully to your email."
          : response.data.message || "An error occurred."
      );
    } catch (error: any) {
      setMessage(
        error.response?.data.message || error.message || "An error occurred."
      );
    } finally {
      setIsLoading(false); // Stop loading regardless of outcome
    }
  };

  return (


    <div
    className="relative flex flex-col md:flex-row h-screen bg-cover bg-center"
    style={{ backgroundImage: `url(${BgImg.src})` }}
  >
    {/* Loading Overlay */}
    {isLoading && (
      <div className="absolute inset-0 bg-black bg-opacity-50 flex justify-center items-center">
        <div className="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    )}

    {/* Overlay for background image on mobile */}
    <div className="absolute inset-0 bg-black opacity-50 md:opacity-0 z-10"></div>

    {/* Login Form Section */}
    <div className="z-20 flex flex-col justify-center items-center w-full md:w-1/2 p-10 bg-white bg-opacity-75 md:bg-opacity-100 self-center">
      <h1 className="text-4xl font-bold mb-5">Login to Admin</h1>
      <input
          className="w-full p-3 m-3 border-2 border-gray-300 rounded-lg"
          type="email"
          placeholder="Email"
          value={email}
          onChange={handleEmailChange}
        />
        <button
          className="w-full p-3 m-3 text-white bg-gray-800 rounded-lg"
          onClick={handleLogin}
        >
          Login
        </button>
        {message && <p className="text-red-500">{message}</p>}
    </div>

    {/* Background Image Section for Desktop */}
    <div className="hidden md:block md:w-1/2">
      {/* ... */}
    </div>
  </div>
);
}
