"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/", label: "Home" },
  { href: "/research", label: "Research" },
  { href: "/dashboards", label: "Dashboards" },
  { href: "/reports", label: "Reports" },
  { href: "/media", label: "Media" },
  { href: "/about", label: "About" },
];

export default function Nav() {
  const pathname = usePathname();
  return (
    <nav className="max-w-3xl mx-auto px-6 py-8 flex items-center justify-between">
      <Link
        href="/"
        className="text-sm font-medium tracking-wide text-[#1A1A1A]"
      >
        Jacob Joseph
      </Link>
      <div className="flex gap-8 text-sm">
        {links.map(({ href, label }) => (
          <Link
            key={href}
            href={href}
            className={`transition-colors ${
              pathname === href
                ? "text-[#1A1A1A] font-medium"
                : "text-[#555] hover:text-[#1A1A1A]"
            }`}
          >
            {label}
          </Link>
        ))}
      </div>
    </nav>
  );
}
