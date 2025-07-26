"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, User, FolderKanban, Mail } from "lucide-react";
import ThemeToggle from "@/app/components/ThemeToggle";

const navItems = [
  { href: "/", icon: <Home size={22} />, label: "Home" },
  { href: "/about", icon: <User size={22} />, label: "About" },
  { href: "/projects", icon: <FolderKanban size={22} />, label: "Projects" },
  { href: "/contact", icon: <Mail size={22} />, label: "Contact" },
];

export default function FloatingNavbar() {
  const path = usePathname();

  return (
    <nav className="fixed top-6 left-1/2 -translate-x-1/2 z-50 bg-foreground backdrop-blur-md shadow-lg border rounded-full px-2 py-1 flex gap-4 items-center">
      {navItems.map((item) => {
        const isActive = path === item.href;
        return (
          <Link
            key={item.href}
            href={item.href}
            className={`relative group w-10 h-10 flex items-center justify-center rounded-full transition transform ${
              isActive
                ? "bg-primary text-white hover:bg-primary-hover hover:scale-110 transition-all duration-300"
                : "text-neutral-300 hover:scale-110 bg-transparent duration-300"
            }`}
          >
            {item.icon}
            <span className="absolute bottom-[-1rem] text-xs text-foreground opacity-0 group-hover:opacity-100 group-hover:text-lg group-hover:bottom-[-2rem] transition-all pointer-events-none">
              {item.label}
            </span>
          </Link>
        );
      })}
      <ThemeToggle/>
    </nav>
  );
}
