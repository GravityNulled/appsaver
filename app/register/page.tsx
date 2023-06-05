"use client";

import axios from "axios";
import Link from "next/link";
import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import toast, { Toaster } from "react-hot-toast";

const Register = () => {
  const [regErrors, setRegErrors] = useState<string>();
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [zip, setZip] = useState("");
  const [city, setCity] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");

  const router = useRouter();
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const res = await axios.post("/api/register", {
        email,
        password,
        name,
        zip,
        address,
        city,
        phonenumber: phone,
      });
      toast.success("Registration successful");
    } catch (error) {
      toast.error("Registration failed");
    }
  };
  return (
    <div className="flex items-center justify-center min-h-screen">
      <Toaster />
      <div className="px-8 py-6 mt-4 text-left bg-white shadow-lg">
        <h3 className="text-2xl font-bold text-center">Register an account</h3>
        <form onSubmit={(e) => handleSubmit(e)}>
          <div className="mt-4">
            <div className="flex gap-2">
              <div>
                <label className="block">Name</label>
                <input
                  onChange={(e) => setName(e.target.value)}
                  type="text"
                  placeholder="Name"
                  className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
                />
              </div>
              <div>
                <label className="block">Email</label>
                <input
                  onChange={(e) => setEmail(e.target.value)}
                  type="text"
                  placeholder="ann@gmail.com"
                  className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
                />
              </div>
            </div>
            <div className="mt-4">
              <label className="block">Address</label>
              <input
                onChange={(e) => setAddress(e.target.value)}
                type="text"
                placeholder="Moi Avenue"
                className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
              />
            </div>
            <div className="mt-4">
              <label className="block">Phone Number</label>
              <input
                onChange={(e) => setPhone(e.target.value)}
                type="text"
                placeholder="0714313267"
                className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
              />
            </div>
            <div className="flex gap-2">
              <div className="mt-4">
                <label className="block">City</label>
                <input
                  onChange={(e) => setCity(e.target.value)}
                  type="text"
                  placeholder="City"
                  className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
                />
              </div>
              <div className="mt-4">
                <label className="block">Zip</label>
                <input
                  onChange={(e) => setZip(e.target.value)}
                  type="text"
                  placeholder="Zip"
                  className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
                />
              </div>
            </div>
            <div className="mt-4">
              <label className="block">Password</label>
              <input
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                placeholder="Password"
                className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
              />
            </div>
            <div className="flex items-baseline justify-between">
              <button className="px-6 py-2 mt-4 text-white bg-blue-600 rounded-lg hover:bg-blue-900">
                Register
              </button>
              <Link
                href="/login"
                className="text-sm text-blue-600 hover:underline"
              >
                Login?
              </Link>
            </div>
          </div>
          <p className="text-pink-600 text-xs mt-1">{regErrors}</p>
        </form>
      </div>
    </div>
  );
};

export default Register;
