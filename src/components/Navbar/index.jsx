import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="flex items-center justify-center p-4 text-white bg-blue-600">
      <Link href="/">
        <span className="text-lg font-bold text-center">
          TEKNOLOGI INFORMASI
        </span>
      </Link>
    </nav>
  );
}
