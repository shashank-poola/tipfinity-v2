"use client";
/* eslint-disable */
import { useWallet } from "@solana/wallet-adapter-react";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Connection, Transaction, SystemProgram, PublicKey, LAMPORTS_PER_SOL } from "@solana/web3.js";
import toast from "react-hot-toast";
import { SendButton } from "@/components/SendButton";
import { ArrowLeftIcon } from "lucide-react";
import { Creator, User } from "@/types";


export default function CreatorProfile() {
    const [creator, setCreator] = useState<Creator>();
    const [message, setMessage] = useState("");
    const [tipAmount, setTipAmount] = useState("");
    const [user, setUser] = useState<User | null>(null);
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

        const amount = parseFloat(tipAmount);
        if (!tipAmount || isNaN(amount) || amount <= 0) {
            toast.error("Please enter a valid tip amount!");
            return;
        }

        // Optional: Check minimum amount
        const minAmount = parseFloat(creator?.superCost || "0");
        if (amount < minAmount) {
            toast.error(`Minimum tip amount is ${minAmount} SOL`);
            return;
        }

        try {
            const connection = new Connection("https://api.devnet.solana.com");
            const transaction = new Transaction().add(
                SystemProgram.transfer({
                    fromPubkey: wallet.adapter.publicKey,
                    toPubkey: new PublicKey(creator.publicKey),
                    lamports: amount * LAMPORTS_PER_SOL,
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
            console.log("Sending data to /api/send:", {
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
        <div className="h-screen flex items-center justify-center px-4 py-4 overflow-hidden">
            {creator ? (
                <div className="flex flex-col items-center w-full max-w-2xl relative">
                    {/* Back Button */}
                    <div className="absolute top-0 left-0 h-8 w-8 rounded-lg hover:bg-neutral-800 flex items-center justify-center cursor-pointer" onClick={() => router.back()}>
                        <ArrowLeftIcon className="text-white/70 h-5 w-5" />
                    </div>
                    {/* Profile Image */}
                    <div className="flex justify-center mb-2 mt-2">
                        <img 
                            src={creator.profileImage || "https://www.jammable.com/cdn-cgi/image/width=3840,quality=25,format=webp/https://imagecdn.voicify.ai/models/7b8e5953-3f47-40a3-9fa6-db2e39aa383c.png"}
                            alt={creator.name}
                            className="h-20 w-20 rounded-xl object-cover border-2 border-neutral-700"
                        />
                    </div>

                    {/* Name */}
                    <div className="font-semibold text-lg mb-1 text-center w-full text-white">
                        {creator.name}
                    </div>

                    {/* Bio */}
                    <div className="text-white/60 text-xs font-medium mb-3 break-words text-center max-w-xl w-full px-4 line-clamp-1">
                        {creator.bio}
                    </div>

                    {/* Tip Box */}
                    <div className="bg-tipfinity-dark p-3 rounded-lg w-full max-w-md flex flex-col items-center">
                        <div className="text-sm font-semibold mb-2 text-center">
                            <span className="text-white/70">Send a Tip to </span>
                            <span className="text-tipfinity-primary">{creator.name}</span>
                        </div>

                        <div className="border border-tipfinity-dark/50 bg-tipfinity-dark/50 rounded-lg flex flex-col items-center w-full p-2.5 gap-2.5">
                            {/* Custom Amount Input */}
                            <div className="w-full">
                                <label className="text-white/60 text-xs mb-1 block">
                                    Amount (SOL) {creator?.superCost && <span className="text-white/40">- Min: {creator.superCost}</span>}
                                </label>
                                <input
                                    type="number"
                                    step="0.1"
                                    min="0"
                                    placeholder="Enter amount"
                                    value={tipAmount}
                                    onChange={(e) => setTipAmount(e.target.value)}
                                    className="w-full bg-tipfinity-dark/30 text-white placeholder-white/30 outline-none text-sm rounded-lg py-1.5 px-2.5 border border-neutral-700 focus:border-tipfinity-primary transition-all"
                                />
                            </div>

                            {/* Message Input */}
                            <div className="w-full">
                                <label className="text-white/60 text-xs mb-1 block">Message (Optional)</label>
                                <textarea
                                    className="w-full bg-tipfinity-dark/30 text-white/70 placeholder-white/30 outline-none text-xs resize-none overflow-auto break-words rounded-lg py-1.5 px-2.5 border border-neutral-700 focus:border-tipfinity-primary transition-all"
                                    placeholder="Leave a message..."
                                    rows={2}
                                    onChange={(e) => setMessage(e.target.value)}
                                />
                            </div>

                            <SendButton onclick={sendTransaction} superCost={tipAmount || "0"} />
                        </div>
                    </div>
                </div>
            ) : (
                <div className="flex flex-col items-center w-full max-w-md">
                    <div className="flex justify-center mb-2 mt-2">
                        <div className="h-20 w-20 rounded-xl bg-gray-800 animate-pulse"></div>
                    </div>
                    <div className="h-4 w-28 bg-gray-800 animate-pulse rounded mb-1"></div>
                    <div className="h-3 w-40 bg-gray-800 animate-pulse rounded mb-3"></div>
                    <div className="bg-neutral-800 p-3 rounded-lg w-full max-w-md flex flex-col items-center">
                        <div className="h-4 w-28 bg-gray-800 animate-pulse rounded mb-2"></div>
                        <div className="border border-neutral-600 bg-neutral-900 rounded-lg flex flex-col items-center w-full p-2.5 gap-2.5">
                            <div className="h-8 w-full bg-gray-800 animate-pulse rounded-lg"></div>
                            <div className="h-12 w-full bg-gray-800 animate-pulse rounded-lg"></div>
                            <div className="h-8 w-full bg-gray-800 animate-pulse rounded-lg"></div>
                        </div>
                    </div>
                </div>
            )}

        </div>
    );
}
