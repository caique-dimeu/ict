import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: NextRequest) {
  try {
    const result = await prisma.projects.findMany({
      where: {
        advisor_id: {
          not: null,
        },
      },
      select: {
        title: true,
        users_projects_advisor_idTousers: {
          select: {
            name: true,
          },
        },
      },
    });

    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
}
