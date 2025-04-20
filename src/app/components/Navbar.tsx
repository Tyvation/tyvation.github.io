"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/projects", label: "Projects" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const path = usePathname();

  return (
    <nav className="fixed top-0 left-0 w-full bg-white border-b z-50">
      <div className="max-w-3xl mx-auto px-4 py-3 flex justify-between items-center">
        <div className="text-lg font-bold text-black">MyPortfolio</div>
        <div className="space-x-4">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`text-sm hover:underline ${
                path === item.href 
                  ? "font-semibold underline text-black" 
                  : "font-bold text-gray-400"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}
