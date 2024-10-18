import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="flex items-center justify-center p-4 text-white bg-[#59A8FF]">
      <Link href="/">
        <span className="text-lg font-bold text-center text-gray-50">
          HOME
        </span>
      </Link>
    </nav>
  );
}
