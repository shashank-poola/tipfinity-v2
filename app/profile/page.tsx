"use client";
import { ProfileCard } from "@/components/ui/profilecard";
import { useWallet } from "@solana/wallet-adapter-react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeftIcon, XIcon } from "lucide-react";

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
    const router = useRouter();

    useEffect(() => {
        if (!connected) {
            router.push("/");
        } else {
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
        <div className="h-screen flex justify-center">
            <div className="top-5 left-5 relative  h-8 w-8 rounded-lg hover:bg-neutral-800 flex items-center justify-center" onClick={() => router.back()}>
                <ArrowLeftIcon className="text-white/70 h-5 w-5" />
            </div>
            {wallet ? (
                <div className="flex flex-col items-center w-full max-w-3xl">
                    <div className="flex justify-center mb-5">
                        <ProfileCard creator={creatorProfile?.profileImage || "https://www.jammable.com/cdn-cgi/image/width=3840,quality=25,format=webp/https://imagecdn.voicify.ai/models/7b8e5953-3f47-40a3-9fa6-db2e39aa383c.png"} />
                    </div>

                    <h1 className="text-2xl font-bold">{creatorProfile?.name || "Anonymous"}</h1>

                    {creatorProfile?.bio ? <div className="mt-5">{creatorProfile?.bio}</div> : (
                        <div className="border border-neutral-800 rounded-xl cursor-pointer p-3 hover:bg-white/10 mt-5" onClick={() => { router.push("/creator") }}>
                            Become a creator
                        </div>
                    )}

                    {/* Buttons for opening modal */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-xl mt-10">
                        <button
                            className="bg-tipfinity-dark text-white py-4 px-4 rounded-lg hover:bg-tipfinity-primary transition"
                            onClick={() => { setActiveTab("earnings"); setIsOpen(true); }}
                        >
                            Total Earnings
                        </button>
                        <button
                            className="bg-tipfinity-dark text-white py-4 px-4 rounded-lg hover:bg-tipfinity-primary transition"
                            onClick={() => { setActiveTab("received"); setIsOpen(true); }}
                        >
                           Tips Received 
                        </button>
                        <button
                            className="bg-tipfinity-dark text-white py-4 px-4 rounded-lg hover:bg-tipfinity-primary transition"
                            onClick={() => { setActiveTab("sent"); setIsOpen(true); }}
                        >
                           Tips Sent
                        </button>
                        <button
                            className="bg-tipfinity-dark text-white py-4 px-4 rounded-lg hover:bg-tipfinity-primary transition"
                            onClick={() => { setActiveTab("superfan"); setIsOpen(true); }}
                        >
                            Biggest Fan
                        </button>
                    </div>

                    {/* Modal */}
                    {isOpen && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.5 }}
                            className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm z-[999] flex items-center justify-center"
                        >
                            <motion.div className="relative bg-black bg-opacity-90 w-full max-w-xl 
                                        flex flex-col items-center justify-start rounded-lg p-4 text-center 
                                        overflow-y-auto max-h-[500px] z-[1000] shadow-xl border border-[#FF4D4D] border-opacity-30"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ duration: 0.5, ease: "easeInOut" }}
                            >
                                <button 
                                    onClick={() => setIsOpen(false)} 
                                    className="absolute top-4 right-4 text-white/70 hover:text-white bg-neutral-800 hover:bg-[#FF4D4D]
                                            p-2 rounded-full w-8 h-8 transition duration-300 flex justify-center items-center"
                                >
                                    <XIcon />
                                </button>

                                
                                <div className="text-lg font-semibold text-white/70 mb-4">
                                    {activeTab === "earnings" && "Total Earnings"}
                                    {activeTab === "received" && "Received Messages"}
                                    {activeTab === "sent" && "Sent Messages"}
                                    {activeTab === "superfan" && "Biggest Fan"}
                                </div>

                                <div className="text-white w-full p-4">
                                    {activeTab === "earnings" && (
                                        <div className="text-2xl font-bold flex justify-center items-center">
                                            <div className="w-6 h-6 m-3">
                                                <img src="/solana.svg" className="w-6  h-6" />
                                            </div>
                                            <div className="text-white/70">
                                            {totalEarnings.toFixed(2)} Sol
                                            </div>
                                        </div>
                                    )}
                                    {activeTab === "received" && (
                                        <div className="text-center">
                                            {receivedMessages.map((msg,idx) => (
                                                <div key={idx} className="p-2 border border-tipfinity-dark rounded-lg mb-2 hover:bg-tipfinity-dark/50 text-white/70">{msg.message}</div>
                                            ))}
                                        </div>
                                    )}
                                    {activeTab === "sent" && (
                                        <div className="text-left">
                                            {sentMessages.map((msg,idx) => (
                                                <div key={idx} className="p-2 border-b border-tipfinity-dark/30">{msg.message}</div>
                                            ))}
                                        </div>
                                    )}
                                    {activeTab === "superfan" && (
                                        <p className="text-2xl font-bold">{biggestSuperFan || "No fan yet 😢"}</p>
                                    )}
                                </div>
                            </motion.div>
                        </motion.div>
                    )}
                </div>
            ) : (
                <div className="flex items-center justify-center h-screen text-white">Connecting Wallet...</div>
            )}
        </div>
    );
}
