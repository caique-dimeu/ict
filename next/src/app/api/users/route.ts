import { getUsers } from "./get";
import { updateUser } from "./put";
import { deleteUser } from "./delete";
import { authenticate } from "@/lib/middleware/auth";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const authResult = authenticate(request);

  if (authResult.error) {
    return NextResponse.json({ error: authResult.error }, { status: authResult.status });
  }

  if (!authResult.user) {
    return NextResponse.json({ error: "Usuário não autenticado" }, { status: 401 });
  }

  return getUsers(authResult.user, request);
}

export async function PUT(request: NextRequest) {
  const authResult = authenticate(request);

  if (authResult.error) {
    return NextResponse.json({ error: authResult.error }, { status: authResult.status });
  }

  if (!authResult.user) {
    return NextResponse.json({ error: "Usuário não autenticado" }, { status: 401 });
  }

  return updateUser(authResult.user, request);
}

export async function DELETE(request: NextRequest) {
  const authResult = authenticate(request);

  if (authResult.error) {
    return NextResponse.json({ error: authResult.error }, { status: authResult.status });
  }

  if (!authResult.user) {
    return NextResponse.json({ error: "Usuário não autenticado" }, { status: 401 });
  }

  return deleteUser(authResult.user, request);
}
