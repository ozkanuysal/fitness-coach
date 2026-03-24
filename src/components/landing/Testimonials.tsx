const testimonials = [
  {
    name: "Ahmet Y.",
    result: "3 ayda 12 kg verdi",
    text: "FitKoc ile hayatim degisti. Programlar tam bana ozeldi ve sonuclari ilk 3 haftada gormeye basladim. Beslenme plani cok pratik.",
    before: "92 kg",
    after: "80 kg",
  },
  {
    name: "Elif K.",
    result: "4 ayda hedef kiloya ulasti",
    text: "Beslenme programindaki alternatif secenekler inanilmaz pratik. Hic kisitlanmis hissetmedim, surdurulebilir bir yasam tarzi edindim.",
    before: "73 kg",
    after: "62 kg",
  },
  {
    name: "Mehmet S.",
    result: "6 ayda kas kutlesini artirdi",
    text: "Antrenman programlari bilimsel ve olculebilir. Her hafta ilerleme kaydettim. Koc ile surekli iletisim motivasyonumu hep yuksek tuttu.",
    before: "68 kg",
    after: "78 kg",
  },
];

export default function Testimonials() {
  return (
    <section className="py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <p className="text-xs font-semibold uppercase tracking-wider text-accent mb-3">
            Gercek Sonuclar
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            Danisan Deneyimleri
          </h2>
          <p className="text-muted max-w-2xl mx-auto leading-relaxed">
            Programlarimizla hedefe ulasan danisanlarimizin gercek hikayeleri.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t) => (
            <div
              key={t.name}
              className="rounded-2xl bg-white border border-border p-8"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="w-11 h-11 rounded-full bg-foreground flex items-center justify-center">
                  <span className="text-white font-semibold text-sm">
                    {t.name[0]}
                  </span>
                </div>
                <div>
                  <p className="font-semibold text-foreground text-sm">{t.name}</p>
                  <p className="text-xs text-accent font-medium">{t.result}</p>
                </div>
              </div>

              <p className="text-sm text-muted leading-relaxed mb-6">&ldquo;{t.text}&rdquo;</p>

              <div className="flex items-center gap-4 pt-6 border-t border-border">
                <div className="text-center flex-1">
                  <p className="text-[10px] uppercase tracking-wider text-muted mb-1">Once</p>
                  <p className="text-lg font-bold text-foreground">{t.before}</p>
                </div>
                <div className="text-accent text-lg">&rarr;</div>
                <div className="text-center flex-1">
                  <p className="text-[10px] uppercase tracking-wider text-muted mb-1">Sonra</p>
                  <p className="text-lg font-bold text-success">{t.after}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
