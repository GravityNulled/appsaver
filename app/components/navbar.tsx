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
          <Link href="/about" className="font-semibold">
            About
          </Link>
          <Link href="/book" className="font-semibold">
            Book
          </Link>
          <p className="font-semibold">Call</p>
          <div className="items-center flex gap-2">
            {session ? (
              <div className="flex items-center gap-2">
                <p>Welcome {session.user?.name}</p>
                {/* <Image
                  src={session.user?.image || "/images/image3.jpeg"}
                  alt="user"
                  width={40}
                  height={40}
                /> */}
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
                  Sign Up
                </Link>
                <button
                  onClick={() => signIn()}
                  className="px-3 py-1 uppercase border rounded-md"
                >
                  Sign In
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
