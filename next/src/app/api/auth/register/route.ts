import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import { generateToken } from '@/lib/jwt';

const prisma = new PrismaClient();

export async function POST(request: Request) {
  const { name, email, password, role } = await request.json();

  const existingUser = await prisma.users.findUnique({ where: { email } });
  if (existingUser) {
    return NextResponse.json({ error: 'Email já registrado' }, { status: 400 });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = await prisma.users.create({
    data: {
      name,
      email,
      password_hash: hashedPassword,
      role,
    },
  });

  const token = generateToken(newUser.id, newUser.role);

  const response = NextResponse.json({ message: 'Usuário registrado com sucesso' });
  response.cookies.set('auth_token', token, { httpOnly: true, secure: process.env.NODE_ENV === 'production' });

  return response;
}
