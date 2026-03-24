import { auth } from "@/auth";
import { notFound } from "next/navigation";
import dbConnect from "@/lib/db";
import WorkoutProgram from "@/lib/models/WorkoutProgram";
import Badge from "@/components/ui/Badge";
import { formatDate } from "@/lib/utils";

export const dynamic = 'force-dynamic';

export default async function AntrenmanDetayPage({
  params,
}: {
  params: Promise<{ programId: string }>;
}) {
  const { programId } = await params;
  const session = await auth();
  await dbConnect();

  const program = await WorkoutProgram.findById(programId).lean();
  if (!program) return notFound();

  const p = program as any;
  if (p.danisanId.toString() !== session?.user?.id) return notFound();

  return (
    <div>
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <h1 className="text-2xl font-bold text-foreground">{p.baslik}</h1>
          <Badge variant={p.aktif ? "success" : "default"}>
            {p.aktif ? "Aktif" : "Tamamlandi"}
          </Badge>
        </div>
        {p.aciklama && <p className="text-muted">{p.aciklama}</p>}
        {p.baslangicTarihi && (
          <p className="text-sm text-muted mt-1">
            {formatDate(p.baslangicTarihi)}
            {p.bitisTarihi && ` - ${formatDate(p.bitisTarihi)}`}
          </p>
        )}
      </div>

      <div className="space-y-6">
        {p.gunler?.map((gun: any, gunIdx: number) => (
          <div
            key={gunIdx}
            className="rounded-xl bg-surface border border-border overflow-hidden"
          >
            <div className="px-6 py-4 border-b border-border bg-surface-hover/30">
              <h2 className="font-semibold text-foreground">
                {gun.gun}
                {gun.baslik && (
                  <span className="text-primary ml-2">- {gun.baslik}</span>
                )}
              </h2>
            </div>

            <div className="divide-y divide-border">
              {gun.egzersizler?.map((ex: any, exIdx: number) => (
                <div key={exIdx} className="px-6 py-4">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-medium text-foreground">
                      <span className="text-muted mr-2">{exIdx + 1}.</span>
                      {ex.egzersizAdi}
                    </h3>
                  </div>

                  <div className="grid grid-cols-4 gap-2 text-sm">
                    <div className="text-center bg-background rounded-lg py-2">
                      <p className="font-semibold text-foreground">
                        {ex.setler?.[0]?.set || "-"}
                      </p>
                      <p className="text-xs text-muted">Set</p>
                    </div>
                    <div className="text-center bg-background rounded-lg py-2">
                      <p className="font-semibold text-foreground">
                        {ex.setler?.[0]?.tekrar || "-"}
                      </p>
                      <p className="text-xs text-muted">Tekrar</p>
                    </div>
                    <div className="text-center bg-background rounded-lg py-2">
                      <p className="font-semibold text-foreground">
                        {ex.setler?.[0]?.agirlik || "-"}
                      </p>
                      <p className="text-xs text-muted">Agirlik</p>
                    </div>
                    <div className="text-center bg-background rounded-lg py-2">
                      <p className="font-semibold text-foreground">
                        {ex.setler?.[0]?.dinlenme || "-"}
                      </p>
                      <p className="text-xs text-muted">Dinlenme</p>
                    </div>
                  </div>

                  {ex.notlar && (
                    <p className="text-sm text-muted mt-2 italic">
                      Not: {ex.notlar}
                    </p>
                  )}
                </div>
              ))}

              {(!gun.egzersizler || gun.egzersizler.length === 0) && (
                <div className="px-6 py-8 text-center text-muted">
                  Dinlenme gunu
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
