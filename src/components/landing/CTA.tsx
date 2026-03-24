import Link from "next/link";

export default function CTA() {
  return (
    <section className="py-24 bg-background">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="rounded-3xl bg-foreground p-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Degisime Hazir Misin?
          </h2>
          <p className="text-white/60 max-w-xl mx-auto mb-10 leading-relaxed">
            Hemen iletisime gec, sana ozel programinla donusum yolculuguna
            basla. Ilk gorusme tamamen ucretsiz.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/paketler"
              className="rounded-full bg-white hover:bg-white/90 text-foreground font-semibold text-base px-10 py-4 transition"
            >
              Paketleri Incele
            </Link>
            <a
              href="https://wa.me/905374973555"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full bg-white/10 hover:bg-white/20 text-white font-semibold text-base px-10 py-4 border border-white/20 transition"
            >
              WhatsApp ile Ulas
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
