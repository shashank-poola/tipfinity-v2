
import { motion } from 'framer-motion';
import React from 'react';
const GradientCard = ({ title1, title2, className, onClick }: { title1: string; title2?: number; className?: string; onClick?: () => void; }) => {
  return (
    <motion.div
      className={`relative overflow-hidden rounded-xl w-full dark cursor-pointer ${className}`}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      initial={{ y: 15, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8 }}
      onClick={onClick}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-neutral-900 via-black to-neutral-700 z-0" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-neutral-700 via-black to-transparent z-0" />
      
      <motion.div 
        className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-neutral-900 via-black to-neutral-300 max-w-sm"
        initial={{ scaleX: 0, originX: 0 }}
        whileHover={{ scaleX: 1 }}
        transition={{ duration: 0.4 }}
      />

      <div className="relative z-10 p-6">
        <div className="flex flex-col items-center justify-between">
          <motion.h3 
            className="text-xl font-semibold bg-gradient-to-r from-neutral-500 via-slate-400 to-neutral-300 bg-clip-text text-transparent"
            initial={{ y: 5, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.3, delay: 0.1 }}
          >
            {title1}
          </motion.h3>
          {title2 !== undefined && !isNaN(title2) && (
            <motion.h3 
              className="text-xl font-semibold bg-gradient-to-r from-[#FF4D4D] to-[#FF4D4D] bg-clip-text text-transparent"
              initial={{ y: 5, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.3, delay: 0.2 }}
            >
              {title2.toString()}
            </motion.h3>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default GradientCard;
