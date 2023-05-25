import Image from "next/image";
import { AiOutlineFieldTime, AiFillMedicineBox } from "react-icons/ai";
import { FaAmbulance } from "react-icons/fa";
import { BsHospital } from "react-icons/bs";
export default function Home() {
  return (
    <main className="container my-10 mx-auto px-10">
      <div className="flex h-screen gap-5">
        <div className="flex gap-10 flex-col">
          <h1 className="font-bold text-3xl">
            Book Ambulances Instantly: Your Trusted Medical Transport Service.
          </h1>
          <div className="flex flex-col gap-2">
            <p className="text-primary font-semibold text-2xl">
              Why Choose Us?
            </p>
            <ol className="flex flex-col gap-5">
              <li className="flex items-center gap-3">
                <AiOutlineFieldTime size={40} fill="#45b5ef" />
                <p>Available 24/7</p>
              </li>
              <li className="flex items-center gap-3">
                <AiFillMedicineBox size={40} fill="#45b5ef" />
                <p>trained medical staff</p>
              </li>
              <li className="flex items-center gap-3">
                <AiOutlineFieldTime size={40} fill="#45b5ef" />
                <p>quick response times</p>
              </li>
              <li className="flex items-center gap-3">
                <FaAmbulance size={40} fill="#45b5ef" />
                <p>well-equipped ambulances</p>
              </li>
            </ol>
          </div>
          <button className="px-3 bg-primary text-white py-3 uppercase border rounded-md">
            Book Now
          </button>
          <button className="px-3 bg-black text-white uppercase border rounded-md py-3 w-[250px]">
            Call Us: 0720179897
          </button>
        </div>
        <div className="relative w-full h-full">
          <Image
            src="/images/ambulance.jpg"
            alt="ambulance"
            priority
            fill
            className="object-cover"
          />
        </div>
      </div>
      <div className="flex flex-col items-center   mt-10">
        <h2 className="font-semibold text-2xl">
          Choose from the Ambulances below
        </h2>
      </div>
    </main>
  );
}
