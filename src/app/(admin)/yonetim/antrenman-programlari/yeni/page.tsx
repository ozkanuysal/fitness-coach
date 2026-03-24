"use client";

import { Suspense, useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import toast from "react-hot-toast";
import Input from "@/components/ui/Input";
import Select from "@/components/ui/Select";
import Textarea from "@/components/ui/Textarea";
import Button from "@/components/ui/Button";
import { PageLoading } from "@/components/ui/LoadingSpinner";
import {
  PlusIcon,
  TrashIcon,
  ChevronDownIcon,
  ChevronUpIcon,
} from "@heroicons/react/24/outline";

interface SetData {
  tekrar: number;
  set: number;
  agirlik: string;
  dinlenme: string;
}

interface ExerciseData {
  egzersizId: string;
  egzersizAdi: string;
  setler: SetData[];
  notlar: string;
  sira: number;
}

interface DayData {
  gun: string;
  baslik: string;
  egzersizler: ExerciseData[];
  isOpen: boolean;
}

const GUNLER = [
  "Pazartesi",
  "Sali",
  "Carsamba",
  "Persembe",
  "Cuma",
  "Cumartesi",
  "Pazar",
];

export default function YeniAntrenmanProgramiPage() {
  return (
    <Suspense fallback={<PageLoading />}>
      <YeniAntrenmanProgramiContent />
    </Suspense>
  );
}

function YeniAntrenmanProgramiContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const preselectedDanisan = searchParams.get("danisan") || "";

  const [loading, setLoading] = useState(false);
  const [clients, setClients] = useState<any[]>([]);
  const [exercises, setExercises] = useState<any[]>([]);
  const [baslik, setBaslik] = useState("");
  const [aciklama, setAciklama] = useState("");
  const [danisanId, setDanisanId] = useState(preselectedDanisan);
  const [baslangicTarihi, setBaslangicTarihi] = useState("");
  const [bitisTarihi, setBitisTarihi] = useState("");
  const [gunler, setGunler] = useState<DayData[]>([
    {
      gun: "Pazartesi",
      baslik: "",
      egzersizler: [],
      isOpen: true,
    },
  ]);

  useEffect(() => {
    Promise.all([
      fetch("/api/clients").then((r) => r.json()),
      fetch("/api/exercises").then((r) => r.json()),
    ]).then(([c, e]) => {
      setClients(c);
      setExercises(e);
    });
  }, []);

  const addDay = () => {
    const usedDays = gunler.map((g) => g.gun);
    const nextDay = GUNLER.find((d) => !usedDays.includes(d)) || `Gun ${gunler.length + 1}`;
    setGunler([
      ...gunler,
      { gun: nextDay, baslik: "", egzersizler: [], isOpen: true },
    ]);
  };

  const removeDay = (dayIndex: number) => {
    setGunler(gunler.filter((_, i) => i !== dayIndex));
  };

  const toggleDay = (dayIndex: number) => {
    setGunler(
      gunler.map((g, i) =>
        i === dayIndex ? { ...g, isOpen: !g.isOpen } : g
      )
    );
  };

  const updateDay = (dayIndex: number, field: string, value: string) => {
    setGunler(
      gunler.map((g, i) => (i === dayIndex ? { ...g, [field]: value } : g))
    );
  };

  const addExercise = (dayIndex: number) => {
    setGunler(
      gunler.map((g, i) =>
        i === dayIndex
          ? {
              ...g,
              egzersizler: [
                ...g.egzersizler,
                {
                  egzersizId: "",
                  egzersizAdi: "",
                  setler: [{ tekrar: 12, set: 3, agirlik: "", dinlenme: "60 sn" }],
                  notlar: "",
                  sira: g.egzersizler.length + 1,
                },
              ],
            }
          : g
      )
    );
  };

  const removeExercise = (dayIndex: number, exIndex: number) => {
    setGunler(
      gunler.map((g, i) =>
        i === dayIndex
          ? {
              ...g,
              egzersizler: g.egzersizler.filter((_, j) => j !== exIndex),
            }
          : g
      )
    );
  };

  const updateExercise = (
    dayIndex: number,
    exIndex: number,
    field: string,
    value: any
  ) => {
    setGunler(
      gunler.map((g, i) =>
        i === dayIndex
          ? {
              ...g,
              egzersizler: g.egzersizler.map((ex, j) => {
                if (j !== exIndex) return ex;
                if (field === "egzersizId") {
                  const found = exercises.find(
                    (e: any) => e._id === value
                  );
                  return {
                    ...ex,
                    egzersizId: value,
                    egzersizAdi: found?.ad || "",
                  };
                }
                return { ...ex, [field]: value };
              }),
            }
          : g
      )
    );
  };

  const updateSet = (
    dayIndex: number,
    exIndex: number,
    setIndex: number,
    field: string,
    value: any
  ) => {
    setGunler(
      gunler.map((g, i) =>
        i === dayIndex
          ? {
              ...g,
              egzersizler: g.egzersizler.map((ex, j) =>
                j === exIndex
                  ? {
                      ...ex,
                      setler: ex.setler.map((s, k) =>
                        k === setIndex ? { ...s, [field]: value } : s
                      ),
                    }
                  : ex
              ),
            }
          : g
      )
    );
  };

  const addSet = (dayIndex: number, exIndex: number) => {
    setGunler(
      gunler.map((g, i) =>
        i === dayIndex
          ? {
              ...g,
              egzersizler: g.egzersizler.map((ex, j) =>
                j === exIndex
                  ? {
                      ...ex,
                      setler: [
                        ...ex.setler,
                        { tekrar: 12, set: 1, agirlik: "", dinlenme: "60 sn" },
                      ],
                    }
                  : ex
              ),
            }
          : g
      )
    );
  };

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
        gunler: gunler.map(({ isOpen, ...g }) => ({
          ...g,
          egzersizler: g.egzersizler.map((ex, idx) => ({
            ...ex,
            sira: idx + 1,
          })),
        })),
      };

      const res = await fetch("/api/workout-programs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Bir hata olustu");
      }

      toast.success("Antrenman programi olusturuldu!");
      router.push("/yonetim/antrenman-programlari");
      router.refresh();
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const kasGrupları: Record<string, string> = {
    gogus: "Gogus",
    sirt: "Sirt",
    omuz: "Omuz",
    biceps: "Biceps",
    triceps: "Triceps",
    bacak: "Bacak",
    karin: "Karin",
    kalca: "Kalca",
    kardio: "Kardio",
    diger: "Diger",
  };

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-foreground">
          Yeni Antrenman Programi
        </h1>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="rounded-xl bg-surface border border-border p-6 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="Program Basligi"
              value={baslik}
              onChange={(e) => setBaslik(e.target.value)}
              required
              placeholder="orn. Hacim Programi - Hafta 1-4"
            />
            <Select
              label="Danisan"
              value={danisanId}
              onChange={(e) => setDanisanId(e.target.value)}
              placeholder="Danisan secin"
              options={clients.map((c: any) => ({
                value: c._id,
                label: `${c.ad} ${c.soyad}`,
              }))}
            />
          </div>
          <Textarea
            label="Aciklama"
            value={aciklama}
            onChange={(e) => setAciklama(e.target.value)}
            placeholder="Program hakkinda notlar..."
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="Baslangic Tarihi"
              type="date"
              value={baslangicTarihi}
              onChange={(e) => setBaslangicTarihi(e.target.value)}
            />
            <Input
              label="Bitis Tarihi"
              type="date"
              value={bitisTarihi}
              onChange={(e) => setBitisTarihi(e.target.value)}
            />
          </div>
        </div>

        {/* Gunler */}
        <div className="space-y-4">
          {gunler.map((day, dayIndex) => (
            <div
              key={dayIndex}
              className="rounded-xl bg-surface border border-border overflow-hidden"
            >
              <div
                className="flex items-center justify-between px-6 py-4 cursor-pointer hover:bg-surface-hover/50 transition"
                onClick={() => toggleDay(dayIndex)}
              >
                <div className="flex items-center gap-3">
                  {day.isOpen ? (
                    <ChevronUpIcon className="h-5 w-5 text-muted" />
                  ) : (
                    <ChevronDownIcon className="h-5 w-5 text-muted" />
                  )}
                  <h3 className="font-semibold text-foreground">
                    {day.gun}
                    {day.baslik && (
                      <span className="text-muted font-normal ml-2">
                        - {day.baslik}
                      </span>
                    )}
                  </h3>
                  <span className="text-xs text-muted">
                    ({day.egzersizler.length} egzersiz)
                  </span>
                </div>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    removeDay(dayIndex);
                  }}
                  className="text-muted hover:text-danger transition"
                >
                  <TrashIcon className="h-4 w-4" />
                </button>
              </div>

              {day.isOpen && (
                <div className="px-6 pb-6 space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Select
                      label="Gun"
                      value={day.gun}
                      onChange={(e) =>
                        updateDay(dayIndex, "gun", e.target.value)
                      }
                      options={GUNLER.map((g) => ({ value: g, label: g }))}
                    />
                    <Input
                      label="Baslik"
                      value={day.baslik}
                      onChange={(e) =>
                        updateDay(dayIndex, "baslik", e.target.value)
                      }
                      placeholder="orn. Gogus & Triceps"
                    />
                  </div>

                  {/* Egzersizler */}
                  {day.egzersizler.map((ex, exIndex) => (
                    <div
                      key={exIndex}
                      className="rounded-lg bg-background border border-border p-4 space-y-3"
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1">
                          <label className="block text-sm font-medium text-foreground mb-1.5">
                            Egzersiz
                          </label>
                          <select
                            value={ex.egzersizId}
                            onChange={(e) =>
                              updateExercise(
                                dayIndex,
                                exIndex,
                                "egzersizId",
                                e.target.value
                              )
                            }
                            className="w-full rounded-lg bg-surface border border-border px-4 py-2.5 text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                          >
                            <option value="">Egzersiz secin</option>
                            {Object.keys(kasGrupları).map((group) => {
                              const groupExercises = exercises.filter(
                                (e: any) => e.kasGrubu === group
                              );
                              if (groupExercises.length === 0) return null;
                              return (
                                <optgroup
                                  key={group}
                                  label={kasGrupları[group]}
                                >
                                  {groupExercises.map((e: any) => (
                                    <option key={e._id} value={e._id}>
                                      {e.ad}
                                    </option>
                                  ))}
                                </optgroup>
                              );
                            })}
                          </select>
                        </div>
                        <button
                          type="button"
                          onClick={() => removeExercise(dayIndex, exIndex)}
                          className="mt-7 text-muted hover:text-danger transition"
                        >
                          <TrashIcon className="h-4 w-4" />
                        </button>
                      </div>

                      {/* Setler */}
                      <div className="space-y-2">
                        <p className="text-xs font-medium text-muted">
                          Setler
                        </p>
                        {ex.setler.map((s, setIndex) => (
                          <div
                            key={setIndex}
                            className="grid grid-cols-4 gap-2"
                          >
                            <div>
                              <input
                                type="number"
                                value={s.set}
                                onChange={(e) =>
                                  updateSet(
                                    dayIndex,
                                    exIndex,
                                    setIndex,
                                    "set",
                                    Number(e.target.value)
                                  )
                                }
                                className="w-full rounded bg-surface border border-border px-2 py-1.5 text-sm text-foreground"
                                placeholder="Set"
                                min={1}
                              />
                              <span className="text-[10px] text-muted">
                                Set
                              </span>
                            </div>
                            <div>
                              <input
                                type="number"
                                value={s.tekrar}
                                onChange={(e) =>
                                  updateSet(
                                    dayIndex,
                                    exIndex,
                                    setIndex,
                                    "tekrar",
                                    Number(e.target.value)
                                  )
                                }
                                className="w-full rounded bg-surface border border-border px-2 py-1.5 text-sm text-foreground"
                                placeholder="Tekrar"
                                min={1}
                              />
                              <span className="text-[10px] text-muted">
                                Tekrar
                              </span>
                            </div>
                            <div>
                              <input
                                type="text"
                                value={s.agirlik}
                                onChange={(e) =>
                                  updateSet(
                                    dayIndex,
                                    exIndex,
                                    setIndex,
                                    "agirlik",
                                    e.target.value
                                  )
                                }
                                className="w-full rounded bg-surface border border-border px-2 py-1.5 text-sm text-foreground"
                                placeholder="20 kg"
                              />
                              <span className="text-[10px] text-muted">
                                Agirlik
                              </span>
                            </div>
                            <div>
                              <input
                                type="text"
                                value={s.dinlenme}
                                onChange={(e) =>
                                  updateSet(
                                    dayIndex,
                                    exIndex,
                                    setIndex,
                                    "dinlenme",
                                    e.target.value
                                  )
                                }
                                className="w-full rounded bg-surface border border-border px-2 py-1.5 text-sm text-foreground"
                                placeholder="60 sn"
                              />
                              <span className="text-[10px] text-muted">
                                Dinlenme
                              </span>
                            </div>
                          </div>
                        ))}
                        <button
                          type="button"
                          onClick={() => addSet(dayIndex, exIndex)}
                          className="text-xs text-primary hover:text-primary-hover transition"
                        >
                          + Set Ekle
                        </button>
                      </div>

                      <Input
                        label="Notlar"
                        value={ex.notlar}
                        onChange={(e) =>
                          updateExercise(
                            dayIndex,
                            exIndex,
                            "notlar",
                            e.target.value
                          )
                        }
                        placeholder="Egzersiz notu..."
                      />
                    </div>
                  ))}

                  <Button
                    type="button"
                    variant="secondary"
                    size="sm"
                    onClick={() => addExercise(dayIndex)}
                  >
                    <PlusIcon className="h-4 w-4 mr-1" />
                    Egzersiz Ekle
                  </Button>
                </div>
              )}
            </div>
          ))}

          <Button type="button" variant="secondary" onClick={addDay}>
            <PlusIcon className="h-4 w-4 mr-2" />
            Gun Ekle
          </Button>
        </div>

        <div className="flex gap-3">
          <Button type="submit" disabled={loading} size="lg">
            {loading ? "Kaydediliyor..." : "Programi Kaydet"}
          </Button>
          <Button
            type="button"
            variant="secondary"
            size="lg"
            onClick={() => router.back()}
          >
            Iptal
          </Button>
        </div>
      </form>
    </div>
  );
}
