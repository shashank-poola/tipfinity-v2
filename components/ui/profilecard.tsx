"use client";
import { cn } from "@/lib/utils";


export function ProfileCard({creator}:{creator:string})
 {
 
  return (
    <div className=" group/card " >
      <div
        className={cn(
          "relative flex h-[180px] w-[200px] max-w-sm flex-col justify-end overflow-hidden rounded-md  shadow-xl cursor-pointer bg-cover bg-center"
        )}
        style={{ backgroundImage: `url(${creator})` }} 
      >
        {/* Overlay */}
    <div className="absolute top-0 left-0 h-full w-full bg-black/40 opacity-60 transition duration-300 group-hover/card:bg-white/10"></div>
      </div>
    </div>
  );
}

