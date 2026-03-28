import React, { useRef, useState, useEffect, forwardRef, useImperativeHandle } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useMotionTemplate,
  useMotionValue,
  useInView, // NEW: Import useInView
} from "framer-motion";
import ThreeScene from "../ThreeScene";

const TypewriterText = ({ text, delay = 0 }: { text: string; delay?: number }) => {
  const [displayedText, setDisplayedText] = useState("");

  useEffect(() => {
    const timeout = setTimeout(() => {
      let currentIndex = 0;
      const interval = setInterval(() => {
        if (currentIndex <= text.length) {
          setDisplayedText(text.slice(0, currentIndex));
          currentIndex++;
        } else {
          clearInterval(interval);
        }
      }, 50); // Typing speed

      return () => clearInterval(interval);
    }, delay * 1000);

    return () => clearTimeout(timeout);
  }, [text, delay]);

  return <span>{displayedText}</span>;
};

interface MagneticButtonProps {
  children: React.ReactNode;
  onClick: () => void;
  className?: string;
}

const MagneticButton = ({ children, onClick, className }: MagneticButtonProps) => {
  const ref = useRef<HTMLButtonElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const handleMouseMove = (e: React.MouseEvent) => {
    const { clientX, clientY } = e;
    const { left, top, width, height } = ref.current!.getBoundingClientRect();
    const centerX = left + width / 2;
    const centerY = top + height / 2;
    x.set((clientX - centerX) * 0.3);
    y.set((clientY - centerY) * 0.3);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.button
      ref={ref}
      onClick={onClick}
      className={className}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ x, y }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      transition={{ type: "spring", stiffness: 150, damping: 15 }}
    >
      {children}
    </motion.button>
  );
};

const HeroSection = forwardRef<HTMLElement, {}>((props, ref) => {
  const sectionRef = useRef<HTMLElement>(null);
  
  useImperativeHandle(ref, () => sectionRef.current!);

  // NEW: Track if section is in viewport
  const isInView = useInView(sectionRef, { 
    once: false, 
    amount: 0.1, // Trigger when 10% visible
    margin: "100px" // Start loading slightly before entering viewport
  });
  
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const yTitle = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const ySubtitle = useTransform(scrollYProgress, [0, 1], [0, 100]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <section
      id="hero"
      ref={sectionRef}
      className="h-[calc(100vh-134px)] md:h-screen w-full relative overflow-hidden"
    >
      <div className="absolute inset-0 z-0">
        <ThreeScene sceneType="hero" isVisible={isInView} />
      </div>

      <div className="absolute inset-0 bg-gradient-to-t from-space-dark to-transparent z-10" />

      <div className="container relative z-20 mx-auto px-4 h-full flex flex-col md:flex-row items-center justify-between gap-12">
        <div className="flex-1 flex flex-col justify-center">
          <motion.h1
            style={{ y: yTitle, opacity }}
            className="text-4xl md:text-7xl font-bold mb-6"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            AI & <span className="text-gradient">Machine Learning</span> <br />
            Engineer | <span className="text-neon-purple">Software Developer</span>
          </motion.h1>

          <motion.p
            style={{ y: ySubtitle, opacity }}
            className="text-xl md:text-2xl mb-8 max-w-lg text-white/80 min-h-[100px] md:min-h-0 md:h-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            <TypewriterText
              text="I build intelligent systems and scalable software solutions, combining machine learning with modern development to solve real-world problems."
              delay={0.8}
            />
          </motion.p>

          <motion.div
            style={{ y: ySubtitle, opacity }}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1.5, duration: 0.5 }}
            className="flex flex-wrap gap-4 justify-center md:justify-start mt-8"
          >
            <MagneticButton
              onClick={() =>
                document
                  .getElementById("about")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
              className="group flex self-center md:self-start items-center gap-2 bg-neon-blue/10 hover:bg-neon-blue/20 border border-neon-blue text-neon-blue py-3 px-6 rounded-full transition-colors duration-300 w-fit"
            >
              About Me
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 transform group-hover:translate-x-1 transition-transform"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M14 5l7 7m0 0l-7 7m7-7H3"
                />
              </svg>
            </MagneticButton>

            <motion.a
              href="/Tharun_CV.pdf"
              download
              className="group flex items-center gap-2 bg-neon-purple/10 hover:bg-neon-purple/20 border border-neon-purple text-neon-purple py-3 px-6 rounded-full transition-colors duration-300 w-fit"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Download Resume
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 transform group-hover:translate-y-1 transition-transform"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                />
              </svg>
            </motion.a>
          </motion.div>

        </div>

        {/* New Hero Profile Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, x: 20 }}
          animate={{ opacity: 1, scale: 1, x: 0 }}
          transition={{ duration: 1, delay: 1, ease: "easeOut" }}
          className="hidden md:block relative z-30"
        >
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-neon-blue to-neon-purple rounded-2xl blur opacity-25 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
            <div className="relative p-2 rounded-2xl bg-white/5 backdrop-blur-md border border-white/20 shadow-2xl overflow-hidden aspect-[4/5] w-[300px]">
              <img 
                src="/assets/myPic.jpeg" 
                alt="Tharun Teja" 
                className="w-full h-full object-cover object-top filter grayscale-[10%] group-hover:grayscale-0 transition-all duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-space-dark/60 to-transparent" />
              <div className="absolute bottom-4 left-4">
                <p className="text-white font-bold text-lg">Tharun Teja</p>
                <p className="text-neon-blue text-sm">AI/ML Engineer</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>


      <div className="absolute bottom-8 md:bottom-10 left-1/2 -translate-x-1/2 z-20">
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <div className="flex flex-col items-center ">
            <p className="text-sm mb-2 text-white/70">Scroll Down</p>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-neon-blue"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 14l-7 7m0 0l-7-7m7 7V3"
              />
            </svg>
          </div>
        </motion.div>
      </div>
    </section>
  );
});

HeroSection.displayName = "HeroSection";

export default HeroSection;
