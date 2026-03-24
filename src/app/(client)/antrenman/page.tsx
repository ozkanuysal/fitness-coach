import { auth } from "@/auth";
import Link from "next/link";
import dbConnect from "@/lib/db";
import WorkoutProgram from "@/lib/models/WorkoutProgram";
import Card from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";
import EmptyState from "@/components/ui/EmptyState";
import { ClipboardDocumentListIcon } from "@heroicons/react/24/outline";

export const dynamic = 'force-dynamic';

export const metadata = { title: "Antrenman - FitKoc" };

export default async function AntrenmanPage() {
  const session = await auth();
  await dbConnect();

  const programs = await WorkoutProgram.find({ danisanId: session?.user?.id })
    .sort({ aktif: -1, createdAt: -1 })
    .lean();

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-foreground">
          Antrenman Programlarim
        </h1>
        <p className="text-muted mt-1">Sana ozel hazirlanmis antrenman programlarin</p>
      </div>

      {programs.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {programs.map((p: any) => (
            <Link key={p._id.toString()} href={`/antrenman/${p._id}`}>
              <Card hover className="h-full">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-semibold text-foreground">{p.baslik}</h3>
                  <Badge variant={p.aktif ? "success" : "default"}>
                    {p.aktif ? "Aktif" : "Tamamlandi"}
                  </Badge>
                </div>
                {p.aciklama && (
                  <p className="text-sm text-muted mb-3">{p.aciklama}</p>
                )}
                <p className="text-sm text-muted">
                  {p.gunler?.length || 0} gun programi
                </p>
              </Card>
            </Link>
          ))}
        </div>
      ) : (
        <EmptyState
          title="Henuz antrenman programin yok"
          description="Kocun sana program atadigi zaman burada gorunecek."
          icon={<ClipboardDocumentListIcon className="h-12 w-12" />}
        />
      )}
    </div>
  );
}
