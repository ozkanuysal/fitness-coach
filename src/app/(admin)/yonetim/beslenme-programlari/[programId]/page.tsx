import Link from "next/link";
import { notFound } from "next/navigation";
import dbConnect from "@/lib/db";
import MealProgram from "@/lib/models/MealProgram";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import { PencilIcon } from "@heroicons/react/24/outline";
import { formatDate } from "@/lib/utils";

export const dynamic = 'force-dynamic';

export default async function BeslenmeProgramDetayPage({
  params,
}: {
  params: Promise<{ programId: string }>;
}) {
  const { programId } = await params;
  await dbConnect();

  const program = await MealProgram.findById(programId)
    .populate("danisanId", "ad soyad")
    .lean();

  if (!program) return notFound();
  const p = program as any;

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <div className="flex items-center gap-3 mb-1">
            <h1 className="text-2xl font-bold text-foreground">{p.baslik}</h1>
            <Badge variant={p.aktif ? "success" : "default"}>
              {p.aktif ? "Aktif" : "Pasif"}
            </Badge>
          </div>
          <p className="text-muted">
            Danisan: {p.danisanId?.ad} {p.danisanId?.soyad}
          </p>
        </div>
        <Link href={`/yonetim/beslenme-programlari/${programId}/duzenle`}>
          <Button variant="secondary">
            <PencilIcon className="h-4 w-4 mr-2" />
            Duzenle
          </Button>
        </Link>
      </div>

      {/* Makro Hedefleri */}
      {p.makroHedefleri?.gunlukKalori && (
        <div className="rounded-xl bg-surface border border-border p-6 mb-6">
          <h3 className="font-semibold text-foreground mb-3">Makro Hedefleri</h3>
          <div className="grid grid-cols-4 gap-4 text-center">
            <div>
              <p className="text-xl font-bold text-primary">{p.makroHedefleri.gunlukKalori}</p>
              <p className="text-xs text-muted">Kalori (kcal)</p>
            </div>
            <div>
              <p className="text-xl font-bold text-info">{p.makroHedefleri.gunlukProtein}</p>
              <p className="text-xs text-muted">Protein (g)</p>
            </div>
            <div>
              <p className="text-xl font-bold text-accent">{p.makroHedefleri.gunlukKarbonhidrat}</p>
              <p className="text-xs text-muted">Karbonhidrat (g)</p>
            </div>
            <div>
              <p className="text-xl font-bold text-warning">{p.makroHedefleri.gunlukYag}</p>
              <p className="text-xs text-muted">Yag (g)</p>
            </div>
          </div>
        </div>
      )}

      {/* Gunler */}
      <div className="space-y-6">
        {p.gunler?.map((gun: any, gunIdx: number) => (
          <div key={gunIdx} className="rounded-xl bg-surface border border-border overflow-hidden">
            <div className="px-6 py-4 border-b border-border bg-surface-hover/30 flex items-center justify-between">
              <h2 className="font-semibold text-foreground">{gun.gun}</h2>
              {gun.toplamMakro && (
                <span className="text-xs text-primary">
                  {gun.toplamMakro.kalori} kcal | P:{gun.toplamMakro.protein}g K:{gun.toplamMakro.karbonhidrat}g Y:{gun.toplamMakro.yag}g
                </span>
              )}
            </div>
            <div className="divide-y divide-border">
              {gun.ogunler?.map((ogun: any, ogunIdx: number) => (
                <div key={ogunIdx} className="px-6 py-4">
                  <div className="flex items-center gap-2 mb-3">
                    <h3 className="font-medium text-foreground">{ogun.ogunAdi}</h3>
                    {ogun.saat && <span className="text-xs text-muted">({ogun.saat})</span>}
                  </div>
                  <div className="space-y-1">
                    {ogun.yemekler?.map((y: any, yIdx: number) => (
                      <div key={yIdx} className="flex items-center justify-between bg-background rounded-lg px-3 py-2 text-sm">
                        <div>
                          <span className="text-foreground">{y.yemekAdi}</span>
                          <span className="text-muted ml-2">({y.miktar})</span>
                        </div>
                        <div className="flex gap-2 text-xs text-muted">
                          <span className="text-primary">{y.kalori}kcal</span>
                          <span>P:{y.protein}g</span>
                          <span>K:{y.karbonhidrat}g</span>
                          <span>Y:{y.yag}g</span>
                        </div>
                      </div>
                    ))}
                  </div>
                  {ogun.alternatifler?.length > 0 && (
                    <div className="mt-3 space-y-2">
                      {ogun.alternatifler.map((alt: any, altIdx: number) => (
                        <div key={altIdx} className="ml-4 pl-4 border-l-2 border-accent/30">
                          <p className="text-xs font-medium text-accent mb-1">{alt.baslik}</p>
                          {alt.yemekler?.map((y: any, yIdx: number) => (
                            <div key={yIdx} className="flex items-center justify-between bg-background rounded-lg px-3 py-1.5 text-sm mb-1">
                              <span className="text-foreground">{y.yemekAdi} <span className="text-muted">({y.miktar})</span></span>
                              <span className="text-xs text-primary">{y.kalori}kcal</span>
                            </div>
                          ))}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
