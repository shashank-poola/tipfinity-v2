"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { motion } from "framer-motion";

export function CreatorInput({ onsubmit, register }: { onsubmit: () => void; register: any }) {
  return (
    <motion.div className="shadow-input mx-auto w-full max-w-md rounded-none bg-white p-4 md:rounded-2xl md:p-8 dark:bg-transparent"
    initial={{y:15, opacity: 0 }}
    animate={{ y:0,opacity: 1 }}
    transition={{ duration: 0.4}}
    >
      
      <form className="my-8" onSubmit={onsubmit}>
        <LabelInputContainer>
          <Label htmlFor="name">Your Name</Label>
          <Input {...register("name")} placeholder="Bruce Wayne" type="text" />
        </LabelInputContainer>

        <LabelInputContainer>
          <Label htmlFor="superCost">SuperCost</Label>
          <Input {...register("superCost")} placeholder="You can't afford me" type="text" />
        </LabelInputContainer>

        <LabelInputContainer className="mb-4">
          <Label htmlFor="email">Email Address</Label>
          <Input {...register("email")} placeholder="tipfinityuser@example.com" type="email" />
        </LabelInputContainer>

        <LabelInputContainer className="mb-4">
          <Label htmlFor="profileImage">Profile Image (URL)</Label>
          <Input {...register("profileImage")} placeholder="https://profile.png" type="text" />
        </LabelInputContainer>

        <LabelInputContainer className="mb-8">
          <Label htmlFor="bio">Your Bio</Label>
          <Input {...register("bio")} placeholder="I'm Vengeance" type="text" className="h-20 text-center" />
        </LabelInputContainer>

        <button
          className="group/btn relative block h-10 w-full rounded-md bg-gradient-to-br from-tipfinity-primary to-tipfinity-dark font-medium text-white shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset]"
          type="submit"
        >
          Sign up
          <BottomGradient />
        </button>
      </form>
    </motion.div>
  );
}

const BottomGradient = () => (
  <>
    <span className="absolute inset-x-0 -bottom-px block h-px w-full bg-gradient-to-r from-transparent via-tipfinity-light to-transparent opacity-0 transition duration-500 group-hover/btn:opacity-100" />
    <span className="absolute inset-x-10 -bottom-px mx-auto block h-px w-1/2 bg-gradient-to-r from-transparent via-tipfinity-light to-transparent opacity-0 blur-sm transition duration-500 group-hover/btn:opacity-100" />
  </>
);

const LabelInputContainer = ({ children, className }: { children: React.ReactNode; className?: string }) => (
  <div className={cn("flex w-full flex-col space-y-2 my-3", className)}>
    {children}
  </div>
);
