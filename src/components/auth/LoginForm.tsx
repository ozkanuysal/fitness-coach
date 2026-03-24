"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

interface LoginFormProps {
  role: "admin" | "client";
}

export default function LoginForm({ role }: LoginFormProps) {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (result?.error) {
        toast.error("Email veya sifre hatali");
      } else {
        toast.success("Giris basarili!");
        router.push(role === "admin" ? "/yonetim" : "/panel");
        router.refresh();
      }
    } catch {
      toast.error("Bir hata olustu");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="rounded-2xl bg-white border border-border p-10 shadow-sm">
      <div className="text-center mb-8">
        <h1 className="text-2xl font-bold text-foreground mb-2">FitKoc</h1>
        <p className="text-sm text-muted">
          {role === "admin"
            ? "Koc Paneline Giris"
            : "Danisan Paneline Giris"}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-foreground mb-1.5"
          >
            Email
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full rounded-xl bg-background border border-border px-4 py-3 text-foreground placeholder-muted/50 focus:outline-none focus:ring-2 focus:ring-foreground/20 focus:border-foreground/30 transition"
            placeholder="ornek@email.com"
          />
        </div>

        <div>
          <label
            htmlFor="password"
            className="block text-sm font-medium text-foreground mb-1.5"
          >
            Sifre
          </label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full rounded-xl bg-background border border-border px-4 py-3 text-foreground placeholder-muted/50 focus:outline-none focus:ring-2 focus:ring-foreground/20 focus:border-foreground/30 transition"
            placeholder="••••••••"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-xl bg-foreground hover:bg-primary-hover text-white font-semibold py-3 px-4 transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? "Giris yapiliyor..." : "Giris Yap"}
        </button>
      </form>

      {role === "client" && (
        <p className="text-center text-sm text-muted mt-6">
          Hesabiniz yok mu?{" "}
          <a href="https://wa.me/905374973555" target="_blank" rel="noopener noreferrer" className="text-foreground font-medium hover:underline">
            Iletisime gecin
          </a>
        </p>
      )}
    </div>
  );
}
