import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { auth } from "@/auth";
import dbConnect from "@/lib/db";
import User from "@/lib/models/User";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ clientId: string }> }
) {
  const session = await auth();
  if (!session || session.user.role !== "admin") {
    return NextResponse.json({ error: "Yetkisiz erisim" }, { status: 401 });
  }

  const { clientId } = await params;
  await dbConnect();

  const client = await User.findById(clientId).select("-password").lean();
  if (!client) {
    return NextResponse.json(
      { error: "Danisan bulunamadi" },
      { status: 404 }
    );
  }

  return NextResponse.json(client);
}

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ clientId: string }> }
) {
  const session = await auth();
  if (!session || session.user.role !== "admin") {
    return NextResponse.json({ error: "Yetkisiz erisim" }, { status: 401 });
  }

  const { clientId } = await params;
  await dbConnect();

  try {
    const body = await req.json();
    const { password, ...updateData } = body;

    if (password && password.length > 0) {
      if (password.length < 6) {
        return NextResponse.json(
          { error: "Sifre en az 6 karakter olmalidir" },
          { status: 400 }
        );
      }
      updateData.password = await bcrypt.hash(password, 12);
    }

    const client = await User.findByIdAndUpdate(clientId, updateData, {
      new: true,
    })
      .select("-password")
      .lean();

    if (!client) {
      return NextResponse.json(
        { error: "Danisan bulunamadi" },
        { status: 404 }
      );
    }

    return NextResponse.json(client);
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Sunucu hatasi" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ clientId: string }> }
) {
  const session = await auth();
  if (!session || session.user.role !== "admin") {
    return NextResponse.json({ error: "Yetkisiz erisim" }, { status: 401 });
  }

  const { clientId } = await params;
  await dbConnect();

  const client = await User.findByIdAndDelete(clientId);
  if (!client) {
    return NextResponse.json(
      { error: "Danisan bulunamadi" },
      { status: 404 }
    );
  }

  return NextResponse.json({ message: "Danisan silindi" });
}
