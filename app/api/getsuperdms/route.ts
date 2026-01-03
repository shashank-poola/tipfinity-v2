import { prisma } from "@/app/db";

export async function POST(req: Request) {
    const { publicKey } = await req.json();
    const sentchats = await prisma.superchat.findMany({
        where: {
            senderId: publicKey,
        },
    });

    const receivedchats = await prisma.superchat.findMany({
        where: {
            receiverId: publicKey,
        },
    });

    return new Response(JSON.stringify({ sentchats, receivedchats }), { status: 200 });
}