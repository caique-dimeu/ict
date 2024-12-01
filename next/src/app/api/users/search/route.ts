import { prisma } from "@/lib/prisma";
import { authenticate } from "@/lib/middleware/auth";
import { NextRequest, NextResponse } from "next/server";
import { user_role } from "@prisma/client";

export async function GET(request: NextRequest) {
  const authResult = authenticate(request);

  if (authResult.error) {
    return NextResponse.json({ error: authResult.error }, { status: authResult.status });
  }

  const user = authResult.user;

  if (!user) {
    return NextResponse.json({ error: "Usuário não autenticado" }, { status: 401 });
  }

  if (user.role !== "admin") {
    return NextResponse.json({ error: "Acesso negado" }, { status: 403 });
  }

  const { searchParams } = new URL(request.url);
  const query = searchParams.get("query") || undefined;

  let role = searchParams.get("role") as string | undefined;
  if (role && !Object.values(user_role).includes(role as user_role)) {
    return NextResponse.json({ error: "Role inválido" }, { status: 400 });
  }

  const users = await prisma.users.findMany({
    where: {
      name: query ? { contains: query, mode: "insensitive" } : undefined,
      role: role as user_role | undefined,
    },
    select: { id: true, name: true, email: true, avatar: true, role: true },
  });

  return NextResponse.json(users, { status: 200 });
}
