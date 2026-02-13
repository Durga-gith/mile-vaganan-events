'use client';

import { motion } from 'framer-motion';

export default function CornerAnimations() {
  return (
    <div className="fixed inset-0 pointer-events-none z-[9999] overflow-hidden">
      {/* Top Left - Elephant Blessing */}
      <motion.div
        initial={{ opacity: 0, x: -100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1.5, delay: 0.5 }}
        className="absolute top-0 left-0 w-32 h-32 md:w-48 md:h-48"
      >
        <img 
          src="https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExM3Yyb2p6Ym16Ym16Ym16Ym16Ym16Ym16Ym16Ym16Ym16JmVwPXYxX2ludGVybmFsX2dpZl9ieV9pZCZjdD1z/3o7TKDkDbIDJ98YnBK/giphy.gif" 
          alt="Elephant Blessing Left" 
          className="w-full h-full object-contain filter drop-shadow-lg"
        />
      </motion.div>

      {/* Top Right - Elephant Blessing (Mirrored) */}
      <motion.div
        initial={{ opacity: 0, x: 100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1.5, delay: 0.5 }}
        className="absolute top-0 right-0 w-32 h-32 md:w-48 md:h-48 scale-x-[-1]"
      >
        <img 
          src="https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExM3Yyb2p6Ym16Ym16Ym16Ym16Ym16Ym16Ym16Ym16Ym16JmVwPXYxX2ludGVybmFsX2dpZl9ieV9pZCZjdD1z/3o7TKDkDbIDJ98YnBK/giphy.gif" 
          alt="Elephant Blessing Right" 
          className="w-full h-full object-contain filter drop-shadow-lg"
        />
      </motion.div>

      {/* Bottom Left - Flower Girl */}
      <motion.div
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.5, delay: 1 }}
        className="absolute bottom-0 left-0 w-32 h-32 md:w-48 md:h-48"
      >
        <img 
          src="https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExN3Yyb2p6Ym16Ym16Ym16Ym16Ym16Ym16Ym16Ym16Ym16JmVwPXYxX2ludGVybmFsX2dpZl9ieV9pZCZjdD1z/l41lMvTzS1VvW0W6k/giphy.gif" 
          alt="Flower Girl Left" 
          className="w-full h-full object-contain filter drop-shadow-lg"
        />
      </motion.div>

      {/* Bottom Right - Flower Girl (Mirrored) */}
      <motion.div
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.5, delay: 1 }}
        className="absolute bottom-0 right-0 w-32 h-32 md:w-48 md:h-48 scale-x-[-1]"
      >
        <img 
          src="https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExN3Yyb2p6Ym16Ym16Ym16Ym16Ym16Ym16Ym16Ym16Ym16JmVwPXYxX2ludGVybmFsX2dpZl9ieV9pZCZjdD1z/l41lMvTzS1VvW0W6k/giphy.gif" 
          alt="Flower Girl Right" 
          className="w-full h-full object-contain filter drop-shadow-lg"
        />
      </motion.div>
    </div>
  );
}
