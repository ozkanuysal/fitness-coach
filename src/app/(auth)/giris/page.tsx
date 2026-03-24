import LoginForm from "@/components/auth/LoginForm";
import Link from "next/link";

export const metadata = {
  title: "Giris Yap - FitKoc",
};

export default function GirisPage() {
  return (
    <>
      <LoginForm role="client" />
      <p className="text-center text-sm text-muted mt-4">
        <Link href="/" className="hover:text-primary transition">
          &larr; Anasayfaya Don
        </Link>
      </p>
    </>
  );
}
