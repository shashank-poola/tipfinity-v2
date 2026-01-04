'use client';
import { motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';

export default function Video() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [hasPlayed, setHasPlayed] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasPlayed) {
            // Start playing when video comes into view
            video.play().catch((error) => {
              console.log('Autoplay prevented:', error);
            });
            setHasPlayed(true);
          }
        });
      },
      {
        threshold: 0.5, // Play when 50% of video is visible
      }
    );

    observer.observe(video);

    return () => {
      observer.disconnect();
    };
  }, [hasPlayed]);

  return (
    <motion.div
      className="w-full max-w-5xl mx-auto px-4 py-12"
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeInOut", delay: 0.8 }}
    >
      <div className="relative w-full aspect-video rounded-2xl overflow-hidden shadow-2xl border border-neutral-700">
        {/* Tipfinity Demo Video */}
        <video 
          ref={videoRef}
          className="w-full h-full object-cover"
          muted
          playsInline
          preload="auto"
          loop
        >
          <source src="/tipfinitydemo.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>

      {/* Video Caption */}
      <div className="text-center mt-4">
        <p className="text-white/70 text-sm">Watch how Tipfinity works</p>
      </div>
    </motion.div>
  );
}

