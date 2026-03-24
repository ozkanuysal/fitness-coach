import { auth } from "@/auth";
import dbConnect from "@/lib/db";
import User from "@/lib/models/User";
import Card from "@/components/ui/Card";

export const dynamic = 'force-dynamic';

export const metadata = { title: "Profil - FitKoc" };

export default async function ProfilPage() {
  const session = await auth();
  await dbConnect();

  const user = await User.findById(session?.user?.id).select("-password").lean();
  const u = user as any;

  if (!u) return <div className="text-muted">Kullanici bulunamadi</div>;

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-foreground">Profilim</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl">
        <Card>
          <h3 className="font-semibold text-foreground mb-4">Kisisel Bilgiler</h3>
          <dl className="space-y-3 text-sm">
            <div className="flex justify-between">
              <dt className="text-muted">Ad Soyad</dt>
              <dd className="text-foreground">{u.ad} {u.soyad}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-muted">Email</dt>
              <dd className="text-foreground">{u.email}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-muted">Telefon</dt>
              <dd className="text-foreground">{u.telefon || "-"}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-muted">Boy</dt>
              <dd className="text-foreground">{u.boy ? `${u.boy} cm` : "-"}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-muted">Kilo</dt>
              <dd className="text-foreground">{u.kilo ? `${u.kilo} kg` : "-"}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-muted">Yas</dt>
              <dd className="text-foreground">{u.yas || "-"}</dd>
            </div>
          </dl>
          {u.hedef && (
            <div className="mt-4 pt-4 border-t border-border">
              <p className="text-sm text-muted mb-1">Hedef</p>
              <p className="text-sm text-foreground">{u.hedef}</p>
            </div>
          )}
        </Card>

        <Card>
          <h3 className="font-semibold text-foreground mb-4">Makro Hedefleri</h3>
          <dl className="space-y-3 text-sm">
            <div className="flex justify-between">
              <dt className="text-muted">Gunluk Kalori</dt>
              <dd className="text-foreground font-medium">{u.gunlukKalori ? `${u.gunlukKalori} kcal` : "-"}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-muted">Protein</dt>
              <dd className="text-foreground font-medium">{u.gunlukProtein ? `${u.gunlukProtein} g` : "-"}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-muted">Karbonhidrat</dt>
              <dd className="text-foreground font-medium">{u.gunlukKarbonhidrat ? `${u.gunlukKarbonhidrat} g` : "-"}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-muted">Yag</dt>
              <dd className="text-foreground font-medium">{u.gunlukYag ? `${u.gunlukYag} g` : "-"}</dd>
            </div>
          </dl>
        </Card>
      </div>
    </div>
  );
}
