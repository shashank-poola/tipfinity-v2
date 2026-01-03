import { prisma } from "@/app/db";

export async function POST(req: Request) {
    const { senderId, receiverId, message } = await req.json();
    console.log(senderId, receiverId, message);

    const superchat = await prisma.superchat.create({
        data: {
            senderId: senderId,
            receiverId: receiverId,
            message: message,
        },
    });
    return new Response(JSON.stringify(superchat), { status: 200 });
}