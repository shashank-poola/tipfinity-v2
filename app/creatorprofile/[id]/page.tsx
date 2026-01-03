"use client";
/* eslint-disable */
import { ProfileCard } from "@/components/ui/profilecard";
import { useWallet } from "@solana/wallet-adapter-react";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Connection, Transaction, SystemProgram, PublicKey, LAMPORTS_PER_SOL } from "@solana/web3.js";
import toast from "react-hot-toast";
import { SendButton } from "@/components/SendButton";
import { ArrowLeftIcon, MoveLeftIcon } from "lucide-react";


export default function CreatorProfile() {
    const [creator, setCreator] = useState<{ id: string; userId: string; name: string; publicKey: string; email: string; bio: string; profileImage: string; superCost: string; }>();
    const [message, setMessage] = useState("");
    const [user, setUser] = useState<{ id: string; PublicKey: string } | null>(null);
    const params = useParams();
    const creatorName = decodeURIComponent(params?.id as string);
    console.log(creatorName);
    const { wallet, connected } = useWallet();
    const router = useRouter();

    useEffect(() => {
        if (!connected) {
            router.push("/");
        }
        getCreatorFromDb();
        getuserFromDb();
    }, [connected, router]);

    async function getuserFromDb() {
        if (!wallet?.adapter.publicKey) {
            return;
        }

        try {
            const res = await axios.post(`/api/user`, { publicKey: wallet.adapter.publicKey.toString() });
            setUser(res.data);
        } catch (error) {
            console.error("Error fetching user:", error);
        }
    }


    async function getCreatorFromDb() {
        const res = await axios.post(`/api/getcreator`, { name: creatorName });
        setCreator(res.data);
        console.log(res.data);
    }

    async function sendTransaction() {
        if (!connected || !wallet?.adapter.publicKey) {
            toast.error("Please connect your wallet first!");
            return;
        }

        if (!creator?.publicKey) {
            toast.error("Creator's public key is missing!");
            return;
        }

        try {
            const connection = new Connection("https://api.devnet.solana.com");
            const transaction = new Transaction().add(
                SystemProgram.transfer({
                    fromPubkey: wallet.adapter.publicKey,
                    toPubkey: new PublicKey(creator.publicKey),
                    lamports: Number(creator?.superCost) * LAMPORTS_PER_SOL,
                })
            );

            const signature = await wallet.adapter.sendTransaction(transaction, connection);
            toast.success(`Transaction successful!`);


            await sendMessage(signature);
        } catch (error) {
            toast.error("Transaction failed! Please try again. " + error);
        }
    }
    async function sendMessage(txSignature: string) {
        try {
            console.log("🔍 Sending data to /api/send:", {
                email: creator?.email,
                name: creator?.name,
                message: message,
                transactionSignature: txSignature,
            });

            await axios.post(`/api/send`, {
                email: creator?.email,
                name: creator?.name,
                message: message,
                transactionSignature: txSignature,
            });

            await axios.post(`/api/createtip`, {
                senderId: user?.id,
                receiverId: creator?.id,
                message: message,
            });

            toast.success("Message sent successfully!");
        } catch (error) {
            toast.error("Failed to send message. Please try again." + error);
        }
    }


    return (
        <div className="h-screen flex justify-center px-4">
            <div className="top-5 left-5 relative  h-8 w-8 rounded-lg hover:bg-tipfinity-dark flex items-center justify-center" onClick={() => router.back()}>
                <ArrowLeftIcon className="text-white/70 h-5 w-5" />
            </div>
            {creator ? (
                <div className="flex flex-col items-center w-full max-w-3xl">
                    {/* Profile Image */}
                    <div className="flex justify-center mb-5">
                        <ProfileCard creator={creator.profileImage || "https://www.jammable.com/cdn-cgi/image/width=3840,quality=25,format=webp/https://imagecdn.voicify.ai/models/7b8e5953-3f47-40a3-9fa6-db2e39aa383c.png"} />
                    </div>

                    {/* Name */}
                    <div className="font-semibold text-2xl mb-6 text-center w-full">
                        {creator.name}
                    </div>

                    {/* Bio */}
                    <div className="text-white/70 text-sm sm:text-md md:text-lg font-medium mb-10 break-words text-center max-w-3xl w-full px-4">
                        {creator.bio}
                    </div>

                    {/* Tip Box */}
                    <div className="bg-tipfinity-dark p-6 rounded-lg w-full max-w-3xl flex flex-col items-center">
                        <div className="text-lg sm:text-xl font-semibold mb-4 text-center">
                            <span className="text-white/70">Send a Tip to</span>
                            <span className="text-tipfinity-primary"> {creator.name}</span>
                        </div>

                        <div className="border border-tipfinity-dark/50 bg-tipfinity-dark/50 rounded-lg flex flex-col items-center w-full p-4">
                            <textarea
                                className="w-full bg-tipfinity-dark/30 text-white/70 placeholder-white/30 outline-none text-base sm:text-md resize-none overflow-auto break-words rounded-lg text-center py-3 px-4"
                                placeholder="Type your message..."
                                rows={4}
                                onChange={(e) => setMessage(e.target.value)}
                            />

                            <SendButton onclick={sendTransaction} superCost={creator?.superCost} />
                        </div>
                    </div>
                </div>
            ) : (
                <div className="flex flex-col items-center w-full max-w-3xl">
                    <div className="flex justify-center mb-5">
                        <div className="h-24 w-24 rounded-full= bg-gray-800 animate-pulse"></div>
                    </div>
                    <div className="h-6 w-48 bg-gray-800 animate-pulse rounded mb-6"></div>

                    <div className="h-4 w-3/4 bg-gray-800 animate-pulse rounded mb-10"></div>
                    <div className="bg-neutral-800 p-6 rounded-lg w-full max-w-3xl flex flex-col items-center">
                        <div className="h-6 w-40 bg-gray-800 animate-pulse rounded mb-4"></div>

                        <div className="border border-neutral-600 bg-neutral-900 rounded-lg flex flex-col items-center w-full p-4">
                            <div className="h-20 w-full bg-gray-800 animate-pulse rounded-lg mb-4"></div>
                            <div className="h-10 w-24 bg-gray-800 animate-pulse rounded-lg"></div>
                        </div>
                    </div>
                </div>
            )}

        </div>
    );
}
