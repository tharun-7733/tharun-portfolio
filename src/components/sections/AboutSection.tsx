import React, { useRef, useState, useEffect, forwardRef, useImperativeHandle } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import ThreeScene from "../ThreeScene";
import VideoSkeleton from "../VideoSkeleton";
import VideoFallback from "../VideoFallback";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { useMobileVideo } from "@/hooks/use-mobile-video";

const AboutSection = forwardRef<HTMLElement, {}>((props, ref) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  
  useImperativeHandle(ref, () => sectionRef.current!);

  const isInView = useInView(sectionRef, { once: false, amount: 0.3 });
  
  // NEW: Track if 3D scene should be visible (more aggressive threshold)
  const sceneInView = useInView(sectionRef, { 
    once: false, 
    amount: 0.1,
    margin: "100px"
  });
  
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [videoCanPlay, setVideoCanPlay] = useState(false);
  const [videoError, setVideoError] = useState(false);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const yImage = useTransform(scrollYProgress, [0, 1], [100, -100]);

  // Use mobile video hook for better mobile support
  const {
    isMobileDevice,
    getVideoAttributes,
    getVideoStyles,
    playVideo,
  } = useMobileVideo();


  // Handle video loading events
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleLoadedData = () => {
      console.log("Video loaded data");
      setVideoLoaded(true);
    };

    const handleCanPlay = () => {
      console.log("Video can play");
      setVideoCanPlay(true);
    };

    const handleLoadStart = () => {
      console.log("Video load started");
      setVideoLoaded(false);
      setVideoCanPlay(false);
    };

    const handleError = (e: Event) => {
      console.error("Video error:", e);
      setVideoLoaded(false);
      setVideoCanPlay(false);
      setVideoError(true);
    };

    const handleLoadedMetadata = () => {
      console.log("Video metadata loaded");
      // Force display of first frame on iOS Safari
      if (video.currentTime === 0) {
        video.currentTime = 0.001;
      }
    };

    video.addEventListener("loadeddata", handleLoadedData);
    video.addEventListener("canplay", handleCanPlay);
    video.addEventListener("loadstart", handleLoadStart);
    video.addEventListener("error", handleError);
    video.addEventListener("loadedmetadata", handleLoadedMetadata);

    return () => {
      video.removeEventListener("loadeddata", handleLoadedData);
      video.removeEventListener("canplay", handleCanPlay);
      video.removeEventListener("loadstart", handleLoadStart);
      video.removeEventListener("error", handleError);
      video.removeEventListener("loadedmetadata", handleLoadedMetadata);
    };
  }, []);

  // Reset video when section becomes visible with better mobile handling
  useEffect(() => {
    if (isInView && videoRef.current && videoCanPlay) {
      playVideo(videoRef.current);
    }
  }, [isInView, videoCanPlay, playVideo]);

  // Function to retry video loading
  const retryVideo = () => {
    setVideoError(false);
    setVideoLoaded(false);
    setVideoCanPlay(false);

    if (videoRef.current) {
      videoRef.current.load();
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  return (
    <section
      id="about"
      ref={sectionRef}
      className="min-h-screen py-20 relative bg-space"
    >
      <div className="absolute top-0 left-0 w-full h-40 bg-gradient-to-b from-space-dark to-transparent z-10" />

      <div className="container mx-auto px-4 relative z-20" ref={containerRef}>
        <motion.h2 
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-3xl md:text-5xl font-bold mb-16 text-transparent bg-clip-text bg-gradient-to-r from-neon-blue via-white to-neon-purple inline-block text-center"
        >
          About Me
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="md:order-2 relative h-[500px] w-full">
            <div className="absolute inset-0">
              <ThreeScene sceneType="about" isVisible={sceneInView} />
            </div>

            <motion.div
              style={{ y: yImage }}
              className="absolute inset-0 flex items-center justify-center pointer-events-none"
            />
          </div>

          <motion.div 
            className="md:order-1 space-y-6"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            {[
              "I’m an AI/ML developer and software engineer with a strong foundation in building intelligent, data-driven systems. I focus on applying machine learning and software development to solve real-world challenges.",
              "My expertise lies in Python, machine learning, and natural language processing, along with frameworks such as Scikit-learn, Flask, and Streamlit. I am also proficient in data handling and analysis using tools like Pandas and NumPy.",
              "I have a strong problem-solving mindset, having solved 500+ Data Structures and Algorithms problems across platforms like LeetCode, CodeChef, GeeksforGeeks, and Codeforces, along with maintaining a solid competitive programming profile.",
              "I am passionate about building scalable AI-powered solutions and continuously improving my skills in machine learning, software engineering, and system design.",
            ].map((text, index) => (
              <motion.p
                key={index}
                variants={itemVariants}
                className="text-lg"
              >
                {text}
              </motion.p>
            ))}

            <motion.div
              variants={itemVariants}
              className="flex flex-wrap gap-3"
            >
              {[
                "Creative",
                "Detail-oriented",
                "Problem Solver",
                "Team Player",
                "Innovative",
              ].map((trait) => (
                <span
                  key={trait}
                  className="bg-space-light px-3 py-1 rounded-full text-sm text-neon-blue border border-neon-blue/20"
                >
                  {trait}
                </span>
              ))}
            </motion.div>
          </motion.div>
        </div>


      </div>

      <div className="absolute bottom-0 left-0 w-full h-40 bg-gradient-to-t from-space-dark to-transparent z-10" />
    </section>
  );
});

AboutSection.displayName = "AboutSection";

export default AboutSection;
