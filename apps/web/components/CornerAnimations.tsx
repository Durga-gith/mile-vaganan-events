'use client';

import { motion } from 'framer-motion';

export default function CornerAnimations() {
  return (
    <div className="fixed inset-0 pointer-events-none z-[9999] overflow-hidden">
      {/* Top Left - Elephant Blessing */}
      <motion.img
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.5, delay: 0.5 }}
        src="/images/animations/elephant.gif"
        alt="Elephant Blessing"
        className="corner-gif top-left"
      />

      {/* Top Right - Elephant Blessing (Mirrored via CSS) */}
      <motion.img
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.5, delay: 0.5 }}
        src="/images/animations/elephant.gif"
        alt="Elephant Blessing"
        className="corner-gif top-right"
      />

      {/* Bottom Left - Flower Girl */}
      <motion.img
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.5, delay: 1 }}
        src="/images/animations/girl.gif"
        alt="Flower Girl"
        className="corner-gif bottom-left"
      />

      {/* Bottom Right - Flower Girl (Mirrored via CSS) */}
      <motion.img
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.5, delay: 1 }}
        src="/images/animations/girl.gif"
        alt="Flower Girl"
        className="corner-gif bottom-right"
      />
    </div>
  );
}
