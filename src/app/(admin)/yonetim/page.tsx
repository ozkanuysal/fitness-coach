import { auth } from "@/auth";
import {
  UsersIcon,
  ClipboardDocumentListIcon,
  CakeIcon,
} from "@heroicons/react/24/outline";
import StatCard from "@/components/dashboard/StatCard";
import dbConnect from "@/lib/db";
import User from "@/lib/models/User";
import WorkoutProgram from "@/lib/models/WorkoutProgram";
import MealProgram from "@/lib/models/MealProgram";

export const dynamic = 'force-dynamic';

export const metadata = {
  title: "Yonetim Paneli - FitKoc",
};

export default async function YonetimPage() {
  const session = await auth();
  await dbConnect();

  const [totalClients, activeClients, workoutPrograms, mealPrograms] =
    await Promise.all([
      User.countDocuments({ role: "client" }),
      User.countDocuments({ role: "client", aktif: true }),
      WorkoutProgram.countDocuments({ aktif: true }),
      MealProgram.countDocuments({ aktif: true }),
    ]);

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-foreground">
          Hos geldin, {session?.user?.ad}!
        </h1>
        <p className="text-muted mt-1">Yonetim paneline genel bakis</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard
          title="Toplam Danisan"
          value={totalClients}
          icon={<UsersIcon className="h-6 w-6" />}
        />
        <StatCard
          title="Aktif Danisan"
          value={activeClients}
          icon={<UsersIcon className="h-6 w-6" />}
          trend={`${totalClients > 0 ? Math.round((activeClients / totalClients) * 100) : 0}% aktif`}
        />
        <StatCard
          title="Aktif Antrenman Pr."
          value={workoutPrograms}
          icon={<ClipboardDocumentListIcon className="h-6 w-6" />}
        />
        <StatCard
          title="Aktif Beslenme Pr."
          value={mealPrograms}
          icon={<CakeIcon className="h-6 w-6" />}
        />
      </div>
    </div>
  );
}
