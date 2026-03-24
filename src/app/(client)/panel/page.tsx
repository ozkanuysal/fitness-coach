import { auth } from "@/auth";
import Link from "next/link";
import dbConnect from "@/lib/db";
import WorkoutProgram from "@/lib/models/WorkoutProgram";
import MealProgram from "@/lib/models/MealProgram";
import User from "@/lib/models/User";
import Card from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";
import {
  ClipboardDocumentListIcon,
  CakeIcon,
  FireIcon,
} from "@heroicons/react/24/outline";

export const dynamic = 'force-dynamic';

export const metadata = { title: "Panel - FitKoc" };

export default async function PanelPage() {
  const session = await auth();
  await dbConnect();

  const userId = session?.user?.id;

  const [activeWorkout, activeMeal, user] = await Promise.all([
    WorkoutProgram.findOne({ danisanId: userId, aktif: true })
      .sort({ createdAt: -1 })
      .lean(),
    MealProgram.findOne({ danisanId: userId, aktif: true })
      .sort({ createdAt: -1 })
      .lean(),
    User.findById(userId).select("gunlukKalori gunlukProtein gunlukKarbonhidrat gunlukYag").lean(),
  ]);

  const w = activeWorkout as any;
  const m = activeMeal as any;
  const u = user as any;

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-foreground">
          Hos geldin, {session?.user?.ad}!
        </h1>
        <p className="text-muted mt-1">
          Antrenman ve beslenme programlarini buradan takip edebilirsin.
        </p>
      </div>

      {/* Makro Hedefleri */}
      {u?.gunlukKalori && (
        <div className="rounded-xl bg-surface border border-border p-6 mb-6">
          <h2 className="font-semibold text-foreground mb-4 flex items-center gap-2">
            <FireIcon className="h-5 w-5 text-accent" />
            Gunluk Makro Hedeflerin
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[
              { label: "Kalori", value: u.gunlukKalori, unit: "kcal", color: "text-primary" },
              { label: "Protein", value: u.gunlukProtein, unit: "g", color: "text-info" },
              { label: "Karbonhidrat", value: u.gunlukKarbonhidrat, unit: "g", color: "text-accent" },
              { label: "Yag", value: u.gunlukYag, unit: "g", color: "text-warning" },
            ].map((macro) => (
              <div key={macro.label} className="text-center">
                <p className={`text-2xl font-bold ${macro.color}`}>
                  {macro.value || "-"}
                </p>
                <p className="text-xs text-muted">
                  {macro.label} ({macro.unit})
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Aktif Antrenman */}
        <Card>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
              <ClipboardDocumentListIcon className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h2 className="font-semibold text-foreground">
                Antrenman Programi
              </h2>
              {w && (
                <Badge variant="success" className="mt-0.5">
                  Aktif
                </Badge>
              )}
            </div>
          </div>

          {w ? (
            <>
              <h3 className="text-lg font-medium text-foreground mb-1">
                {w.baslik}
              </h3>
              <p className="text-sm text-muted mb-3">
                {w.gunler?.length || 0} gun programi
              </p>
              {w.aciklama && (
                <p className="text-sm text-muted mb-4">{w.aciklama}</p>
              )}
              <Link
                href={`/antrenman/${w._id}`}
                className="text-sm text-primary hover:text-primary-hover font-medium transition"
              >
                Detayi Gor &rarr;
              </Link>
            </>
          ) : (
            <p className="text-sm text-muted">
              Henuz aktif antrenman programin yok.
            </p>
          )}
        </Card>

        {/* Aktif Beslenme */}
        <Card>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center">
              <CakeIcon className="h-5 w-5 text-accent" />
            </div>
            <div>
              <h2 className="font-semibold text-foreground">
                Beslenme Programi
              </h2>
              {m && (
                <Badge variant="success" className="mt-0.5">
                  Aktif
                </Badge>
              )}
            </div>
          </div>

          {m ? (
            <>
              <h3 className="text-lg font-medium text-foreground mb-1">
                {m.baslik}
              </h3>
              <p className="text-sm text-muted mb-3">
                {m.gunler?.length || 0} gun programi
              </p>
              {m.makroHedefleri?.gunlukKalori && (
                <p className="text-sm text-primary mb-3">
                  Hedef: {m.makroHedefleri.gunlukKalori} kcal/gun
                </p>
              )}
              <Link
                href={`/beslenme/${m._id}`}
                className="text-sm text-primary hover:text-primary-hover font-medium transition"
              >
                Detayi Gor &rarr;
              </Link>
            </>
          ) : (
            <p className="text-sm text-muted">
              Henuz aktif beslenme programin yok.
            </p>
          )}
        </Card>
      </div>
    </div>
  );
}
