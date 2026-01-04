import dynamic from 'next/dynamic';
import { useEffect } from "react";
import { useWallet } from "@solana/wallet-adapter-react";
import { useRouter } from "next/navigation";
import { motion } from 'framer-motion';
import { Instrument_Serif } from "next/font/google";
import Video from './Video';
import ClaimSection from './ClaimSection';
import HowItWorks from './HowItWorks';
import Footer from './Footer';

const instrumentSerif = Instrument_Serif({
  weight: ["400"],
  subsets: ["latin"],
});

export default function Landing() {
    const { connected } = useWallet();
    const router = useRouter();
  
    useEffect(() => {
      if (connected) {
        router.push('/explore');
      }
    }, [connected, router]);
  
    const WalletMultiButtonDynamic = dynamic(
      async () => (await import('@solana/wallet-adapter-react-ui')).WalletMultiButton,
      { ssr: false }
    );
  
    return (
        <div className="flex flex-col items-center justify-start w-full mx-auto overflow-y-auto">
          {/* Hero Section */}
          <div className="flex flex-col items-center w-full max-w-screen-lg px-4 py-16">
            <div className="h-8"></div>
            <motion.div 
            className="flex justify-center text-center"
            initial={{ y: 15, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 , ease: "easeInOut" }}
            >
              <img src="/logo/whitelogo.png" alt="Tipfinity" className="h-16 md:h-24 w-auto" />
            </motion.div>

            <motion.div 
            className="flex flex-col items-center justify-center mt-8 mb-6"
            initial={{ y: 15, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 , ease: "easeInOut", delay: 0.2 }}
            >
              <h1 className={`${instrumentSerif.className} text-4xl md:text-6xl lg:text-7xl xl:text-8xl font-normal text-white text-center leading-tight px-4`}>
                The fastest way to tip creators on Solana
              </h1>
            </motion.div>
      
            <motion.div 
            className="flex flex-col items-center justify-center mb-8"
            initial={{ y: 15, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 , ease: "easeInOut", delay: 0.4 }}
            >
              <p className="text-lg md:text-xl lg:text-2xl text-white/70 text-center">
                Secure, fast, and next-gen tips on Solana!
              </p>
              <p className="text-lg md:text-xl lg:text-2xl mt-1 text-white/70 text-center">
                Tip your favorite creators instantly
              </p>
            </motion.div>
      
            <motion.div
            initial={{ y: 15, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 , ease: "easeInOut", delay: 0.6 }}
            >
              <WalletMultiButtonDynamic />
            </motion.div>
          </div>

          <Video />

          <ClaimSection />

          <HowItWorks />
          
          <Footer />
        </div>
      );
      
  }
  