import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { auth } from "@/auth";
import dbConnect from "@/lib/db";
import User from "@/lib/models/User";

export async function GET() {
  const session = await auth();
  if (!session || session.user.role !== "admin") {
    return NextResponse.json({ error: "Yetkisiz erisim" }, { status: 401 });
  }

  await dbConnect();
  const clients = await User.find({ role: "client" })
    .select("-password")
    .sort({ createdAt: -1 })
    .lean();

  return NextResponse.json(clients);
}

export async function POST(req: NextRequest) {
  const session = await auth();
  if (!session || session.user.role !== "admin") {
    return NextResponse.json({ error: "Yetkisiz erisim" }, { status: 401 });
  }

  await dbConnect();

  try {
    const body = await req.json();
    const { email, password, ad, soyad, ...rest } = body;

    if (!email || !password || !ad || !soyad) {
      return NextResponse.json(
        { error: "Email, sifre, ad ve soyad zorunludur" },
        { status: 400 }
      );
    }

    if (password.length < 6) {
      return NextResponse.json(
        { error: "Sifre en az 6 karakter olmalidir" },
        { status: 400 }
      );
    }

    const existingUser = await User.findOne({ email: email.toLowerCase() });
    if (existingUser) {
      return NextResponse.json(
        { error: "Bu email adresi zaten kayitli" },
        { status: 400 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const client = await User.create({
      email: email.toLowerCase(),
      password: hashedPassword,
      ad,
      soyad,
      role: "client",
      aktif: true,
      ...rest,
    });

    const clientObj = client.toObject();
    const { password: _, ...clientWithoutPassword } = clientObj;

    return NextResponse.json(clientWithoutPassword, { status: 201 });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Sunucu hatasi" },
      { status: 500 }
    );
  }
}
