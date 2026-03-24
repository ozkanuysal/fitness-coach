"use client";

import Link from "next/link";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";

export default function Navbar() {
  const { data: session } = useSession();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-xl border-b border-border/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="text-xl font-bold text-foreground tracking-tight">
            FitKoc
          </Link>

          {/* Desktop */}
          <div className="hidden md:flex items-center gap-8">
            <Link
              href="/"
              className="text-sm text-muted hover:text-foreground transition"
            >
              Anasayfa
            </Link>
            <Link
              href="/paketler"
              className="text-sm text-muted hover:text-foreground transition"
            >
              Paketler
            </Link>
            <a
              href="mailto:ozkan@uysal.dev"
              className="text-sm text-muted hover:text-foreground transition"
            >
              Iletisim
            </a>
            {session ? (
              <Link
                href={session.user.role === "admin" ? "/yonetim" : "/panel"}
                className="rounded-full bg-foreground hover:bg-primary-hover text-white text-sm font-semibold px-5 py-2 transition"
              >
                Panele Git
              </Link>
            ) : (
              <Link
                href="/giris"
                className="rounded-full bg-foreground hover:bg-primary-hover text-white text-sm font-semibold px-5 py-2 transition"
              >
                Giris Yap
              </Link>
            )}
          </div>

          {/* Mobile toggle */}
          <button
            className="md:hidden text-muted hover:text-foreground p-2"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? (
              <XMarkIcon className="h-6 w-6" />
            ) : (
              <Bars3Icon className="h-6 w-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden bg-white border-t border-border px-4 py-3 space-y-2">
          <Link
            href="/"
            onClick={() => setMobileOpen(false)}
            className="block text-sm text-muted hover:text-foreground py-2"
          >
            Anasayfa
          </Link>
          <Link
            href="/paketler"
            onClick={() => setMobileOpen(false)}
            className="block text-sm text-muted hover:text-foreground py-2"
          >
            Paketler
          </Link>
          <a
            href="mailto:ozkan@uysal.dev"
            onClick={() => setMobileOpen(false)}
            className="block text-sm text-muted hover:text-foreground py-2"
          >
            Iletisim
          </a>
          <Link
            href={session ? (session.user.role === "admin" ? "/yonetim" : "/panel") : "/giris"}
            onClick={() => setMobileOpen(false)}
            className="block rounded-full bg-foreground text-white text-sm font-semibold px-4 py-2.5 text-center mt-2"
          >
            {session ? "Panele Git" : "Giris Yap"}
          </Link>
        </div>
      )}
    </nav>
  );
}
