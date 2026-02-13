'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

const Flower = ({ side }: { side: 'left' | 'right' }) => {
  const [delay] = useState(Math.random() * 5);
  const [duration] = useState(3 + Math.random() * 4);
  const [left] = useState(Math.random() * 100);

  const colors = ['#ffb7c5', '#ff99aa', '#ffd1dc', '#f4cf57'];
  const color = colors[Math.floor(Math.random() * colors.length)];

  return (
    <motion.div
      initial={{ 
        opacity: 0, 
        y: -20, 
        x: side === 'left' ? left : -left,
        rotate: 0,
        scale: 0.5
      }}
      animate={{ 
        opacity: [0, 1, 1, 0],
        y: [0, 400, 800],
        x: side === 'left' ? [left, left + 100, left - 50] : [-left, -left - 100, -left + 50],
        rotate: [0, 180, 360],
        scale: [0.5, 1, 0.8]
      }}
      transition={{ 
        duration, 
        repeat: Infinity, 
        delay,
        ease: "easeInOut"
      }}
      className="absolute pointer-events-none select-none"
    >
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path 
          d="M12 2C12 2 15 8 18 11C21 14 20 18 16 20C12 22 8 22 4 20C0 18 -1 14 2 11C5 8 12 2 12 2Z" 
          fill={color} 
          fillOpacity="0.6"
        />
      </svg>
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

      {/* Top Left - Lakshmi Blessing */}
      <motion.div 
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 0.9, x: 0 }}
        transition={{ duration: 1.5, delay: 0.5 }}
        className="corner-gif top-left"
      >
        <img src="/left.jpg" alt="Lakshmi Blessing" className="w-full h-auto" />
      </motion.div>

      {/* Top Right - Lakshmi Blessing */}
      <motion.div 
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 0.9, x: 0 }}
        transition={{ duration: 1.5, delay: 0.8 }}
        className="corner-gif top-right"
      >
        <img src="/right.jpg" alt="Lakshmi Blessing" className="w-full h-auto" />
      </motion.div>

      {/* Bottom Left - Lakshmi Blessing (Optional additional) */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 0.8, scale: 1 }}
        transition={{ duration: 2, delay: 1.2 }}
        className="corner-gif bottom-left"
      >
        <img src="/left.jpg" alt="Lakshmi Blessing" className="w-full h-auto" />
      </motion.div>

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
