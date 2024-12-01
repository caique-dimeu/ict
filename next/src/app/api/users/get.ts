import { prisma } from "@/lib/prisma";

export async function getUsers(user: { userId: number; role: string }, request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");

  if (user.role !== "admin") {
    return new Response(JSON.stringify({ error: "Acesso negado" }), { status: 403 });
  }

  if (id) {
    const userById = await prisma.users.findUnique({
      where: { id: Number(id) },
      select: { id: true, name: true, email: true, avatar: true, role: true },
    });

    if (!userById) {
      return new Response(JSON.stringify({ error: "Usuário não encontrado" }), { status: 404 });
    }

    return new Response(JSON.stringify(userById), { status: 200 });
  }

  const users = await prisma.users.findMany({
    select: { id: true, name: true, email: true, avatar: true, role: true },
  });

  return new Response(JSON.stringify(users), { status: 200 });
}
