'use client';
/* eslint-disable*/
import { CreatorInput } from "@/components/CreatorInput";
import { useWallet } from "@solana/wallet-adapter-react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect} from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

export default function BecomeACreator() {
    const { wallet, connected } = useWallet();
    const { register, handleSubmit } = useForm();
    const router = useRouter();
  
    useEffect(() => {
        if (!connected) {
            router.push("/"); 
        }
    }, [connected, router]);


    async function newCreator(data: any) {
        const creatorData = {
            ...data,
            publicKey: wallet?.adapter.publicKey?.toString(),
        };
        try {
            await axios.post("/api/creator", creatorData);
            toast.success("Creator created successfully!");
            router.push('/profile');
        } catch (error) {
            toast.error("Error creating creator " + error);
        }

    }

    return (
        <div className="flex flex-col items-center justify-center">
            <h1 className="text-3xl font-bold mb-4">Start your journey as a Creator</h1>
            <p className="text-white/50 text-lg">Create your profile and start receiving tips.</p>
            <CreatorInput onsubmit={handleSubmit((formData) => newCreator(formData)) } register={register} />
        </div>
    );
}
