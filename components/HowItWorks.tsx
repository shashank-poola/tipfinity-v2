'use client';

import { motion } from 'framer-motion';
import { Instrument_Serif } from "next/font/google";
import { Wallet, Send, TrendingUp } from 'lucide-react';

const instrumentSerif = Instrument_Serif({
  weight: ["400"],
  subsets: ["latin"],
});

export default function HowItWorks() {
  const steps = [
    {
      number: "1",
      title: "Connect Your Wallet",
      description: "Connect your Solana wallet to get started. Create your creator profile and set your tip amount.",
      icon: <Wallet className="w-12 h-12 text-tipfinity-primary" />
    },
    {
      number: "2",
      title: "Share Your Link",
      description: "Share your unique tipfinity.xyz link with your fans on social media, streams, or content platforms.",
      icon: <Send className="w-12 h-12 text-tipfinity-primary" />
    },
    {
      number: "3",
      title: "Receive Tips Instantly",
      description: "Get instant notifications when fans send you tips. Withdraw your earnings anytime directly to your wallet.",
      icon: <TrendingUp className="w-12 h-12 text-tipfinity-primary" />
    }
  ];

  return (
    <div className="w-full bg-black py-24 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className={`${instrumentSerif.className} text-4xl md:text-5xl lg:text-6xl font-normal text-white mb-4`}>
            How It Works
          </h2>
          <p className="text-white/60 text-lg md:text-xl max-w-3xl mx-auto">
            Start receiving tips from your fans in three simple steps
          </p>
        </motion.div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              className="relative bg-neutral-900 rounded-2xl p-8 border border-neutral-800 hover:border-neutral-700 transition-colors"
              initial={{ y: 30, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
            >
              {/* Step Number */}
              <div className="absolute -top-4 -left-4 w-12 h-12 bg-tipfinity-primary rounded-full flex items-center justify-center text-white font-bold text-xl">
                {step.number}
              </div>

              {/* Icon */}
              <div className="mb-6 mt-4">
                {step.icon}
              </div>

              {/* Title */}
              <h3 className="text-white text-2xl font-semibold mb-4">
                {step.title}
              </h3>

              {/* Description */}
              <p className="text-white/60 text-base leading-relaxed">
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

