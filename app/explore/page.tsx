'use client';
/*eslint-disable*/
import { useEffect, useState } from "react";
import { useWallet } from "@solana/wallet-adapter-react";
import { redirect } from "next/navigation";
import { CreatorCard } from "@/components/CreatorCard";
import axios from "axios";
import { SearchIcon } from "lucide-react";

export default function Explore (){

    interface Creator {
    name: string;
    publicKey: string;
    profileImage: string;
    email: string;
    bio: string;
    id: string;
    userId: string;
  }
  const[Creators, setCreators] = useState<Creator[]>([]);
  const { wallet, connected} = useWallet();
  const [user, setUser] = useState<{ id: string; PublicKey: string } | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

      useEffect(() => {
          if(!connected){
              redirect('/');
          }
          getuserFromDb();
          getCreatorsFromDb();
      },[connected])

      async function getuserFromDb() {
        try {
          const res = await axios.post("/api/user", {
            publicKey: wallet?.adapter.publicKey?.toString(),
          });
          const user = res.data
          setUser(user);
        } catch (error) {
          console.error("Error fetching user:", error);
        }
      }

      async function getCreatorsFromDb() {
        const res = await axios.get(`/api/allcreators`);
        setCreators(res.data);
        console.log(res.data);
      }

      const filteredcreators = Creators.filter((creator) => creator.name.toLowerCase().includes(searchTerm.toLowerCase()));

    return (
        <div className="flex flex-col justify-start items-center gap-2">
           <div className="flex justify-start items-center bg-neutral-700 rounded-full w-full max-w-2xl px-5  mb-6">
              <SearchIcon className="text-white/70"/>
              <textarea
              placeholder="Search Creators"
              className="bg-neutral-700 text-white/70 placeholder-white/70 outline-none text-base sm:textmd resize-none overflow-auto break-words rounded-full px-3 w-full max-w-xl size-9 mt-3 "
              onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <div className="items-start text-white/70 text-lg font-bold m-3">
              Creators For you 
            </div>
         
          <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 ">
            {filteredcreators.map((creator, index) => (
              <CreatorCard key={index} creator={creator} />
            ))}
          </div>
        </div> 
      );
      
}