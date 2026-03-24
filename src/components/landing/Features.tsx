import {
  ClipboardDocumentListIcon,
  CakeIcon,
  ChartBarIcon,
  UserGroupIcon,
} from "@heroicons/react/24/outline";

const features = [
  {
    icon: ClipboardDocumentListIcon,
    title: "Kisisel Antrenman Programi",
    description:
      "Vucut yapiniz, deneyim seviyeniz ve hedeflerinize gore bilimsel temelli, gun gun planlanmis antrenman programlari.",
  },
  {
    icon: CakeIcon,
    title: "Ozel Beslenme Plani",
    description:
      "Makro degerleri hesaplanmis, alternatif secenekli beslenme programlari. Diyet degil, surdurulebilir yasam tarzi.",
  },
  {
    icon: ChartBarIcon,
    title: "Makro & Ilerleme Takibi",
    description:
      "Protein, karbonhidrat ve yag dengenizi detayli takip edin. Ilerlemenizi hafta hafta goruntuleyin.",
  },
  {
    icon: UserGroupIcon,
    title: "Surekli Iletisim & Destek",
    description:
      "Sorulariniz icin WhatsApp uzerinden 7/24 ulasabilirsiniz. Motivasyonunuz her zaman yuksekte kalsin.",
  },
];

export default function Features() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <p className="text-xs font-semibold uppercase tracking-wider text-accent mb-3">
            Neden Biz?
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            Sonuc Odakli Yaklasim
          </h2>
          <p className="text-muted max-w-2xl mx-auto leading-relaxed">
            Genel programlar yerine, tamamen size ozel tasarlanmis planlar ve
            profesyonel takip ile hedeflerinize en kisa surede ulasin.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="group"
            >
              <div className="w-12 h-12 rounded-2xl bg-surface-hover flex items-center justify-center mb-5 group-hover:bg-accent/10 transition-colors">
                <feature.icon className="h-6 w-6 text-foreground group-hover:text-accent transition-colors" />
              </div>
              <h3 className="text-base font-semibold text-foreground mb-2">
                {feature.title}
              </h3>
              <p className="text-sm text-muted leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
