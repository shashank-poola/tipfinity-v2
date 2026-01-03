import { prisma } from "@/lib/db";

export async function GET() {
    const creators = await prisma.creatorProfile.findMany();
    return new Response(JSON.stringify(creators), { status: 200 });
  }