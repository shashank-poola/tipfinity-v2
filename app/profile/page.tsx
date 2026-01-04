"use client";

import { useWallet } from "@solana/wallet-adapter-react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { XIcon } from "lucide-react";

export default function Profile() {
    const [creatorProfile, setCreatorProfile] = useState<{ 
        id: string; userId: string; name: string; publicKey: string; 
        email: string; bio: string; profileImage: string; superCost: string; 
    } | null>(null);
    
    const { connected, wallet } = useWallet();
    const [receivedMessages, setReceivedMessages] = useState<{ 
        id: string; senderId: string; receiverId: string; message: string; 
    }[]>([]);
    const [sentMessages, setSentMessages] = useState<{ 
        id: string; senderId: string; receiverId: string; message: string; 
    }[]>([]);
    
    const [totalEarnings, setTotalEarnings] = useState<number>(0);
    const [biggestSuperFan, setBiggestSuperFan] = useState<string | null>(null);
    const [isOpen, setIsOpen] = useState(false);
    const [activeTab, setActiveTab] = useState<"earnings" | "received" | "sent" | "superfan" | null>(null);
    const [imageError, setImageError] = useState(false);
    const router = useRouter();

    useEffect(() => {
        if (!connected) {
            router.push("/");
        } else {
            setImageError(false); // Reset image error when loading profile
            getUserFromDb();
        }
        
    }, [connected, router]);

    useEffect(() => {
        if (creatorProfile) {
            getMessages();
        }
        
    }, [creatorProfile]);

    useEffect(() => {
        if (creatorProfile) {
            getEarnings();
        }
        
    }, [receivedMessages]); 

    async function getMessages() {
        if (!creatorProfile?.id) return;

        try {
            const res = await axios.post(`/api/getmessages`, {
                creatorId: creatorProfile?.id,
            });

            setReceivedMessages(res.data.receivedMessages);
            setSentMessages(res.data.sentMessages);
            setBiggestSuperFan(res.data.biggestSuperFan);
        } catch (error) {
            console.error("Error fetching messages:", error);
        }
    }

    function getEarnings() {
        if (!creatorProfile?.superCost) return;

        const earnings = parseFloat(creatorProfile.superCost) * receivedMessages.length;
        setTotalEarnings(earnings);
    }

    async function getUserFromDb() {
        try {
            const res = await axios.post("/api/getcreator", {
                publicKey: wallet?.adapter.publicKey?.toString(),
            });
            const creator = res.data;
            setCreatorProfile(creator);
        } catch (error) {
            console.error("Error fetching creator:", error);
        }
    }

    return (
        <div className="min-h-screen flex justify-center py-8 px-4">
            {wallet ? (
                <div className="flex flex-col items-center w-full max-w-3xl">
                    {/* Profile Card */}
                    <div className="bg-neutral-900/80 backdrop-blur-xl border border-neutral-800 rounded-2xl p-6 w-full mb-6 shadow-xl">
                        <div className="flex flex-col items-center">
                            <div className="relative group mb-4">
                                <div className="absolute inset-0 bg-gradient-to-r from-tipfinity-primary to-purple-600 rounded-xl blur-lg opacity-50 group-hover:opacity-75 transition-opacity"></div>
                                <img 
                                    src={imageError || !creatorProfile?.profileImage
                                        ? `https://ui-avatars.com/api/?name=${encodeURIComponent(creatorProfile?.name || "User")}&size=256&background=2B8CD1&color=fff&bold=true`
                                        : creatorProfile.profileImage
                                    }
                                    alt={creatorProfile?.name || "Profile"}
                                    onError={() => setImageError(true)}
                                    className="relative h-32 w-32 rounded-xl object-cover border-4 border-neutral-800"
                                />
                            </div>

                            <h1 className="text-2xl font-bold text-white mb-2">{creatorProfile?.name || "Anonymous"}</h1>

                            {creatorProfile?.bio ? (
                                <p className="text-white/70 text-center max-w-lg">{creatorProfile.bio}</p>
                            ) : (
                                <div className="border border-neutral-700 rounded-xl cursor-pointer p-3 hover:bg-tipfinity-primary/10 hover:border-tipfinity-primary mt-2 transition-all" onClick={() => { router.push("/creator") }}>
                                    <span className="text-white">Become a creator</span>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Stats Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
                        <button
                            className="bg-neutral-900/80 backdrop-blur-xl border border-neutral-800 text-white py-6 px-6 rounded-xl hover:border-tipfinity-primary hover:bg-tipfinity-primary/10 transition-all shadow-lg group"
                            onClick={() => { setActiveTab("earnings"); setIsOpen(true); }}
                        >
                            <div className="text-lg font-semibold group-hover:text-tipfinity-primary transition-colors">Total Earnings</div>
                        </button>
                        <button
                            className="bg-neutral-900/80 backdrop-blur-xl border border-neutral-800 text-white py-6 px-6 rounded-xl hover:border-tipfinity-primary hover:bg-tipfinity-primary/10 transition-all shadow-lg group"
                            onClick={() => { setActiveTab("received"); setIsOpen(true); }}
                        >
                            <div className="text-lg font-semibold group-hover:text-tipfinity-primary transition-colors">Tips Received</div>
                        </button>
                        <button
                            className="bg-neutral-900/80 backdrop-blur-xl border border-neutral-800 text-white py-6 px-6 rounded-xl hover:border-tipfinity-primary hover:bg-tipfinity-primary/10 transition-all shadow-lg group"
                            onClick={() => { setActiveTab("sent"); setIsOpen(true); }}
                        >
                            <div className="text-lg font-semibold group-hover:text-tipfinity-primary transition-colors">Tips Sent</div>
                        </button>
                        <button
                            className="bg-neutral-900/80 backdrop-blur-xl border border-neutral-800 text-white py-6 px-6 rounded-xl hover:border-tipfinity-primary hover:bg-tipfinity-primary/10 transition-all shadow-lg group"
                            onClick={() => { setActiveTab("superfan"); setIsOpen(true); }}
                        >
                            <div className="text-lg font-semibold group-hover:text-tipfinity-primary transition-colors">Biggest Fan</div>
                        </button>
                    </div>

                    {/* Modal */}
                    {isOpen && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.3 }}
                            className="fixed inset-0 bg-black/70 backdrop-blur-md z-[999] flex items-center justify-center p-4"
                            onClick={() => setIsOpen(false)}
                        >
                            <motion.div 
                                className="relative bg-neutral-900/95 backdrop-blur-xl w-full max-w-xl 
                                        flex flex-col items-center justify-start rounded-2xl p-6 text-center 
                                        overflow-y-auto max-h-[500px] z-[1000] shadow-2xl border border-tipfinity-primary/30"
                                initial={{ scale: 0.9, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                transition={{ duration: 0.3, ease: "easeOut" }}
                                onClick={(e) => e.stopPropagation()}
                            >
                                <button 
                                    onClick={() => setIsOpen(false)} 
                                    className="absolute top-4 right-4 text-white/70 hover:text-white bg-neutral-800 hover:bg-tipfinity-primary
                                            p-2 rounded-full w-9 h-9 transition duration-300 flex justify-center items-center"
                                >
                                    <XIcon className="h-5 w-5" />
                                </button>

                                <div className="text-xl font-bold text-white mb-6">
                                    {activeTab === "earnings" && "Total Earnings"}
                                    {activeTab === "received" && "Tips Received"}
                                    {activeTab === "sent" && "Tips Sent"}
                                    {activeTab === "superfan" && "Biggest Fan"}
                                </div>

                                <div className="text-white w-full">
                                    {activeTab === "earnings" && (
                                        <div className="flex flex-col items-center justify-center bg-neutral-800/50 rounded-xl p-6 border border-neutral-700">
                                            <div className="text-4xl font-bold text-tipfinity-primary flex items-center gap-2">
                                                <img src="/solana.svg" className="w-8 h-8" alt="SOL" />
                                                {totalEarnings.toFixed(2)} 
                                            </div>
                                            <div className="text-white/60 text-sm mt-2">SOL</div>
                                        </div>
                                    )}
                                    {activeTab === "received" && (
                                        <div className="space-y-2 max-h-[350px] overflow-y-auto">
                                            {receivedMessages.length > 0 ? receivedMessages.map((msg,idx) => (
                                                <div key={idx} className="p-3 bg-neutral-800/50 border border-neutral-700 rounded-lg hover:border-tipfinity-primary/50 transition-all text-white">
                                                    {msg.message}
                                                </div>
                                            )) : (
                                                <div className="text-white/60 py-8">No tips received yet</div>
                                            )}
                                        </div>
                                    )}
                                    {activeTab === "sent" && (
                                        <div className="space-y-2 max-h-[350px] overflow-y-auto">
                                            {sentMessages.length > 0 ? sentMessages.map((msg,idx) => (
                                                <div key={idx} className="p-3 bg-neutral-800/50 border border-neutral-700 rounded-lg text-white text-left">
                                                    {msg.message}
                                                </div>
                                            )) : (
                                                <div className="text-white/60 py-8">No tips sent yet</div>
                                            )}
                                        </div>
                                    )}
                                    {activeTab === "superfan" && (
                                        <div className="bg-neutral-800/50 rounded-xl p-6 border border-neutral-700">
                                            <p className="text-2xl font-bold text-tipfinity-primary">{biggestSuperFan || "No fan yet 😢"}</p>
                                        </div>
                                    )}
                                </div>
                            </motion.div>
                        </motion.div>
                    )}
                </div>
            ) : (
                <div className="flex items-center justify-center h-screen">
                    <div className="text-white text-xl">Connecting Wallet...</div>
                </div>
            )}
        </div>
    );
}
