import Link from "next/link";
import { notFound } from "next/navigation";
import dbConnect from "@/lib/db";
import WorkoutProgram from "@/lib/models/WorkoutProgram";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import { PencilIcon } from "@heroicons/react/24/outline";
import { formatDate } from "@/lib/utils";

export const dynamic = 'force-dynamic';

export default async function AntrenmanProgramDetayPage({
  params,
}: {
  params: Promise<{ programId: string }>;
}) {
  const { programId } = await params;
  await dbConnect();

  const program = await WorkoutProgram.findById(programId)
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
          {p.baslangicTarihi && (
            <p className="text-sm text-muted">
              {formatDate(p.baslangicTarihi)}
              {p.bitisTarihi && ` - ${formatDate(p.bitisTarihi)}`}
            </p>
          )}
        </div>
        <Link href={`/yonetim/antrenman-programlari/${programId}/duzenle`}>
          <Button variant="secondary">
            <PencilIcon className="h-4 w-4 mr-2" />
            Duzenle
          </Button>
        </Link>
      </div>

      {p.aciklama && (
        <p className="text-muted mb-6">{p.aciklama}</p>
      )}

      <div className="space-y-6">
        {p.gunler?.map((gun: any, gunIdx: number) => (
          <div key={gunIdx} className="rounded-xl bg-surface border border-border overflow-hidden">
            <div className="px-6 py-4 border-b border-border bg-surface-hover/30">
              <h2 className="font-semibold text-foreground">
                {gun.gun}
                {gun.baslik && <span className="text-primary ml-2">- {gun.baslik}</span>}
              </h2>
            </div>
            <div className="divide-y divide-border">
              {gun.egzersizler?.map((ex: any, exIdx: number) => (
                <div key={exIdx} className="px-6 py-4">
                  <h3 className="font-medium text-foreground mb-2">
                    <span className="text-muted mr-2">{exIdx + 1}.</span>
                    {ex.egzersizAdi}
                  </h3>
                  <div className="grid grid-cols-4 gap-2 text-sm">
                    {ex.setler?.map((s: any, sIdx: number) => (
                      <div key={sIdx} className="bg-background rounded-lg p-2 text-center">
                        <p className="text-xs text-muted">Set {sIdx + 1}</p>
                        <p className="font-medium text-foreground">{s.set}x{s.tekrar}</p>
                        {s.agirlik && <p className="text-xs text-primary">{s.agirlik}</p>}
                      </div>
                    ))}
                  </div>
                  {ex.notlar && <p className="text-sm text-muted mt-2 italic">Not: {ex.notlar}</p>}
                </div>
              ))}
              {(!gun.egzersizler || gun.egzersizler.length === 0) && (
                <div className="px-6 py-8 text-center text-muted">Egzersiz eklenmemis</div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
