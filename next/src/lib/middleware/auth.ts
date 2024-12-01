import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "";

export function authenticate(request: NextRequest) {
  const token = request.cookies.get("auth_token")?.value;

  if (!token) {
    return { error: "Token não encontrado", status: 401 };
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as { userId: number; role: string };
    return { user: decoded, status: 200 };
  } catch (error) {
    return { error: "Token inválido ou expirado", status: 401 };
  }
}
