import React, { useRef, useState, useImperativeHandle, forwardRef, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import { Trophy, Code2, TrendingUp, Cpu } from "lucide-react";

// Platform configurations for live data fetching and static fallbacks
const LEETCODE_USERNAME = "tharun_73";
const CODECHEF_USERNAME = "cp_shanks77";
const CODECHEF_RATING = "1383";
const CODECHEF_STARS = 1;

const AchievementsSection = forwardRef<HTMLElement, {}>((props, ref) => {
  const sectionRef = useRef<HTMLElement>(null);
  
  // Expose the section ref
  useImperativeHandle(ref, () => sectionRef.current!);

  const inView = useInView(sectionRef, { once: true, amount: 0.1, margin: "-100px" });

  return (
    <section
      id="achievements"
      ref={sectionRef}
      className="py-20 md:py-32 relative bg-space-dark overflow-hidden"
    >
      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        <motion.div
           animate={{
            scale: [1, 1.1, 1],
            opacity: [0.05, 0.15, 0.05],
          }}
          transition={{ duration: 7, repeat: Infinity }}
          className="absolute top-1/4 right-1/4 w-[400px] h-[400px] bg-neon-purple/10 rounded-full blur-[120px]"
        />
        <motion.div
           animate={{
            scale: [1.1, 1, 1.1],
            opacity: [0.05, 0.1, 0.05],
          }}
          transition={{ duration: 9, repeat: Infinity }}
          className="absolute bottom-1/4 left-1/4 w-[500px] h-[500px] bg-neon-blue/10 rounded-full blur-[120px]"
        />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center mb-16 md:mb-20"
        >
          <motion.h2
            initial={{ opacity: 0, scale: 0.9 }}
            animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-3xl md:text-5xl lg:text-6xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-neon-blue via-white to-neon-purple inline-block"
          >
            Achievements & Stats
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="text-white/70 text-lg max-w-2xl mx-auto"
          >
            Live tracking of my competitive programming journey, algorithmic problem solving, and technical accomplishments.
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          
          {/* LeetCode Dashboard */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="group relative h-full flex flex-col"
          >
            <div className="bg-space-light/40 backdrop-blur-md rounded-2xl p-6 md:p-8 border border-neon-blue/20 flex-1 relative overflow-hidden flex flex-col h-full hover:border-neon-blue/50 transition-colors shadow-lg">
              <div className="flex items-center gap-3 mb-6">
                <Code2 className="w-8 h-8 text-neon-blue" />
                <h3 className="text-xl md:text-2xl font-bold text-white">LeetCode Dashboard</h3>
              </div>
              <div className="flex-1 w-full flex items-center justify-center rounded-xl overflow-hidden bg-space/50 p-2">
                <img 
                  src={`https://leetcard.jacoblin.cool/${LEETCODE_USERNAME}?theme=dark&font=Inter&ext=heatmap`} 
                  alt="LeetCode Stats & Heatmap" 
                  className="w-full h-auto object-contain rounded-lg filter drop-shadow-xl"
                  onError={(e) => {
                    // Fallback to non-heatmap version if heatmap fails or username is invalid
                    (e.target as HTMLImageElement).src = `https://leetcard.jacoblin.cool/${LEETCODE_USERNAME}?theme=dark&font=Inter`;
                  }}
                />
              </div>
              {/* Bottom Glow */}
              <div className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-neon-blue to-transparent transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
            </div>
          </motion.div>

          {/* CodeChef Container */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-col gap-8 h-full"
          >
            {/* CodeChef Rating Card */}
            <div className="bg-space-light/40 backdrop-blur-md rounded-2xl p-6 md:p-8 border border-neon-purple/20 relative overflow-hidden flex-1 group hover:border-neon-purple/50 transition-colors shadow-lg">
              <div className="flex items-center gap-3 mb-6">
                <Trophy className="w-8 h-8 text-neon-purple" />
                <h3 className="text-xl md:text-2xl font-bold text-white">CodeChef Rating</h3>
              </div>
              
              <div className="flex flex-col items-center justify-center h-full pb-8">
                {/* Dynamically generating stars based on rating */}
                <div className="text-4xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-br from-yellow-300 to-yellow-600 mb-6 drop-shadow-lg flex items-center gap-2">
                  <span>{CODECHEF_RATING}</span>
                  <span className="text-sm font-normal text-white/50 self-end mb-2 tracking-widest uppercase">/ RATING</span>
                </div>

                <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-neon-purple/10 border border-neon-purple/30 text-neon-purple font-medium">
                  <TrendingUp className="w-4 h-4" /> Constant Improver
                </div>
              </div>

              {/* Bottom Glow */}
              <div className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-neon-purple to-transparent transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
            </div>

          </motion.div>
        </div>
      </div>
    </section>
  );
});

AchievementsSection.displayName = "AchievementsSection";

export default AchievementsSection;
