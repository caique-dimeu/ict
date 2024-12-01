import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: NextRequest) {
  try {
    const result = await prisma.projects.findMany({
      where: {
        status: {
          in: ['em_andamento', 'finalizado', 'rejeitado'],
        },
      },
      select: {
        id: true,
        title: true,
        status: true,
        created_at: true,
        history: {
          select: {
            status_snapshot: true,
            title_snapshot: true,
          },
        },
      },
    });

    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
}
