import { prisma } from "@/app/db";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    const { name, publicKey } = await req.json();

    try {
        const creator = await prisma.creatorProfile.findFirst({
            where: {
                OR: [
                    name ? { name } : {},
                    publicKey ? { publicKey } : {}
                ]
            }
        });

        return new NextResponse(JSON.stringify(creator), { status: 200 });
    } catch (error) {
        return new NextResponse(JSON.stringify({ error: error }), { status: 500 });
    }
}
