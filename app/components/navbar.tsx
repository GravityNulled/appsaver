"use client";

import Link from "next/link";
import { useSession, signOut, signIn } from "next-auth/react";
import { AiOutlineLogout } from "react-icons/ai";
import Image from "next/image";

const Navbar = () => {
  const { data: session } = useSession();
  return (
    <header className="container py-4 px-10 mx-auto">
      <nav className="flex justify-between">
        <Link href="/">AppSaver 🚑</Link>
        <div className="flex gap-4 items-center">
          <Link href="/book" className="font-semibold">
            Book
          </Link>
          <Link
            href="tel: 0720179897"
            className="px-3 bg-black text-white uppercase border rounded-md py-1"
          >
            Call Us
          </Link>
          <div className="items-center flex gap-2">
            {session ? (
              <div className="flex items-center gap-2">
                <p>Welcome {session.user?.name}</p>
                <Image
                  src={session.user?.image || "/images/profile1.jpeg"}
                  alt="profile"
                  width={100}
                  height={100}
                  className="rounded-full h-[40px] w-[40px] object-cover"
                />
                <button
                  onClick={() => signOut()}
                  className="px-3 bg-primary text-white py-1 uppercase border rounded-md"
                >
                  Log out
                </button>
              </div>
            ) : (
              <>
                <Link
                  href={"/register"}
                  className="px-3 bg-primary text-white py-1 uppercase border rounded-md"
                >
                  Register
                </Link>
                <button
                  onClick={() => signIn()}
                  className="px-3 py-1 uppercase border rounded-md"
                >
                  Log In
                </button>
              </>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
