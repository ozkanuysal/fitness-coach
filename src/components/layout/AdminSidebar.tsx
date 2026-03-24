"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import { cn } from "@/lib/utils";
import {
  HomeIcon,
  UsersIcon,
  ClipboardDocumentListIcon,
  CakeIcon,
  ArrowRightOnRectangleIcon,
  CubeIcon,
} from "@heroicons/react/24/outline";

const navigation = [
  { name: "Genel Bakis", href: "/yonetim", icon: HomeIcon },
  { name: "Danisanlar", href: "/yonetim/danisanlar", icon: UsersIcon },
  {
    name: "Antrenman Programlari",
    href: "/yonetim/antrenman-programlari",
    icon: ClipboardDocumentListIcon,
  },
  {
    name: "Beslenme Programlari",
    href: "/yonetim/beslenme-programlari",
    icon: CakeIcon,
  },
  { name: "Paketler", href: "/yonetim/paketler", icon: CubeIcon },
];

export default function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden lg:flex lg:flex-col lg:w-64 lg:fixed lg:inset-y-0 bg-white border-r border-border">
      <div className="flex items-center h-16 px-6 border-b border-border">
        <Link href="/yonetim" className="text-xl font-bold text-foreground">
          FitKoc
        </Link>
        <span className="ml-2 text-[10px] text-muted bg-surface-hover px-2 py-0.5 rounded-full uppercase tracking-wider font-semibold">
          Admin
        </span>
      </div>

      <nav className="flex-1 overflow-y-auto py-4 px-3">
        <ul className="space-y-1">
          {navigation.map((item) => {
            const isActive =
              pathname === item.href ||
              (item.href !== "/yonetim" && pathname.startsWith(item.href));
            return (
              <li key={item.name}>
                <Link
                  href={item.href}
                  className={cn(
                    "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition",
                    isActive
                      ? "bg-surface-hover text-foreground"
                      : "text-muted hover:text-foreground hover:bg-surface-hover"
                  )}
                >
                  <item.icon className="h-5 w-5 flex-shrink-0" />
                  {item.name}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="border-t border-border p-3">
        <button
          onClick={() => signOut({ callbackUrl: "/admin-giris" })}
          className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-muted hover:text-danger hover:bg-surface-hover transition"
        >
          <ArrowRightOnRectangleIcon className="h-5 w-5" />
          Cikis Yap
        </button>
      </div>
    </aside>
  );
}
