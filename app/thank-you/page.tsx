"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import Image from "next/image";

export default function ThankYouPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-green-700 via-green-800 to-gray-900 flex flex-col items-center justify-center text-center text-white px-6">
      {/* Animated Football Image */}
      <motion.div
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="relative w-32 h-32 mb-6"
      >
        <Image
          src="/assets/img/football.png"
          alt="Football"
          fill
          className="object-contain drop-shadow-lg"
        />
      </motion.div>

      {/* Heading */}
      <motion.h1
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="text-4xl sm:text-5xl font-bold tracking-wide mb-4"
      >
        Thank You for Your Booking!
      </motion.h1>

      {/* Subtext */}
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="text-lg sm:text-xl text-gray-200 max-w-2xl mb-8"
      >
        Your slot has been successfully booked at our premium football turf.  
        Get ready to kick, score, and enjoy the game under the lights!
      </motion.p>

      {/* Button Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="flex flex-col sm:flex-row gap-4"
      >
        <Link
          href="/"
          className="bg-white text-green-800 px-8 py-3 rounded-full font-semibold hover:bg-green-100 transition-all"
        >
          Back to Home
        </Link>
        <Link
          href="/booking"
          className="border-2 border-white px-8 py-3 rounded-full font-semibold hover:bg-white hover:text-green-800 transition-all"
        >
          Book Another Slot
        </Link>
      </motion.div>

      {/* Decorative Turf Field Pattern */}
      

      {/* Footer */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="absolute bottom-4 text-sm text-gray-400"
      >
        ⚽ Play Hard • Stay Fair • Enjoy the Game
      </motion.p>
    </div>
  );
}
