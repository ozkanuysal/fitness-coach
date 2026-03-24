import Link from "next/link";
import { notFound } from "next/navigation";
import dbConnect from "@/lib/db";
import User from "@/lib/models/User";
import WorkoutProgram from "@/lib/models/WorkoutProgram";
import MealProgram from "@/lib/models/MealProgram";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import { PencilIcon } from "@heroicons/react/24/outline";

export const dynamic = 'force-dynamic';

export default async function DanisanDetayPage({
  params,
}: {
  params: Promise<{ clientId: string }>;
}) {
  const { clientId } = await params;
  await dbConnect();

  const client = await User.findById(clientId).lean();
  if (!client || (client as any).role !== "client") return notFound();

  const [workoutPrograms, mealPrograms] = await Promise.all([
    WorkoutProgram.find({ danisanId: clientId }).sort({ createdAt: -1 }).lean(),
    MealProgram.find({ danisanId: clientId }).sort({ createdAt: -1 }).lean(),
  ]);

  const c = client as any;

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-foreground">
            {c.ad} {c.soyad}
          </h1>
          <p className="text-muted mt-1">{c.email}</p>
        </div>
        <Link href={`/yonetim/danisanlar/${clientId}/duzenle`}>
          <Button variant="secondary">
            <PencilIcon className="h-4 w-4 mr-2" />
            Duzenle
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Bilgiler */}
        <Card>
          <h3 className="font-semibold text-foreground mb-4">
            Kisisel Bilgiler
          </h3>
          <dl className="space-y-3 text-sm">
            <div className="flex justify-between">
              <dt className="text-muted">Durum</dt>
              <dd>
                <Badge variant={c.aktif ? "success" : "danger"}>
                  {c.aktif ? "Aktif" : "Pasif"}
                </Badge>
              </dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-muted">Telefon</dt>
              <dd className="text-foreground">{c.telefon || "-"}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-muted">Boy</dt>
              <dd className="text-foreground">
                {c.boy ? `${c.boy} cm` : "-"}
              </dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-muted">Kilo</dt>
              <dd className="text-foreground">
                {c.kilo ? `${c.kilo} kg` : "-"}
              </dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-muted">Yas</dt>
              <dd className="text-foreground">{c.yas || "-"}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-muted">Cinsiyet</dt>
              <dd className="text-foreground">
                {c.cinsiyet === "erkek"
                  ? "Erkek"
                  : c.cinsiyet === "kadin"
                    ? "Kadin"
                    : "-"}
              </dd>
            </div>
          </dl>
          {c.hedef && (
            <div className="mt-4 pt-4 border-t border-border">
              <p className="text-sm text-muted mb-1">Hedef</p>
              <p className="text-sm text-foreground">{c.hedef}</p>
            </div>
          )}
        </Card>

        {/* Makro Hedefleri */}
        <Card>
          <h3 className="font-semibold text-foreground mb-4">
            Makro Hedefleri
          </h3>
          <dl className="space-y-3 text-sm">
            <div className="flex justify-between">
              <dt className="text-muted">Kalori</dt>
              <dd className="text-foreground font-medium">
                {c.gunlukKalori ? `${c.gunlukKalori} kcal` : "-"}
              </dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-muted">Protein</dt>
              <dd className="text-foreground font-medium">
                {c.gunlukProtein ? `${c.gunlukProtein} g` : "-"}
              </dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-muted">Karbonhidrat</dt>
              <dd className="text-foreground font-medium">
                {c.gunlukKarbonhidrat ? `${c.gunlukKarbonhidrat} g` : "-"}
              </dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-muted">Yag</dt>
              <dd className="text-foreground font-medium">
                {c.gunlukYag ? `${c.gunlukYag} g` : "-"}
              </dd>
            </div>
          </dl>
        </Card>

        {/* Notlar */}
        <Card>
          <h3 className="font-semibold text-foreground mb-4">Notlar</h3>
          <p className="text-sm text-muted">
            {c.notlar || "Henuz not eklenmemis."}
          </p>
        </Card>
      </div>

      {/* Antrenman Programlari */}
      <div className="mt-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-foreground">
            Antrenman Programlari
          </h2>
          <Link href={`/yonetim/antrenman-programlari/yeni?danisan=${clientId}`}>
            <Button size="sm">Program Olustur</Button>
          </Link>
        </div>
        {workoutPrograms.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {workoutPrograms.map((p: any) => (
              <Card key={p._id.toString()} hover>
                <Link href={`/yonetim/antrenman-programlari/${p._id}`}>
                  <div className="flex items-center justify-between">
                    <h3 className="font-medium text-foreground">{p.baslik}</h3>
                    <Badge variant={p.aktif ? "success" : "default"}>
                      {p.aktif ? "Aktif" : "Tamamlandi"}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted mt-1">
                    {p.gunler?.length || 0} gun
                  </p>
                </Link>
              </Card>
            ))}
          </div>
        ) : (
          <p className="text-sm text-muted">
            Henuz antrenman programi atanmamis.
          </p>
        )}
      </div>

      {/* Beslenme Programlari */}
      <div className="mt-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-foreground">
            Beslenme Programlari
          </h2>
          <Link href={`/yonetim/beslenme-programlari/yeni?danisan=${clientId}`}>
            <Button size="sm">Program Olustur</Button>
          </Link>
        </div>
        {mealPrograms.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {mealPrograms.map((p: any) => (
              <Card key={p._id.toString()} hover>
                <Link href={`/yonetim/beslenme-programlari/${p._id}`}>
                  <div className="flex items-center justify-between">
                    <h3 className="font-medium text-foreground">{p.baslik}</h3>
                    <Badge variant={p.aktif ? "success" : "default"}>
                      {p.aktif ? "Aktif" : "Tamamlandi"}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted mt-1">
                    {p.gunler?.length || 0} gun
                  </p>
                </Link>
              </Card>
            ))}
          </div>
        ) : (
          <p className="text-sm text-muted">
            Henuz beslenme programi atanmamis.
          </p>
        )}
      </div>
    </div>
  );
}
