"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut, useSession } from "next-auth/react";
import { cn } from "@/lib/utils";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";

const adminNav = [
  { name: "Genel Bakis", href: "/yonetim" },
  { name: "Danisanlar", href: "/yonetim/danisanlar" },
  { name: "Antrenman Programlari", href: "/yonetim/antrenman-programlari" },
  { name: "Beslenme Programlari", href: "/yonetim/beslenme-programlari" },
  { name: "Paketler", href: "/yonetim/paketler" },
];

const clientNav = [
  { name: "Panel", href: "/panel" },
  { name: "Antrenman", href: "/antrenman" },
  { name: "Beslenme", href: "/beslenme" },
  { name: "Profil", href: "/profil" },
];

export default function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const { data: session } = useSession();

  const isAdmin = session?.user?.role === "admin";
  const navigation = isAdmin ? adminNav : clientNav;

  return (
    <div className="lg:hidden">
      <div className="flex items-center justify-between h-16 px-4 bg-surface border-b border-border">
        <Link
          href={isAdmin ? "/yonetim" : "/panel"}
          className="text-xl font-bold text-primary"
        >
          FitKoc
        </Link>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="text-muted hover:text-foreground p-2"
        >
          {isOpen ? (
            <XMarkIcon className="h-6 w-6" />
          ) : (
            <Bars3Icon className="h-6 w-6" />
          )}
        </button>
      </div>

      {isOpen && (
        <div className="bg-surface border-b border-border px-4 py-3">
          <nav className="space-y-1">
            {navigation.map((item) => {
              const isActive =
                pathname === item.href || pathname.startsWith(item.href + "/");
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className={cn(
                    "block rounded-lg px-3 py-2 text-sm font-medium transition",
                    isActive
                      ? "bg-primary/10 text-primary"
                      : "text-muted hover:text-foreground hover:bg-surface-hover"
                  )}
                >
                  {item.name}
                </Link>
              );
            })}
            <button
              onClick={() =>
                signOut({ callbackUrl: isAdmin ? "/admin-giris" : "/giris" })
              }
              className="block w-full text-left rounded-lg px-3 py-2 text-sm font-medium text-muted hover:text-danger hover:bg-surface-hover transition"
            >
              Cikis Yap
            </button>
          </nav>
        </div>
      )}
    </div>
  );
}
