import ClientSidebar from "@/components/layout/ClientSidebar";
import MobileMenu from "@/components/layout/MobileMenu";

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-background">
      <ClientSidebar />
      <MobileMenu />
      <main className="lg:pl-64">
        <div className="p-4 sm:p-6 lg:p-8">{children}</div>
      </main>
    </div>
  );
}
