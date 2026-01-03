"use client";
import React from "react";

export function SendButton({ onclick, superCost }: { onclick: () => void; superCost: string; }) {
  return (
    
    <div >


        <button
          className="group/btn px-5 py-2 border border-neutral-600 relative block w-full rounded-md bg-gradient-to-br from-tipfinity-primary to-tipfinity-dark font-medium text-white shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset]"
          onClick={onclick}
        >
          Send ({superCost}) SOL
          <BottomGradient />
        </button>

    </div>
  );
}

const BottomGradient = () => {
  return (
    <>
      <span className="absolute inset-x-0 -bottom-px block h-px w-full bg-gradient-to-r from-transparent via-tipfinity-light to-transparent opacity-0 transition duration-500 group-hover/btn:opacity-100" />
      <span className="absolute inset-x-10 -bottom-px mx-auto block h-px w-1/2 bg-gradient-to-r from-transparent via-tipfinity-light to-transparent opacity-0 blur-sm transition duration-500 group-hover/btn:opacity-100" />
    </>
  );
};


