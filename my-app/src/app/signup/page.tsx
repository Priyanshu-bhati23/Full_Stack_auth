"use client";

import Link from 'next/link';
import React from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "react-hot-toast";

export default function SignupPage() {
  const router = useRouter();

  const [user, setUser] = React.useState({
    email: "",
    password: "",
    username: "",
  });

  const [buttonDisabled, setButtonDisabled] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  // Optional: Enable/disable button dynamically when all fields are filled
  React.useEffect(() => {
    const isFormFilled = user.email && user.password && user.username;
    setButtonDisabled(!isFormFilled);
  }, [user]);

  const onSignup = async () => {
    setLoading(true);
    try {
      const response = await axios.post("/api/users/signup", user);
      console.log("Signup success", response.data);

      toast.success("Signup successful!");
      router.push("/login");
    } catch (error: any) {
      console.error("Signup failed", error.response?.data?.error || error.message);
      toast.error(error.response?.data?.error || "Signup failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-blue-50">
      <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center text-blue-700">Signup</h1>

        <label className="block mb-2 text-sm font-medium text-gray-700" htmlFor="username">Username</label>
        <input
          type="text"
          id="username"
          value={user.username}
          onChange={(e) => setUser({ ...user, username: e.target.value })}
          placeholder="Enter username"
          className="w-full p-2 mb-4 border border-gray-300 rounded-md text-black"
        />

        <label className="block mb-2 text-sm font-medium text-gray-700" htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          value={user.email}
          onChange={(e) => setUser({ ...user, email: e.target.value })}
          placeholder="Enter email"
          className="w-full p-2 mb-4 border border-gray-300 rounded-md text-black"
        />

        <label className="block mb-2 text-sm font-medium text-gray-700" htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          value={user.password}
          onChange={(e) => setUser({ ...user, password: e.target.value })}
          placeholder="Enter password"
          className="w-full p-2 mb-6 border border-gray-300 rounded-md text-black"
        />

        <button
          onClick={onSignup}
          disabled={buttonDisabled || loading}
          className={`w-full text-white py-2 rounded transition ${
            buttonDisabled || loading
              ? "bg-blue-400 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700"
          }`}
        >
          {loading ? "Signing up..." : "Sign Up"}
        </button>

        <p className="mt-4 text-sm text-center text-gray-600">
          Already have an account?{" "}
          <Link href="/login" className="text-blue-600 hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
