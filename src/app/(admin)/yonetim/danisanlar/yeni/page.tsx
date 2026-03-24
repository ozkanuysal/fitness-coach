"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import Input from "@/components/ui/Input";
import Select from "@/components/ui/Select";
import Textarea from "@/components/ui/Textarea";
import Button from "@/components/ui/Button";

export default function YeniDanisanPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    email: "",
    password: "",
    ad: "",
    soyad: "",
    telefon: "",
    boy: "",
    kilo: "",
    yas: "",
    cinsiyet: "",
    hedef: "",
    notlar: "",
    gunlukKalori: "",
    gunlukProtein: "",
    gunlukKarbonhidrat: "",
    gunlukYag: "",
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("/api/clients", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          boy: form.boy ? Number(form.boy) : undefined,
          kilo: form.kilo ? Number(form.kilo) : undefined,
          yas: form.yas ? Number(form.yas) : undefined,
          gunlukKalori: form.gunlukKalori ? Number(form.gunlukKalori) : undefined,
          gunlukProtein: form.gunlukProtein ? Number(form.gunlukProtein) : undefined,
          gunlukKarbonhidrat: form.gunlukKarbonhidrat ? Number(form.gunlukKarbonhidrat) : undefined,
          gunlukYag: form.gunlukYag ? Number(form.gunlukYag) : undefined,
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Bir hata olustu");
      }

      toast.success("Danisan basariyla eklendi!");
      router.push("/yonetim/danisanlar");
      router.refresh();
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-foreground">Yeni Danisan</h1>
        <p className="text-muted mt-1">Yeni bir danisan hesabi olusturun</p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="max-w-2xl rounded-xl bg-surface border border-border p-6 space-y-6"
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Input
            label="Ad"
            id="ad"
            name="ad"
            value={form.ad}
            onChange={handleChange}
            required
          />
          <Input
            label="Soyad"
            id="soyad"
            name="soyad"
            value={form.soyad}
            onChange={handleChange}
            required
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Input
            label="Email"
            id="email"
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            required
          />
          <Input
            label="Sifre"
            id="password"
            name="password"
            type="password"
            value={form.password}
            onChange={handleChange}
            required
            placeholder="En az 6 karakter"
          />
        </div>

        <Input
          label="Telefon"
          id="telefon"
          name="telefon"
          value={form.telefon}
          onChange={handleChange}
          placeholder="05XX XXX XXXX"
        />

        <div className="border-t border-border pt-6">
          <h3 className="text-sm font-semibold text-foreground mb-4">
            Fiziksel Bilgiler
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <Input
              label="Boy (cm)"
              id="boy"
              name="boy"
              type="number"
              value={form.boy}
              onChange={handleChange}
            />
            <Input
              label="Kilo (kg)"
              id="kilo"
              name="kilo"
              type="number"
              value={form.kilo}
              onChange={handleChange}
            />
            <Input
              label="Yas"
              id="yas"
              name="yas"
              type="number"
              value={form.yas}
              onChange={handleChange}
            />
            <Select
              label="Cinsiyet"
              id="cinsiyet"
              name="cinsiyet"
              value={form.cinsiyet}
              onChange={handleChange}
              placeholder="Seciniz"
              options={[
                { value: "erkek", label: "Erkek" },
                { value: "kadin", label: "Kadin" },
              ]}
            />
          </div>
        </div>

        <div className="border-t border-border pt-6">
          <h3 className="text-sm font-semibold text-foreground mb-4">
            Gunluk Makro Hedefleri
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <Input
              label="Kalori (kcal)"
              id="gunlukKalori"
              name="gunlukKalori"
              type="number"
              value={form.gunlukKalori}
              onChange={handleChange}
            />
            <Input
              label="Protein (g)"
              id="gunlukProtein"
              name="gunlukProtein"
              type="number"
              value={form.gunlukProtein}
              onChange={handleChange}
            />
            <Input
              label="Karbonhidrat (g)"
              id="gunlukKarbonhidrat"
              name="gunlukKarbonhidrat"
              type="number"
              value={form.gunlukKarbonhidrat}
              onChange={handleChange}
            />
            <Input
              label="Yag (g)"
              id="gunlukYag"
              name="gunlukYag"
              type="number"
              value={form.gunlukYag}
              onChange={handleChange}
            />
          </div>
        </div>

        <Textarea
          label="Hedef"
          id="hedef"
          name="hedef"
          value={form.hedef}
          onChange={handleChange}
          placeholder="Danisanin hedefi nedir?"
        />

        <Textarea
          label="Notlar"
          id="notlar"
          name="notlar"
          value={form.notlar}
          onChange={handleChange}
          placeholder="Ek notlar..."
        />

        <div className="flex gap-3">
          <Button type="submit" disabled={loading}>
            {loading ? "Kaydediliyor..." : "Danisani Kaydet"}
          </Button>
          <Button
            type="button"
            variant="secondary"
            onClick={() => router.back()}
          >
            Iptal
          </Button>
        </div>
      </form>
    </div>
  );
}
