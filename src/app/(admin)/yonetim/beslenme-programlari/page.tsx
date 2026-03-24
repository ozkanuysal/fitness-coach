import Link from "next/link";
import dbConnect from "@/lib/db";
import MealProgram from "@/lib/models/MealProgram";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import { PlusIcon } from "@heroicons/react/24/outline";

export const dynamic = 'force-dynamic';

export const metadata = { title: "Beslenme Programlari - FitKoc" };

export default async function BeslenmeProgramlariPage() {
  await dbConnect();
  const programs = await MealProgram.find()
    .populate("danisanId", "ad soyad")
    .sort({ createdAt: -1 })
    .lean();

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-foreground">
            Beslenme Programlari
          </h1>
          <p className="text-muted mt-1">{programs.length} program</p>
        </div>
        <Link href="/yonetim/beslenme-programlari/yeni">
          <Button>
            <PlusIcon className="h-4 w-4 mr-2" />
            Yeni Program
          </Button>
        </Link>
      </div>

      {programs.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {programs.map((p: any) => (
            <Link
              key={p._id.toString()}
              href={`/yonetim/beslenme-programlari/${p._id}`}
            >
              <Card hover className="h-full">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-semibold text-foreground">{p.baslik}</h3>
                  <Badge variant={p.aktif ? "success" : "default"}>
                    {p.aktif ? "Aktif" : "Pasif"}
                  </Badge>
                </div>
                <p className="text-sm text-muted mb-3">
                  {p.aciklama || "Aciklama yok"}
                </p>
                <div className="flex items-center justify-between text-sm text-muted">
                  <span>
                    {p.danisanId?.ad} {p.danisanId?.soyad}
                  </span>
                  <span>{p.gunler?.length || 0} gun</span>
                </div>
                {p.makroHedefleri?.gunlukKalori && (
                  <p className="text-xs text-primary mt-2">
                    Hedef: {p.makroHedefleri.gunlukKalori} kcal/gun
                  </p>
                )}
              </Card>
            </Link>
          ))}
        </div>
      ) : (
        <div className="text-center py-12 text-muted">
          Henuz beslenme programi olusturulmamis
        </div>
      )}
    </div>
  );
}
