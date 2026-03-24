import Navbar from "@/components/layout/Navbar";
import Packages from "@/components/landing/Packages";
import CTA from "@/components/landing/CTA";
import Footer from "@/components/layout/Footer";

export const metadata = {
  title: "Paketler - FitKoc",
};

export default function PaketlerPage() {
  return (
    <>
      <Navbar />
      <div className="pt-24">
        <Packages />
        <CTA />
      </div>
      <Footer />
    </>
  );
}
