import Link from "next/link";
import { CheckIcon } from "@heroicons/react/24/solid";

const packages = [
  {
    name: "Baslangic",
    duration: "1 Ay",
    price: "1.500",
    features: [
      "Kisisel antrenman programi",
      "Kisisel beslenme programi",
      "Haftalik program guncelleme",
      "WhatsApp destek",
    ],
    popular: false,
  },
  {
    name: "Donusum",
    duration: "3 Ay",
    price: "3.500",
    features: [
      "Kisisel antrenman programi",
      "Kisisel beslenme programi",
      "Haftalik program guncelleme",
      "Makro takibi & analiz",
      "7/24 WhatsApp destek",
      "Aylik degerlendirme raporu",
    ],
    popular: true,
  },
  {
    name: "Elite",
    duration: "6 Ay",
    price: "6.000",
    features: [
      "Kisisel antrenman programi",
      "Kisisel beslenme programi",
      "Haftalik program guncelleme",
      "Makro takibi & analiz",
      "7/24 WhatsApp destek",
      "Aylik degerlendirme raporu",
      "Online goruntulu gorusme",
      "Supplement danismanligi",
    ],
    popular: false,
  },
];

export default function Packages() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <p className="text-xs font-semibold uppercase tracking-wider text-accent mb-3">
            Fiyatlandirma
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            Size Uygun Paketi Secin
          </h2>
          <p className="text-muted max-w-2xl mx-auto leading-relaxed">
            Tum paketler kisisel program, profesyonel takip ve surekli iletisim icermektedir.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
          {packages.map((pkg) => (
            <div
              key={pkg.name}
              className={`rounded-2xl border p-8 relative ${
                pkg.popular
                  ? "bg-foreground text-white border-foreground shadow-2xl shadow-foreground/20 scale-[1.03]"
                  : "bg-white border-border"
              }`}
            >
              {pkg.popular && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-accent text-white text-[10px] font-bold uppercase tracking-wider px-4 py-1.5 rounded-full">
                  En Populer
                </div>
              )}

              <div className="mb-8">
                <h3 className={`text-lg font-bold mb-1 ${pkg.popular ? "text-white" : "text-foreground"}`}>
                  {pkg.name}
                </h3>
                <p className={`text-sm ${pkg.popular ? "text-white/50" : "text-muted"}`}>
                  {pkg.duration}
                </p>
                <div className="mt-6">
                  <span className={`text-4xl font-bold ${pkg.popular ? "text-white" : "text-foreground"}`}>
                    {pkg.price}
                  </span>
                  <span className={`ml-1 ${pkg.popular ? "text-white/50" : "text-muted"}`}>
                    TL
                  </span>
                </div>
              </div>

              <ul className="space-y-3.5 mb-10">
                {pkg.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3">
                    <CheckIcon className={`h-4 w-4 flex-shrink-0 mt-0.5 ${pkg.popular ? "text-accent" : "text-accent"}`} />
                    <span className={`text-sm ${pkg.popular ? "text-white/70" : "text-muted"}`}>
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>

              <Link
                href="/giris"
                className={`block w-full text-center rounded-full font-semibold py-3.5 transition text-sm ${
                  pkg.popular
                    ? "bg-white hover:bg-white/90 text-foreground"
                    : "bg-foreground hover:bg-primary-hover text-white"
                }`}
              >
                Hemen Basla
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
