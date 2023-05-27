import Link from "next/link";

const Footer = () => {
  return (
    <footer className="container py-4 px-10 mx-auto mt-20">
      <div className="flex gap-5 justify-center">
        <Link href="/">AppSaver 🚑</Link>
        <Link href="/about" className="">
          About
        </Link>
        <p className="">Call</p>
        <p className="font-semibold">@designed by Ann</p>
      </div>
    </footer>
  );
};

export default Footer;
