import Navbar from "@/components/layout/Navbar";
import Hero from "@/components/landing/Hero";
import Features from "@/components/landing/Features";
import Testimonials from "@/components/landing/Testimonials";
import Packages from "@/components/landing/Packages";
import CTA from "@/components/landing/CTA";
import Footer from "@/components/layout/Footer";

export default function HomePage() {
  return (
    <>
      <Navbar />
      <Hero />
      <Features />
      <Testimonials />
      <Packages />
      <CTA />
      <Footer />
    </>
  );
}
