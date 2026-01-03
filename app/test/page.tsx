import { ProfileCard } from "@/components/ui/profilecard";

export default function Test() {
    return (
        <div className="flex flex-col items-center justify-center ">
           <div className="flex justify-center mb-5 ">
                <ProfileCard creator={"https://www.jammable.com/cdn-cgi/image/width=3840,quality=25,format=webp/https://imagecdn.voicify.ai/models/7b8e5953-3f47-40a3-9fa6-db2e39aa383c.png"}/>
           </div>
           <div className="font-semibold text-2xl mb-8 text-center">Alen Alex</div>
                <div className="text-white/70 text-sm sm:text-md md:text-xl font-medium mb-14 break-words max-w-sm sm:max-w-md md:max-w-lg  lg:max-w-3xl text-center">
                    Hiheresdscsdvealkrnvoiernwovjnerw;ojnvelowrnjlnrewljnvkrjtvrtwivrehbiuwerhiucgveirwuhvliewhrlivherverkjvnkjernvenw;ovnoelrnvre this is description
                </div>
           <div className="bg-neutral-800 p-6 sm:p-5 rounded-lg w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-3xl flex flex-col items-center">

                {/* Center-aligned Super DM */}
                <div className=" text-lg sm:text-xl font-semibold mb-5 text-center">
                        <span className="text-white/70 text-lg sm:text-xl font-semibold "> Super</span>
                        <span className=" text-lg sm:text-xl font-semibold text-[#FF4D4D]"> DM</span>
                </div>

                <div className="border border-neutral-600 bg-neutral-900 rounded-lg flex items-center px-5 py-2 w-full">
                    <textarea 
                        className="w-full bg-neutral-900 text-white/70 placeholder-neutral-500 outline-none text-base sm:text-md resize-none overflow-hidden break-words rounded-lg text-center py-3 px-4"
                        placeholder="Type your message..."
                        rows={3}
                    />
                    <button className="ml-2 px-4 py-2 bg-[#4f46e5] hover:bg-[#4f46e5]/70 text-white rounded-lg">Send</button>
                </div>
            </div>
        </div>
    )
}
