"use client";

import toast, { Toaster } from "react-hot-toast";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { Ambulance, Booking, Hospital } from "@prisma/client";
import Image from "next/image";
import axios from "axios";

const Book = () => {
  const { data: session } = useSession();
  const [selectedAmbulance, setSelectedAmbulance] = useState<any>(null);
  const [selectedaddress, setSelectedAddress] = useState<any>(null);
  const [selectedName, setSelectedName] = useState<any>(null);
  const [selectedPhone, setSelectedPhone] = useState<any>(null);
  const [city, setCity] = useState<any>(null);
  const [ambulances, setAmbulances] = useState<Ambulance[]>();
  const [bookingHistory, setBookingHistory] = useState<Booking[]>();
  const [reason, setReason] = useState<string>("");
  const [hospitals, setHospitals] = useState<Hospital[]>();
  const [hospital, setHospital] = useState<string>("");

  useEffect(() => {
    const data = async () => {
      const ambulances: Ambulance[] = await fetch("/api/ambulance").then(
        (res) => res.json()
      );
      const hospitals: Hospital[] = await fetch("/api/hospital").then((res) =>
        res.json()
      );
      setHospitals(hospitals);
      setAmbulances(ambulances);
      try {
        const bookingHistory: Booking[] = await fetch("/api/booking").then(
          (res) => res.json()
        );
        setBookingHistory(bookingHistory);
      } catch (err) {}
    };
    data();
  }, []);
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      const res = await axios.post("/api/booking", {
        ambulance_name: selectedAmbulance,
        address: selectedaddress,
        name: selectedName,
        phone: selectedPhone,
        reason,
        hospital,
      });
      toast.success("Booking Successful");
    } catch (error) {
      toast.error("Something went wrong");
    }
  };
  const handleDelete = async (id: string) => {
    const response = await axios.delete(`/api/booking/${id}`);
    if (response.status === 200) {
      toast.success("Booking Deleted, refresh the page");
    } else {
      toast.error("Something went wrong");
    }
  };
  return (
    <div className="flex gap-20 flex-col items-center justify-center min-h-screen">
      <Toaster />
      {session ? (
        <div className="shadow-lg rounded-lg p-4 bg-white w-full max-w-lg">
          <div className="flex gap-4 flex-col">
            <p className="text-center text-xl">Account details</p>
            <Image
              src={session.user?.image || "/images/profile1.jpeg"}
              alt="profile"
              width={100}
              height={100}
              className="rounded-full h-[100px] w-[100px] object-cover"
            />
            <p className="text-sm">
              <span className="text-primary">Name: </span>
              {session.user?.name || "ann"}
            </p>
            <p className="text-sm">
              <span className="text-primary">Email: </span>
              {session.user?.email || "ann"}
            </p>
          </div>
          <p className="py-10 font-bold text-center text-base">
            Booking History
          </p>
          <div className="flex gap-5 flex-wrap">
            {bookingHistory?.map((booking, index) => {
              if (session?.user?.email == "admin@gmail.com") {
                return (
                  <div key={index} className="flex flex-col gap-2 p-2">
                    <p className="text-xs">
                      Ambulance ID: {booking.ambulanceId}
                    </p>
                    <p className="text-xs">
                      Reason: {booking.reason || "no reason was given"}
                    </p>
                    <p className="text-xs">
                      Time: {booking.bookingDate.toString()}
                    </p>
                    <p className="text-xs">
                      Address: {booking.address || "no address was given"}
                    </p>
                    <p className="text-xs">
                      Hospital: {booking.hospital || "no hospital  was given"}
                    </p>
                    <button
                      onClick={() => handleDelete(booking.id)}
                      className="py-4 px-2 bg-primary text-white rounded-md w-[200px] text-center"
                    >
                      Cancel Booking
                    </button>
                  </div>
                );
              } else {
                return (
                  <div key={index} className="flex flex-col gap-2 p-2">
                    <p className="text-xs">
                      Reason: {booking.reason || "no reason was given"}
                    </p>
                    <p className="text-xs">
                      Time: {booking.bookingDate.toString()}
                    </p>
                    <p className="text-xs">
                      Address: {booking.address || "no address was given"}
                    </p>
                    <p className="text-xs">
                      Hospital: {booking.hospital || "no hospital  was given"}
                    </p>
                  </div>
                );
              }
            })}
          </div>
        </div>
      ) : (
        <></>
      )}

      <form onSubmit={handleSubmit} className="w-full max-w-lg">
        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full px-3 mb-6 md:mb-0">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
              Name
            </label>
            <input
              onChange={(e) => setSelectedName(e.target.value)}
              className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
              id="grid-first-name"
              type="text"
            />
          </div>
        </div>
        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full px-3">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
              Address
            </label>
            <input
              onChange={(e) => setSelectedAddress(e.target.value)}
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="grid-password"
              type="text"
              placeholder="Old town, Mombasa"
            />
            <p className="text-gray-600 text-xs italic">
              Use the closest place from your current location
            </p>
          </div>
        </div>
        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full px-3">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
              Phone Number
            </label>
            <input
              onChange={(e) => setSelectedPhone(e.target.value)}
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="grid-password"
              type="text"
              placeholder="254720179897"
            />
            <p className="text-gray-600 text-xs italic">
              Enter your phone number
            </p>
          </div>
        </div>
        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full px-3">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
              Reason
            </label>
            <textarea
              onChange={(e) => setReason(e.target.value)}
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="reason"
              placeholder="Enter your reason"
            />
          </div>
        </div>
        <div className="flex flex-wrap -mx-3 mb-2">
          <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
              City
            </label>
            <input
              onChange={(e) => setCity(e.target.value)}
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="grid-city"
              type="text"
              placeholder="Mombasa"
            />
          </div>
          <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
              Gender
            </label>
            <div className="relative">
              <select
                className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                id="grid-state"
              >
                <option>Gender</option>
                <option>Male</option>
                <option>Female</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                <svg
                  className="fill-current h-4 w-4"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                </svg>
              </div>
            </div>
          </div>
          <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
              Zip
            </label>
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="grid-zip"
              type="text"
              placeholder="90210"
            />
          </div>
        </div>
        <div className="flex gap-4 justify-between">
          <div className="w-full md:w-1/3 mb-6 mt-6 md:mb-0">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
              Pick and Ambulance
            </label>
            <div className="relative">
              <select
                onChange={(e) => setSelectedAmbulance(e.target.value)}
                className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                id="grid-state"
              >
                <option>Ambulance</option>
                {ambulances?.map((ambulance, index) => {
                  return <option key={index}>{ambulance.name}</option>;
                })}
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                <svg
                  className="fill-current h-4 w-4"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                </svg>
              </div>
            </div>
          </div>
          <div className="w-full md:w-1/3 mb-6 mt-6 md:mb-0">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
              Select Hospital
            </label>
            <div className="relative">
              <select
                onChange={(e) => setHospital(e.target.value)}
                className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                id="grid-state"
              >
                <option>Hospitals</option>
                {hospitals?.map((hospital, index) => {
                  return <option key={index}>{hospital.name}</option>;
                })}
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                <svg
                  className="fill-current h-4 w-4"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                </svg>
              </div>
            </div>
          </div>
        </div>
        <button className="px-3 bg-primary text-white py-6 uppercase border rounded-md mt-6 w-full">
          Book Now
        </button>
      </form>
    </div>
  );
};

export default Book;
