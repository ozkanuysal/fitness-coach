"use client";

import { Suspense, useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import toast from "react-hot-toast";
import Input from "@/components/ui/Input";
import { PageLoading } from "@/components/ui/LoadingSpinner";
import Select from "@/components/ui/Select";
import Textarea from "@/components/ui/Textarea";
import Button from "@/components/ui/Button";
import {
  PlusIcon,
  TrashIcon,
  ChevronDownIcon,
  ChevronUpIcon,
} from "@heroicons/react/24/outline";

interface YemekData {
  yemekId: string;
  yemekAdi: string;
  miktar: string;
  kalori: number;
  protein: number;
  karbonhidrat: number;
  yag: number;
  notlar: string;
}

interface AlternatifData {
  baslik: string;
  yemekler: YemekData[];
}

interface OgunData {
  ogunAdi: string;
  saat: string;
  yemekler: YemekData[];
  alternatifler: AlternatifData[];
}

interface GunData {
  gun: string;
  ogunler: OgunData[];
  isOpen: boolean;
}

const OGUN_TIPLERI = ["Kahvalti", "Ara Ogun 1", "Ogle", "Ara Ogun 2", "Aksam"];
const GUNLER = ["Pazartesi", "Sali", "Carsamba", "Persembe", "Cuma", "Cumartesi", "Pazar"];

const emptyYemek = (): YemekData => ({
  yemekId: "",
  yemekAdi: "",
  miktar: "",
  kalori: 0,
  protein: 0,
  karbonhidrat: 0,
  yag: 0,
  notlar: "",
});

export default function YeniBeslenmeProgramiPage() {
  return (
    <Suspense fallback={<PageLoading />}>
      <YeniBeslenmeProgramiContent />
    </Suspense>
  );
}

function YeniBeslenmeProgramiContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const preselectedDanisan = searchParams.get("danisan") || "";

  const [loading, setLoading] = useState(false);
  const [clients, setClients] = useState<any[]>([]);
  const [meals, setMeals] = useState<any[]>([]);
  const [baslik, setBaslik] = useState("");
  const [aciklama, setAciklama] = useState("");
  const [danisanId, setDanisanId] = useState(preselectedDanisan);
  const [baslangicTarihi, setBaslangicTarihi] = useState("");
  const [bitisTarihi, setBitisTarihi] = useState("");
  const [makroHedefleri, setMakroHedefleri] = useState({
    gunlukKalori: "",
    gunlukProtein: "",
    gunlukKarbonhidrat: "",
    gunlukYag: "",
  });
  const [gunler, setGunler] = useState<GunData[]>([
    {
      gun: "Pazartesi",
      ogunler: [{ ogunAdi: "Kahvalti", saat: "08:00", yemekler: [emptyYemek()], alternatifler: [] }],
      isOpen: true,
    },
  ]);

  useEffect(() => {
    Promise.all([
      fetch("/api/clients").then((r) => r.json()),
      fetch("/api/meals").then((r) => r.json()),
    ]).then(([c, m]) => {
      setClients(c);
      setMeals(m);
    });
  }, []);

  const addDay = () => {
    const usedDays = gunler.map((g) => g.gun);
    const nextDay = GUNLER.find((d) => !usedDays.includes(d)) || `Gun ${gunler.length + 1}`;
    setGunler([
      ...gunler,
      {
        gun: nextDay,
        ogunler: [{ ogunAdi: "Kahvalti", saat: "08:00", yemekler: [emptyYemek()], alternatifler: [] }],
        isOpen: true,
      },
    ]);
  };

  const removeDay = (idx: number) => setGunler(gunler.filter((_, i) => i !== idx));
  const toggleDay = (idx: number) =>
    setGunler(gunler.map((g, i) => (i === idx ? { ...g, isOpen: !g.isOpen } : g)));

  const addOgun = (dayIdx: number) => {
    setGunler(
      gunler.map((g, i) =>
        i === dayIdx
          ? {
              ...g,
              ogunler: [
                ...g.ogunler,
                { ogunAdi: OGUN_TIPLERI[g.ogunler.length] || "Ogun", saat: "", yemekler: [emptyYemek()], alternatifler: [] },
              ],
            }
          : g
      )
    );
  };

  const removeOgun = (dayIdx: number, ogunIdx: number) => {
    setGunler(
      gunler.map((g, i) =>
        i === dayIdx ? { ...g, ogunler: g.ogunler.filter((_, j) => j !== ogunIdx) } : g
      )
    );
  };

  const addYemek = (dayIdx: number, ogunIdx: number) => {
    setGunler(
      gunler.map((g, i) =>
        i === dayIdx
          ? {
              ...g,
              ogunler: g.ogunler.map((o, j) =>
                j === ogunIdx ? { ...o, yemekler: [...o.yemekler, emptyYemek()] } : o
              ),
            }
          : g
      )
    );
  };

  const removeYemek = (dayIdx: number, ogunIdx: number, yemekIdx: number) => {
    setGunler(
      gunler.map((g, i) =>
        i === dayIdx
          ? {
              ...g,
              ogunler: g.ogunler.map((o, j) =>
                j === ogunIdx
                  ? { ...o, yemekler: o.yemekler.filter((_, k) => k !== yemekIdx) }
                  : o
              ),
            }
          : g
      )
    );
  };

  const updateYemek = (
    dayIdx: number,
    ogunIdx: number,
    yemekIdx: number,
    field: string,
    value: any
  ) => {
    setGunler(
      gunler.map((g, i) =>
        i === dayIdx
          ? {
              ...g,
              ogunler: g.ogunler.map((o, j) =>
                j === ogunIdx
                  ? {
                      ...o,
                      yemekler: o.yemekler.map((y, k) => {
                        if (k !== yemekIdx) return y;
                        if (field === "yemekId") {
                          const found = meals.find((m: any) => m._id === value);
                          if (found) {
                            return {
                              ...y,
                              yemekId: value,
                              yemekAdi: found.ad,
                              kalori: found.kalori || 0,
                              protein: found.protein || 0,
                              karbonhidrat: found.karbonhidrat || 0,
                              yag: found.yag || 0,
                            };
                          }
                        }
                        return { ...y, [field]: value };
                      }),
                    }
                  : o
              ),
            }
          : g
      )
    );
  };

  // Alternatif secenekler
  const addAlternatif = (dayIdx: number, ogunIdx: number) => {
    setGunler(
      gunler.map((g, i) =>
        i === dayIdx
          ? {
              ...g,
              ogunler: g.ogunler.map((o, j) =>
                j === ogunIdx
                  ? {
                      ...o,
                      alternatifler: [
                        ...o.alternatifler,
                        {
                          baslik: `Secenek ${o.alternatifler.length + 2}`,
                          yemekler: [emptyYemek()],
                        },
                      ],
                    }
                  : o
              ),
            }
          : g
      )
    );
  };

  const removeAlternatif = (dayIdx: number, ogunIdx: number, altIdx: number) => {
    setGunler(
      gunler.map((g, i) =>
        i === dayIdx
          ? {
              ...g,
              ogunler: g.ogunler.map((o, j) =>
                j === ogunIdx
                  ? { ...o, alternatifler: o.alternatifler.filter((_, k) => k !== altIdx) }
                  : o
              ),
            }
          : g
      )
    );
  };

  const addAltYemek = (dayIdx: number, ogunIdx: number, altIdx: number) => {
    setGunler(
      gunler.map((g, i) =>
        i === dayIdx
          ? {
              ...g,
              ogunler: g.ogunler.map((o, j) =>
                j === ogunIdx
                  ? {
                      ...o,
                      alternatifler: o.alternatifler.map((a, k) =>
                        k === altIdx
                          ? { ...a, yemekler: [...a.yemekler, emptyYemek()] }
                          : a
                      ),
                    }
                  : o
              ),
            }
          : g
      )
    );
  };

  const updateAltYemek = (
    dayIdx: number,
    ogunIdx: number,
    altIdx: number,
    yemekIdx: number,
    field: string,
    value: any
  ) => {
    setGunler(
      gunler.map((g, i) =>
        i === dayIdx
          ? {
              ...g,
              ogunler: g.ogunler.map((o, j) =>
                j === ogunIdx
                  ? {
                      ...o,
                      alternatifler: o.alternatifler.map((a, k) =>
                        k === altIdx
                          ? {
                              ...a,
                              yemekler: a.yemekler.map((y, l) => {
                                if (l !== yemekIdx) return y;
                                if (field === "yemekId") {
                                  const found = meals.find((m: any) => m._id === value);
                                  if (found) {
                                    return {
                                      ...y,
                                      yemekId: value,
                                      yemekAdi: found.ad,
                                      kalori: found.kalori || 0,
                                      protein: found.protein || 0,
                                      karbonhidrat: found.karbonhidrat || 0,
                                      yag: found.yag || 0,
                                    };
                                  }
                                }
                                return { ...y, [field]: value };
                              }),
                            }
                          : a
                      ),
                    }
                  : o
              ),
            }
          : g
      )
    );
  };

  // Makro hesaplama
  const calcDayMacros = (ogunler: OgunData[]) => {
    let kalori = 0, protein = 0, karbonhidrat = 0, yag = 0;
    ogunler.forEach((o) => {
      o.yemekler.forEach((y) => {
        kalori += y.kalori || 0;
        protein += y.protein || 0;
        karbonhidrat += y.karbonhidrat || 0;
        yag += y.yag || 0;
      });
    });
    return { kalori, protein, karbonhidrat, yag };
  };

  const YemekSecici = ({
    yemek,
    onUpdate,
    onRemove,
  }: {
    yemek: YemekData;
    onUpdate: (field: string, value: any) => void;
    onRemove: () => void;
  }) => (
    <div className="flex items-start gap-2">
      <div className="flex-1 grid grid-cols-2 sm:grid-cols-4 gap-2">
        <select
          value={yemek.yemekId}
          onChange={(e) => onUpdate("yemekId", e.target.value)}
          className="col-span-2 rounded bg-surface border border-border px-2 py-1.5 text-sm text-foreground"
        >
          <option value="">Yemek sec</option>
          {meals.map((m: any) => (
            <option key={m._id} value={m._id}>
              {m.ad} ({m.kalori} kcal)
            </option>
          ))}
        </select>
        <input
          type="text"
          value={yemek.miktar}
          onChange={(e) => onUpdate("miktar", e.target.value)}
          className="rounded bg-surface border border-border px-2 py-1.5 text-sm text-foreground"
          placeholder="Miktar"
        />
        <div className="flex items-center gap-1 text-xs text-muted">
          <span className="text-primary">{yemek.kalori}kcal</span>
          <span>P:{yemek.protein}g</span>
          <span>K:{yemek.karbonhidrat}g</span>
          <span>Y:{yemek.yag}g</span>
        </div>
      </div>
      <button
        type="button"
        onClick={onRemove}
        className="mt-1 text-muted hover:text-danger transition"
      >
        <TrashIcon className="h-4 w-4" />
      </button>
    </div>
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!danisanId) {
      toast.error("Lutfen bir danisan secin");
      return;
    }
    setLoading(true);

    try {
      const payload = {
        baslik,
        aciklama,
        danisanId,
        baslangicTarihi: baslangicTarihi || undefined,
        bitisTarihi: bitisTarihi || undefined,
        makroHedefleri: {
          gunlukKalori: Number(makroHedefleri.gunlukKalori) || undefined,
          gunlukProtein: Number(makroHedefleri.gunlukProtein) || undefined,
          gunlukKarbonhidrat: Number(makroHedefleri.gunlukKarbonhidrat) || undefined,
          gunlukYag: Number(makroHedefleri.gunlukYag) || undefined,
        },
        gunler: gunler.map(({ isOpen, ...g }) => ({
          ...g,
          toplamMakro: calcDayMacros(g.ogunler),
        })),
      };

      const res = await fetch("/api/meal-programs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Bir hata olustu");
      }

      toast.success("Beslenme programi olusturuldu!");
      router.push("/yonetim/beslenme-programlari");
      router.refresh();
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-foreground">
          Yeni Beslenme Programi
        </h1>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Program Bilgileri */}
        <div className="rounded-xl bg-surface border border-border p-6 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input label="Program Basligi" value={baslik} onChange={(e) => setBaslik(e.target.value)} required placeholder="orn. Kilo Verme Programi" />
            <Select label="Danisan" value={danisanId} onChange={(e) => setDanisanId(e.target.value)} placeholder="Danisan secin" options={clients.map((c: any) => ({ value: c._id, label: `${c.ad} ${c.soyad}` }))} />
          </div>
          <Textarea label="Aciklama" value={aciklama} onChange={(e) => setAciklama(e.target.value)} placeholder="Program hakkinda notlar..." />
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <Input label="Baslangic Tarihi" type="date" value={baslangicTarihi} onChange={(e) => setBaslangicTarihi(e.target.value)} />
            <Input label="Bitis Tarihi" type="date" value={bitisTarihi} onChange={(e) => setBitisTarihi(e.target.value)} />
          </div>
        </div>

        {/* Makro Hedefleri */}
        <div className="rounded-xl bg-surface border border-border p-6">
          <h3 className="font-semibold text-foreground mb-4">Gunluk Makro Hedefleri</h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <Input label="Kalori (kcal)" type="number" value={makroHedefleri.gunlukKalori} onChange={(e) => setMakroHedefleri({ ...makroHedefleri, gunlukKalori: e.target.value })} />
            <Input label="Protein (g)" type="number" value={makroHedefleri.gunlukProtein} onChange={(e) => setMakroHedefleri({ ...makroHedefleri, gunlukProtein: e.target.value })} />
            <Input label="Karbonhidrat (g)" type="number" value={makroHedefleri.gunlukKarbonhidrat} onChange={(e) => setMakroHedefleri({ ...makroHedefleri, gunlukKarbonhidrat: e.target.value })} />
            <Input label="Yag (g)" type="number" value={makroHedefleri.gunlukYag} onChange={(e) => setMakroHedefleri({ ...makroHedefleri, gunlukYag: e.target.value })} />
          </div>
        </div>

        {/* Gunler */}
        <div className="space-y-4">
          {gunler.map((day, dayIdx) => {
            const dayMacros = calcDayMacros(day.ogunler);
            return (
              <div key={dayIdx} className="rounded-xl bg-surface border border-border overflow-hidden">
                <div className="flex items-center justify-between px-6 py-4 cursor-pointer hover:bg-surface-hover/50 transition" onClick={() => toggleDay(dayIdx)}>
                  <div className="flex items-center gap-3">
                    {day.isOpen ? <ChevronUpIcon className="h-5 w-5 text-muted" /> : <ChevronDownIcon className="h-5 w-5 text-muted" />}
                    <h3 className="font-semibold text-foreground">{day.gun}</h3>
                    <span className="text-xs text-primary">
                      {dayMacros.kalori} kcal | P:{dayMacros.protein}g K:{dayMacros.karbonhidrat}g Y:{dayMacros.yag}g
                    </span>
                  </div>
                  <button type="button" onClick={(e) => { e.stopPropagation(); removeDay(dayIdx); }} className="text-muted hover:text-danger transition">
                    <TrashIcon className="h-4 w-4" />
                  </button>
                </div>

                {day.isOpen && (
                  <div className="px-6 pb-6 space-y-4">
                    <Select label="Gun" value={day.gun} onChange={(e) => setGunler(gunler.map((g, i) => i === dayIdx ? { ...g, gun: e.target.value } : g))} options={GUNLER.map((g) => ({ value: g, label: g }))} />

                    {/* Ogunler */}
                    {day.ogunler.map((ogun, ogunIdx) => (
                      <div key={ogunIdx} className="rounded-lg bg-background border border-border p-4 space-y-3">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4">
                            <select value={ogun.ogunAdi} onChange={(e) => setGunler(gunler.map((g, i) => i === dayIdx ? { ...g, ogunler: g.ogunler.map((o, j) => j === ogunIdx ? { ...o, ogunAdi: e.target.value } : o) } : g))} className="rounded bg-surface border border-border px-2 py-1.5 text-sm text-foreground font-medium">
                              {OGUN_TIPLERI.map((t) => <option key={t} value={t}>{t}</option>)}
                            </select>
                            <input type="time" value={ogun.saat} onChange={(e) => setGunler(gunler.map((g, i) => i === dayIdx ? { ...g, ogunler: g.ogunler.map((o, j) => j === ogunIdx ? { ...o, saat: e.target.value } : o) } : g))} className="rounded bg-surface border border-border px-2 py-1.5 text-sm text-foreground" />
                          </div>
                          <button type="button" onClick={() => removeOgun(dayIdx, ogunIdx)} className="text-muted hover:text-danger transition">
                            <TrashIcon className="h-4 w-4" />
                          </button>
                        </div>

                        {/* Ana yemekler */}
                        <div className="space-y-2">
                          <p className="text-xs font-medium text-muted">Ana Secenek</p>
                          {ogun.yemekler.map((y, yIdx) => (
                            <YemekSecici
                              key={yIdx}
                              yemek={y}
                              onUpdate={(field, value) => updateYemek(dayIdx, ogunIdx, yIdx, field, value)}
                              onRemove={() => removeYemek(dayIdx, ogunIdx, yIdx)}
                            />
                          ))}
                          <button type="button" onClick={() => addYemek(dayIdx, ogunIdx)} className="text-xs text-primary hover:text-primary-hover transition">
                            + Yemek Ekle
                          </button>
                        </div>

                        {/* Alternatifler */}
                        {ogun.alternatifler.map((alt, altIdx) => (
                          <div key={altIdx} className="ml-4 pl-4 border-l-2 border-accent/30 space-y-2">
                            <div className="flex items-center justify-between">
                              <input
                                type="text"
                                value={alt.baslik}
                                onChange={(e) =>
                                  setGunler(gunler.map((g, i) => i === dayIdx ? { ...g, ogunler: g.ogunler.map((o, j) => j === ogunIdx ? { ...o, alternatifler: o.alternatifler.map((a, k) => k === altIdx ? { ...a, baslik: e.target.value } : a) } : o) } : g))
                                }
                                className="rounded bg-surface border border-border px-2 py-1 text-xs font-medium text-accent"
                              />
                              <button type="button" onClick={() => removeAlternatif(dayIdx, ogunIdx, altIdx)} className="text-muted hover:text-danger transition">
                                <TrashIcon className="h-3 w-3" />
                              </button>
                            </div>
                            {alt.yemekler.map((y, yIdx) => (
                              <YemekSecici
                                key={yIdx}
                                yemek={y}
                                onUpdate={(field, value) => updateAltYemek(dayIdx, ogunIdx, altIdx, yIdx, field, value)}
                                onRemove={() =>
                                  setGunler(gunler.map((g, i) => i === dayIdx ? { ...g, ogunler: g.ogunler.map((o, j) => j === ogunIdx ? { ...o, alternatifler: o.alternatifler.map((a, k) => k === altIdx ? { ...a, yemekler: a.yemekler.filter((_, l) => l !== yIdx) } : a) } : o) } : g))
                                }
                              />
                            ))}
                            <button type="button" onClick={() => addAltYemek(dayIdx, ogunIdx, altIdx)} className="text-xs text-accent hover:text-accent-hover transition">
                              + Yemek Ekle
                            </button>
                          </div>
                        ))}

                        <button type="button" onClick={() => addAlternatif(dayIdx, ogunIdx)} className="text-xs text-accent hover:text-accent-hover transition border border-dashed border-accent/30 rounded px-2 py-1">
                          + Alternatif Secenek Ekle
                        </button>
                      </div>
                    ))}

                    <Button type="button" variant="secondary" size="sm" onClick={() => addOgun(dayIdx)}>
                      <PlusIcon className="h-4 w-4 mr-1" />
                      Ogun Ekle
                    </Button>
                  </div>
                )}
              </div>
            );
          })}

          <Button type="button" variant="secondary" onClick={addDay}>
            <PlusIcon className="h-4 w-4 mr-2" />
            Gun Ekle
          </Button>
        </div>

        <div className="flex gap-3">
          <Button type="submit" disabled={loading} size="lg">
            {loading ? "Kaydediliyor..." : "Programi Kaydet"}
          </Button>
          <Button type="button" variant="secondary" size="lg" onClick={() => router.back()}>
            Iptal
          </Button>
        </div>
      </form>
    </div>
  );
}
