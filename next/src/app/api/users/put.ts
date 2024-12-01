import { prisma } from "@/lib/prisma";

export async function updateUser(user: { userId: number; role: string }, request: Request) {
  const { id, name, email, avatar } = await request.json();
  if (user.role !== "admin") {
    return new Response(JSON.stringify({ error: "Acesso negado" }), { status: 403 });
  }

  const userToUpdate = await prisma.users.findUnique({ where: { id: Number(id) } });

  if (!userToUpdate) {
    return new Response(JSON.stringify({ error: "Usuário não encontrado" }), { status: 404 });
  }

  const updatedUser = await prisma.users.update({
    where: { id: Number(id) },
    data: { name, email, avatar },
    select: { id: true, name: true, email: true, avatar: true, role: true },
  });

  return new Response(JSON.stringify(updatedUser), { status: 200 });
}
