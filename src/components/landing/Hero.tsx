import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Subtle gradient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-white via-background to-background" />
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-accent/[0.03] rounded-full blur-3xl -translate-y-1/2 translate-x-1/4" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-accent/[0.03] rounded-full blur-3xl translate-y-1/2 -translate-x-1/4" />

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-24">
        <div className="inline-flex items-center gap-2 bg-accent/10 border border-accent/20 rounded-full px-5 py-2 mb-10">
          <span className="w-1.5 h-1.5 bg-accent rounded-full animate-pulse" />
          <span className="text-xs tracking-wide uppercase font-semibold text-accent">
            Sinirli Kontenjan &mdash; Yeni Kayitlar Acik
          </span>
        </div>

        <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold text-foreground mb-8 leading-[1.1] tracking-tight">
          Vucudunu Donustur,
          <br />
          <span className="text-accent">Hayatini Degistir.</span>
        </h1>

        <p className="text-lg sm:text-xl text-muted max-w-2xl mx-auto mb-12 leading-relaxed">
          Bilimsel temelli, size ozel tasarlanmis antrenman ve beslenme
          programlari ile hedefinize en kisa surede ulasin.
          Profesyonel rehberlik, olculebilir sonuclar.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
          <Link
            href="/paketler"
            className="rounded-full bg-foreground hover:bg-primary-hover text-white font-semibold text-base px-10 py-4 transition shadow-lg shadow-foreground/10"
          >
            Ucretsiz Onden Gorusme
          </Link>
          <Link
            href="/giris"
            className="rounded-full bg-white hover:bg-surface-hover text-foreground font-semibold text-base px-10 py-4 border border-border transition"
          >
            Danisan Girisi
          </Link>
        </div>

        <p className="text-xs text-muted mb-20">
          Ilk gorusme tamamen ucretsizdir. Herhangi bir baglilik gerektirmez.
        </p>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-8 max-w-md mx-auto">
          <div>
            <p className="text-3xl sm:text-4xl font-bold text-foreground">150+</p>
            <p className="text-sm text-muted mt-1">Mutlu Danisan</p>
          </div>
          <div>
            <p className="text-3xl sm:text-4xl font-bold text-foreground">5+</p>
            <p className="text-sm text-muted mt-1">Yil Deneyim</p>
          </div>
          <div>
            <p className="text-3xl sm:text-4xl font-bold text-foreground">%98</p>
            <p className="text-sm text-muted mt-1">Memnuniyet</p>
          </div>
        </div>
      </div>
    </section>
  );
}
