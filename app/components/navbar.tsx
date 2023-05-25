import Link from "next/link";

const Navbar = () => {
  return (
    <header className="container py-4 px-10 mx-auto">
      <nav className="flex justify-between">
        <Link href="/">AppSaver 🚑</Link>
        <div className="flex gap-4 items-center">
          <Link href="/about" className="font-semibold">
            About
          </Link>
          <p className="font-semibold">Call</p>
          <div className="items-center flex gap-2">
            <button className="px-3 bg-primary text-white py-1 uppercase border rounded-md">
              Sign Up
            </button>
            <button className="px-3 py-1 uppercase border rounded-md">
              Sign In
            </button>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
