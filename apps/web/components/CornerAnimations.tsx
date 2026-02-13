'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

const Flower = ({ side }: { side: 'left' | 'right' }) => {
  const [delay] = useState(Math.random() * 5);
  const [duration] = useState(3 + Math.random() * 4);
  const [left] = useState(Math.random() * 100);

  const flowers = ['🌸', '🌹', '🌺', '🌼', '🌻'];
  const flower = flowers[Math.floor(Math.random() * flowers.length)];

  return (
    <motion.div
      initial={{ 
        opacity: 0, 
        y: -20, 
        x: side === 'left' ? left : -left,
        rotate: 0 
      }}
      animate={{ 
        opacity: [0, 1, 1, 0],
        y: [0, 400, 800],
        x: side === 'left' ? [left, left + 50, left - 50] : [-left, -left - 50, -left + 50],
        rotate: 360
      }}
      transition={{ 
        duration, 
        repeat: Infinity, 
        delay,
        ease: "linear"
      }}
      className="absolute text-xl pointer-events-none select-none"
    >
      {flower}
    </motion.div>
  );
};

export default function CornerAnimations() {
  return (
    <div className="fixed inset-0 pointer-events-none z-[9999] overflow-hidden">
      {/* Flower Streams */}
      <div className="absolute top-0 left-0 w-64 h-full overflow-hidden opacity-40">
        {[...Array(15)].map((_, i) => <Flower key={`l-${i}`} side="left" />)}
      </div>
      <div className="absolute top-0 right-0 w-64 h-full overflow-hidden opacity-40">
        {[...Array(15)].map((_, i) => <Flower key={`r-${i}`} side="right" />)}
      </div>

      {/* Top Left - Elephant Blessing */}
      <motion.img
        initial={{ opacity: 0, scale: 0.8, rotate: -10 }}
        animate={{ 
          opacity: 1, 
          scale: 1, 
          rotate: [0, -2, 0],
          y: [0, -5, 0]
        }}
        transition={{ 
          opacity: { duration: 1.5, delay: 0.5 },
          scale: { duration: 1.5, delay: 0.5 },
          rotate: { duration: 4, repeat: Infinity, ease: "easeInOut" },
          y: { duration: 3, repeat: Infinity, ease: "easeInOut" }
        }}
        src="/images/animations/happy-elephant-left.gif"
        alt="Elephant Blessing"
        className="corner-gif top-left"
      />

      {/* Top Right - Lakshmi Blessing */}
      <motion.img
        initial={{ opacity: 0, scale: 0.8, rotate: 10 }}
        animate={{ 
          opacity: 1, 
          scale: 1, 
          rotate: [0, 2, 0],
          y: [0, -5, 0]
        }}
        transition={{ 
          opacity: { duration: 1.5, delay: 0.8 },
          scale: { duration: 1.5, delay: 0.8 },
          rotate: { duration: 4, repeat: Infinity, ease: "easeInOut" },
          y: { duration: 3, repeat: Infinity, ease: "easeInOut" }
        }}
        src="/images/animations/Lakshmi blessing from right side.png"
        alt="Lakshmi Putting Flowers"
        className="corner-gif top-right"
      />

      {/* Bottom Left - Lakshmi Blessing */}
      <motion.img
        initial={{ opacity: 0, scale: 0.8, y: 20 }}
        animate={{ 
          opacity: 1, 
          scale: 1, 
          y: [0, 5, 0],
          rotate: [0, -2, 0]
        }}
        transition={{ 
          opacity: { duration: 1.5, delay: 1.1 },
          scale: { duration: 1.5, delay: 1.1 },
          y: { duration: 3, repeat: Infinity, ease: "easeInOut" },
          rotate: { duration: 4, repeat: Infinity, ease: "easeInOut" }
        }}
        src="/images/animations/Lakhmi blessing from left side.png"
        alt="Lakshmi Putting Flowers"
        className="corner-gif bottom-left"
      />

      {/* Bottom Right - Elephant Blessing */}
      <motion.img
        initial={{ opacity: 0, scale: 0.8, y: 20 }}
        animate={{ 
          opacity: 1, 
          scale: 1, 
          y: [0, 5, 0],
          rotate: [0, 2, 0]
        }}
        transition={{ 
          opacity: { duration: 1.5, delay: 1.4 },
          scale: { duration: 1.5, delay: 1.4 },
          y: { duration: 3, repeat: Infinity, ease: "easeInOut" },
          rotate: { duration: 4, repeat: Infinity, ease: "easeInOut" }
        }}
        src="/images/animations/happy-elephant-right.gif"
        alt="Elephant Blessing"
        className="corner-gif bottom-right"
      />
    </div>
  );
}
