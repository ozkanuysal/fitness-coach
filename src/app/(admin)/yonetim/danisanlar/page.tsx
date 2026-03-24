import Link from "next/link";
import dbConnect from "@/lib/db";
import User from "@/lib/models/User";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import { PlusIcon } from "@heroicons/react/24/outline";

export const dynamic = 'force-dynamic';

export const metadata = {
  title: "Danisanlar - FitKoc",
};

export default async function DanisanlarPage() {
  await dbConnect();
  const clients = await User.find({ role: "client" })
    .sort({ createdAt: -1 })
    .lean();

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Danisanlar</h1>
          <p className="text-muted mt-1">{clients.length} danisan kayitli</p>
        </div>
        <Link href="/yonetim/danisanlar/yeni">
          <Button>
            <PlusIcon className="h-4 w-4 mr-2" />
            Yeni Danisan
          </Button>
        </Link>
      </div>

      <div className="rounded-xl bg-surface border border-border overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border">
              <th className="text-left text-sm font-medium text-muted px-6 py-3">
                Ad Soyad
              </th>
              <th className="text-left text-sm font-medium text-muted px-6 py-3 hidden sm:table-cell">
                Email
              </th>
              <th className="text-left text-sm font-medium text-muted px-6 py-3 hidden md:table-cell">
                Telefon
              </th>
              <th className="text-left text-sm font-medium text-muted px-6 py-3">
                Durum
              </th>
              <th className="text-right text-sm font-medium text-muted px-6 py-3">
                Islem
              </th>
            </tr>
          </thead>
          <tbody>
            {clients.map((client: any) => (
              <tr
                key={client._id.toString()}
                className="border-b border-border last:border-0 hover:bg-surface-hover/50 transition"
              >
                <td className="px-6 py-4">
                  <p className="font-medium text-foreground">
                    {client.ad} {client.soyad}
                  </p>
                </td>
                <td className="px-6 py-4 hidden sm:table-cell">
                  <p className="text-sm text-muted">{client.email}</p>
                </td>
                <td className="px-6 py-4 hidden md:table-cell">
                  <p className="text-sm text-muted">
                    {client.telefon || "-"}
                  </p>
                </td>
                <td className="px-6 py-4">
                  <Badge variant={client.aktif ? "success" : "danger"}>
                    {client.aktif ? "Aktif" : "Pasif"}
                  </Badge>
                </td>
                <td className="px-6 py-4 text-right">
                  <Link
                    href={`/yonetim/danisanlar/${client._id}`}
                    className="text-sm text-primary hover:text-primary-hover transition"
                  >
                    Detay
                  </Link>
                </td>
              </tr>
            ))}
            {clients.length === 0 && (
              <tr>
                <td
                  colSpan={5}
                  className="px-6 py-12 text-center text-muted"
                >
                  Henuz danisan eklenmemis
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
