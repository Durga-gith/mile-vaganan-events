'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';

const FallingElement = () => {
  const [delay] = useState(Math.random() * 10);
  const [duration] = useState(6 + Math.random() * 8);
  const [left] = useState(Math.random() * 100);
  const [size] = useState(10 + Math.random() * 15);
  const [rotation] = useState(Math.random() * 360);
  
  // Luxury palette: Gold, Champagne, soft Rose, White
  const colors = ['#D4AF37', '#F9E4B7', '#FFB7C5', '#FFFFFF'];
  const color = colors[Math.floor(Math.random() * colors.length)];
  const isHeart = Math.random() > 0.5;

  return (
    <motion.div
      initial={{ 
        opacity: 0, 
        y: -100, 
        x: `${left}vw`,
        rotate: rotation,
        scale: 0.5
      }}
      animate={{ 
        opacity: [0, 0.6, 0.6, 0],
        y: ['0vh', '100vh'],
        x: [`${left}vw`, `${left + (Math.random() * 10 - 5)}vw`],
        rotate: [rotation, rotation + 360],
        scale: [0.5, 1, 0.7]
      }}
      transition={{ 
        duration, 
        repeat: Infinity, 
        delay,
        ease: "linear"
      }}
      className="absolute pointer-events-none select-none"
    >
      {isHeart ? (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path 
            d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" 
            fill={color} 
            fillOpacity="0.4"
          />
        </svg>
      ) : (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path 
            d="M12 2C12 2 15 8 18 11C21 14 20 18 16 20C12 22 8 22 4 20C0 18 -1 14 2 11C5 8 12 2 12 2Z" 
            fill={color} 
            fillOpacity="0.3"
          />
        </svg>
      )}
    </motion.div>
  );
};

export default function CornerAnimations() {
  return (
    <div className="fixed inset-0 pointer-events-none z-[9999] overflow-hidden">
      {/* Luxury Falling Stream across whole page */}
      <div className="absolute inset-0 w-full h-full overflow-hidden">
        {[...Array(40)].map((_, i) => <FallingElement key={i} />)}
      </div>
    </div>
  );
}
