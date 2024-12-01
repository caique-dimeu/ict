import { prisma } from "@/lib/prisma";

export async function deleteUser(user: { userId: number; role: string }, request: Request) {
  const { id } = await request.json();

  if (user.role !== "admin") {
    return new Response(JSON.stringify({ error: "Acesso negado" }), { status: 403 });
  }

  const userToDelete = await prisma.users.findUnique({ where: { id: Number(id) } });

  if (!userToDelete) {
    return new Response(JSON.stringify({ error: "Usuário não encontrado" }), { status: 404 });
  }

  await prisma.users.delete({ where: { id: Number(id) } });

  return new Response(JSON.stringify({ message: "Usuário deletado com sucesso" }), { status: 200 });
}
