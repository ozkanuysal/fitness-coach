import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-white border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          <div className="md:col-span-1">
            <h3 className="text-xl font-bold text-foreground mb-3">FitKoc</h3>
            <p className="text-sm text-muted leading-relaxed">
              Profesyonel fitness koclugu ile bilimsel temelli, kisisellestirilmis
              programlar.
            </p>
          </div>

          <div>
            <h4 className="text-xs font-semibold text-foreground uppercase tracking-wider mb-4">
              Sayfalar
            </h4>
            <ul className="space-y-3">
              <li>
                <Link href="/" className="text-sm text-muted hover:text-foreground transition">
                  Anasayfa
                </Link>
              </li>
              <li>
                <Link href="/paketler" className="text-sm text-muted hover:text-foreground transition">
                  Paketler
                </Link>
              </li>
              <li>
                <Link href="/giris" className="text-sm text-muted hover:text-foreground transition">
                  Danisan Girisi
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-semibold text-foreground uppercase tracking-wider mb-4">
              Iletisim
            </h4>
            <ul className="space-y-3 text-sm text-muted">
              <li>
                <a href="mailto:ozkan@uysal.dev" className="hover:text-foreground transition">
                  ozkan@uysal.dev
                </a>
              </li>
              <li>
                <a href="tel:+905374973555" className="hover:text-foreground transition">
                  +90 537 497 35 55
                </a>
              </li>
              <li>Istanbul, Turkiye</li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-semibold text-foreground uppercase tracking-wider mb-4">
              Sosyal Medya
            </h4>
            <ul className="space-y-3 text-sm text-muted">
              <li>
                <a
                  href="https://wa.me/905374973555"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-foreground transition"
                >
                  WhatsApp
                </a>
              </li>
              <li>
                <span className="hover:text-foreground transition cursor-pointer">
                  Instagram
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border mt-12 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-muted">
            &copy; 2026 FitKoc. Tum haklari saklidir.
          </p>
          <p className="text-xs text-muted">
            Designed with care for your fitness journey.
          </p>
        </div>
      </div>
    </footer>
  );
}
