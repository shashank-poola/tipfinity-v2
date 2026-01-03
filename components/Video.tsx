'use client';
import { motion } from 'framer-motion';

export default function Video() {
  return (
    <motion.div
      className="w-full max-w-5xl mx-auto px-4 py-12"
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeInOut", delay: 0.8 }}
    >
      <div className="relative w-full aspect-video rounded-2xl overflow-hidden bg-gradient-to-br from-neutral-800 to-neutral-900 shadow-2xl border border-neutral-700">
        {/* Video placeholder - replace with actual video */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center">
              <svg
                className="w-10 h-10 text-white"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M8 5v14l11-7z" />
              </svg>
            </div>
            <p className="text-white/60 text-lg">Demo Video</p>
            <p className="text-white/40 text-sm mt-2">See how Tipfinity works</p>
          </div>
        </div>

        {/* Add your video here */}
        {/* <video 
          className="w-full h-full object-cover"
          autoPlay
          muted
          loop
          playsInline
        >
          <source src="/demo-video.mp4" type="video/mp4" />
        </video> */}
      </div>
    </motion.div>
  );
}

