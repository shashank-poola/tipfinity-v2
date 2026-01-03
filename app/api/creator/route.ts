import {prisma} from "@/app/db";

export async function POST(req: Request) {
    const { name, email, bio, profileImage, superCost, publicKey } = await req.json();
    console.log(name, publicKey);

    const userId = await prisma.user.findFirst({
        where: {
            PublicKey: publicKey,
        }
    });

    const creator = await prisma.creatorProfile.create({
         data:{
             name: name,
             publicKey: publicKey,
             email: email,
             bio: bio,
             profileImage: profileImage,
             superCost: Number(superCost), 
             userId: userId?.id??"",
         }  
        })
    return new Response(JSON.stringify(creator));
    
}