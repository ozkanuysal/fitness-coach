"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Badge from "@/components/ui/Badge";
import { PageLoading } from "@/components/ui/LoadingSpinner";

export default function BeslenmeDetayPage() {
  const { programId } = useParams();
  const [program, setProgram] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [selectedAlts, setSelectedAlts] = useState<Record<string, number>>({});

  useEffect(() => {
    fetch(`/api/meal-programs/${programId}`)
      .then((r) => r.json())
      .then((data) => setProgram(data))
      .finally(() => setLoading(false));
  }, [programId]);

  if (loading) return <PageLoading />;
  if (!program) return <div className="text-muted">Program bulunamadi</div>;

  const toggleAlt = (key: string, idx: number) => {
    setSelectedAlts((prev) => ({
      ...prev,
      [key]: prev[key] === idx ? -1 : idx,
    }));
  };

  return (
    <div>
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <h1 className="text-2xl font-bold text-foreground">
            {program.baslik}
          </h1>
          <Badge variant={program.aktif ? "success" : "default"}>
            {program.aktif ? "Aktif" : "Tamamlandi"}
          </Badge>
        </div>
        {program.aciklama && (
          <p className="text-muted">{program.aciklama}</p>
        )}
      </div>

      {/* Makro Hedefleri Bar */}
      {program.makroHedefleri?.gunlukKalori && (
        <div className="rounded-xl bg-surface border border-border p-6 mb-6">
          <h2 className="font-semibold text-foreground mb-4">
            Gunluk Makro Hedefleri
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[
              {
                label: "Kalori",
                value: program.makroHedefleri.gunlukKalori,
                unit: "kcal",
                color: "bg-primary",
              },
              {
                label: "Protein",
                value: program.makroHedefleri.gunlukProtein,
                unit: "g",
                color: "bg-info",
              },
              {
                label: "Karbonhidrat",
                value: program.makroHedefleri.gunlukKarbonhidrat,
                unit: "g",
                color: "bg-accent",
              },
              {
                label: "Yag",
                value: program.makroHedefleri.gunlukYag,
                unit: "g",
                color: "bg-warning",
              },
            ].map((m) => (
              <div key={m.label} className="text-center">
                <p className="text-2xl font-bold text-foreground">
                  {m.value || "-"}
                </p>
                <p className="text-xs text-muted">
                  {m.label} ({m.unit})
                </p>
                <div className="mt-2 h-2 rounded-full bg-background overflow-hidden">
                  <div className={`h-full rounded-full ${m.color}`} style={{ width: "100%" }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Gunler */}
      <div className="space-y-6">
        {program.gunler?.map((gun: any, gunIdx: number) => (
          <div
            key={gunIdx}
            className="rounded-xl bg-surface border border-border overflow-hidden"
          >
            <div className="px-6 py-4 border-b border-border bg-surface-hover/30 flex items-center justify-between">
              <h2 className="font-semibold text-foreground">{gun.gun}</h2>
              {gun.toplamMakro && (
                <span className="text-xs text-primary">
                  {gun.toplamMakro.kalori} kcal | P:{gun.toplamMakro.protein}g K:
                  {gun.toplamMakro.karbonhidrat}g Y:{gun.toplamMakro.yag}g
                </span>
              )}
            </div>

            <div className="divide-y divide-border">
              {gun.ogunler?.map((ogun: any, ogunIdx: number) => {
                const altKey = `${gunIdx}-${ogunIdx}`;
                const selectedAlt = selectedAlts[altKey] ?? -1;

                const displayYemekler =
                  selectedAlt >= 0
                    ? ogun.alternatifler[selectedAlt]?.yemekler
                    : ogun.yemekler;

                return (
                  <div key={ogunIdx} className="px-6 py-4">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <h3 className="font-medium text-foreground">
                          {ogun.ogunAdi}
                        </h3>
                        {ogun.saat && (
                          <span className="text-xs text-muted">
                            ({ogun.saat})
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Secenek butonlari */}
                    {ogun.alternatifler?.length > 0 && (
                      <div className="flex gap-2 mb-3">
                        <button
                          onClick={() => toggleAlt(altKey, -1)}
                          className={`text-xs px-3 py-1 rounded-full transition ${
                            selectedAlt === -1
                              ? "bg-primary text-white"
                              : "bg-background text-muted hover:text-foreground"
                          }`}
                        >
                          Ana Secenek
                        </button>
                        {ogun.alternatifler.map((alt: any, altIdx: number) => (
                          <button
                            key={altIdx}
                            onClick={() => toggleAlt(altKey, altIdx)}
                            className={`text-xs px-3 py-1 rounded-full transition ${
                              selectedAlt === altIdx
                                ? "bg-accent text-white"
                                : "bg-background text-muted hover:text-foreground"
                            }`}
                          >
                            {alt.baslik}
                          </button>
                        ))}
                      </div>
                    )}

                    {/* Yemek listesi */}
                    <div className="space-y-2">
                      {displayYemekler?.map((y: any, yIdx: number) => (
                        <div
                          key={yIdx}
                          className="flex items-center justify-between bg-background rounded-lg px-4 py-2"
                        >
                          <div>
                            <p className="text-sm font-medium text-foreground">
                              {y.yemekAdi}
                            </p>
                            <p className="text-xs text-muted">{y.miktar}</p>
                          </div>
                          <div className="flex items-center gap-3 text-xs text-muted">
                            <span className="text-primary font-medium">
                              {y.kalori} kcal
                            </span>
                            <span>P:{y.protein}g</span>
                            <span>K:{y.karbonhidrat}g</span>
                            <span>Y:{y.yag}g</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
