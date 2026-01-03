import { prisma } from "@/app/db";

export async function GET() {
    const creators = await prisma.creatorProfile.findMany();
    return new Response(JSON.stringify(creators), { status: 200 });
  }