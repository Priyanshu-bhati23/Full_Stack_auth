"use client";

import Link from "next/link";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "react-hot-toast";

export default function LoginPage() {
  const router = useRouter();
  const [user, setUser] = React.useState({
    email: "",
    password: "",
  });

  const [buttonDisabled, setButtonDisabled] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState(""); // New state to store error message

  const onLogin = async () => {
    try {
      setLoading(true);
      setErrorMessage(""); // Clear old errors
      const response = await axios.post("/api/user/login", user);
      console.log("login success", response.data);
      toast.success("login success");
      router.push("profile");
    } catch (error: any) {
      console.log("login failed", error.message);
      toast.error(error.message);
      setErrorMessage(error.response?.data?.error || "Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user.email.length > 0 && user.password.length > 0) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user]);

  return (
    <div className="flex items-center justify-center h-screen bg-blue-50">
      <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center text-blue-700">Login</h1>

        <label className="block mb-2 text-sm font-medium text-gray-700" htmlFor="email">
          Email
        </label>
        <input
          type="email"
          id="email"
          value={user.email}
          onChange={(e) => setUser({ ...user, email: e.target.value })}
          placeholder="Enter email"
          className="w-full p-2 mb-4 border border-gray-300 rounded-md text-black"
        />

        <label className="block mb-2 text-sm font-medium text-gray-700" htmlFor="password">
          Password
        </label>
        <input
          type="password"
          id="password"
          value={user.password}
          onChange={(e) => setUser({ ...user, password: e.target.value })}
          placeholder="Enter password"
          className="w-full p-2 mb-6 border border-gray-300 rounded-md text-black"
        />

        <button
          onClick={onLogin}
          disabled={buttonDisabled || loading}
          className={`w-full text-white py-2 rounded transition ${
            buttonDisabled || loading
              ? "bg-blue-400 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700"
          }`}
        >
          {loading ? "Logging in..." : "Login"}
        </button>

        {/* Error Message UI */}
        {errorMessage && (
          <p className="mt-4 text-sm text-center text-red-600">
            {errorMessage}
          </p>
        )}

        <p className="mt-4 text-sm text-center text-gray-600">
          Don't have an account?{" "}
          <Link href="/signup" className="text-blue-600 hover:underline">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}
