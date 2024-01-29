"use client";
import React, { useState, ChangeEvent } from 'react';
import axios from 'axios';


export default function Login() {
  const [email, setEmail] = useState<string>('');
  const [message, setMessage] = useState<string>('');



  const handleEmailChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setEmail(event.target.value);
  };

  const handleLogin = async () => {
    try {
      const response = await axios.post('/api/login', { email });

      if (response.status === 201) {
        console.log(response.data);
        setMessage('Link has been sent successfully to your email.');
      } else {
        setMessage(response.data.message || 'An error occurred.');
      }
    } catch (error: any) {
      if (error.response) {
        setMessage(error.response.data.message || 'An error occurred.');
      } else if (error.request) {
        setMessage('No response received. Please try again later.');
      } else {
        setMessage('Error: ' + error.message);
      }
    }
  };

  return (
    <div>
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
        <input
        className="w-1/3 p-2 m-2 border-2 border-gray-800 rounded-lg"
        type="email"
        placeholder="Email"
        value={email}
        onChange={handleEmailChange}
      />
            <button className="w-1/3 p-2 m-2 text-white bg-gray-800 rounded-lg"  onClick={handleLogin}>Login</button>
            {message && <p>{message}</p>}
        </div>
    </div>
  )
}
