"use client";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { motion } from 'framer-motion';

export function CreatorCard({
  creator
}: {
  creator:  {
    name: string;
    publicKey: string;
    profileImage: string;
    email: string;
    bio: string;
    id: string;
    userId: string;
  };
})
 {
  const router = useRouter();
  const handleClick = () => {
    router.push(`/creatorprofile/${creator.name}`);
  };
  return (
    <motion.div className=" group/card m-1" onClick={()=>{handleClick()}}
    initial={{y:20, opacity: 0 }}
    animate={{ y:0,opacity: 1 }}
    transition={{ duration: 0.8}}
    >
      <div
        className={cn(
          "relative mx-auto flex h-[200px] w-[200px] max-w-sm flex-col justify-end overflow-hidden rounded-md p-4 shadow-xl cursor-pointer bg-cover bg-center"
        )}
        style={{ backgroundImage: `url(${creator.profileImage})` }} 
      >
        <div className="absolute top-0 left-0 h-full w-full bg-black/80 opacity-60 transition duration-300 group-hover/card:bg-black/5"></div>

        <div className="relative z-10 flex flex-col items-center justify-center text-center">
          <div className="text-lg font-semibold text-white/80 md:text-xl">
            {creator.name}
          </div>
          <div className="my-1 text-sm font-normal text-white/50">
            {creator.bio}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

