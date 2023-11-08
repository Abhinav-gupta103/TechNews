import prisma from "@/lib/prismadb";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: { email: string } }
) {
  try {
    const email = params.email;
    const likes = await prisma.user.findUnique({
      where: { email: email },
      include: {
        like: { orderBy: { createdAt: "desc" } },
      },
    });
    return NextResponse.json(likes);
  } catch (error) {
    return NextResponse.json({ error: error });
  }
}
