'use client';
import { motion } from 'framer-motion';
import { Instrument_Serif } from "next/font/google";
import { ArrowRight } from 'lucide-react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

const instrumentSerif = Instrument_Serif({
  weight: ["400"],
  subsets: ["latin"],
});

export default function ClaimSection() {
  const [username, setUsername] = useState('');
  const router = useRouter();

  const handleClaim = () => {
    if (username.trim()) {
      router.push(`/creatorprofile/${username}`);
    }
  };

  return (
    <motion.div
      className="w-full max-w-4xl mx-auto px-4 py-24 text-center min-h-[500px] flex flex-col justify-center"
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeInOut", delay: 1 }}
    >
      {/* Heading */}
      <h2 className={`${instrumentSerif.className} text-2xl md:text-4xl lg:text-5xl font-normal text-white leading-tight mb-8 max-w-3xl mx-auto`}>
        Start earning tips from<br />your fans today!
      </h2>

      {/* Username Input Box */}
      <div className="relative max-w-2xl mx-auto mb-6">
        <div className="flex items-center bg-white rounded-full shadow-lg overflow-hidden border-2 border-gray-200">
          <div className="flex items-center pl-6 pr-4 py-4">
            <img 
              src="/header.png" 
              alt="Tipfinity" 
              className="w-8 h-8 mr-3 object-contain"
            />
            <span className="text-gray-900 font-medium text-lg">
              tipfinity.xyz/
            </span>
            <input
              type="text"
              placeholder="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleClaim()}
              className="bg-transparent text-gray-900 text-lg outline-none border-none placeholder-gray-400"
              style={{ width: '200px' }}
            />
          </div>
          <button 
            onClick={handleClaim}
            disabled={!username.trim()}
            className="ml-auto mr-2 bg-tipfinity-primary hover:bg-tipfinity-primary/90 text-white rounded-full p-4 transition-colors disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-tipfinity-primary"
          >
            <ArrowRight className="w-6 h-6" />
          </button>
        </div>
      </div>

      {/* Subtitle */}
      <p className="text-white/50 text-base">
        Claim your username before it&apos;s too late!
      </p>
    </motion.div>
  );
}

