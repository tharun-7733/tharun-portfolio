import React, { useRef, useState, useImperativeHandle, forwardRef } from "react";
import { motion, useInView } from "framer-motion";
import { Award, ExternalLink, LucideIcon } from "lucide-react";

interface Certification {
  title: string;
  issuer: string;
  date: string;
  description: string;
  icon: LucideIcon;
  color: string;
  link?: string;
}

const certifications: Certification[] = [
  {
    title: "Oracle AI Foundation Associate",
    issuer: "Oracle",
    date: "Credential Verified",
    description: "Foundational knowledge and hands-on understanding of AI concepts, machine learning, and cloud-based AI solutions.",
    icon: Award,
    color: "from-red-500 to-rose-600",
    link: "https://drive.google.com/file/d/1tlkFMTyBCBo0ULTdnUfz6U5Y4f4PzBlK/view?usp=drive_link"
  },
  {
    title: "Supervised Machine Learning: Regression and Classification",
    issuer: "Coursera / deeplearning.ai",
    date: "Credential Verified",
    description: "Comprehensive coursework in building machine learning models using supervised learning algorithms.",
    icon: Award,
    color: "from-neon-blue to-blue-600",
    link: "https://drive.google.com/file/d/1E48TDW6fr9lpoC6U1ADKy7yrmeJAquzv/view?usp=drive_link"
  },
  {
    title: "Data Structures and Algorithms",
    issuer: "AlgoTutor",
    date: "Credential Verified",
    description: "Advanced training and problem-solving capability in Data Structures and algorithmic logic.",
    icon: Award,
    color: "from-neon-purple to-purple-600",
    link: "https://drive.google.com/file/d/1u3t9y9cAxgYYQpdl31fZDGivw9bDYn2p/view?usp=drive_link"
  },
  {
    title: "The Bits and Bytes of Computer Networking",
    issuer: "Google",
    date: "Credential Verified",
    description: "In-depth understanding of networking protocols, cloud architecture, and internet communications.",
    icon: Award,
    color: "from-green-400 to-emerald-600",
    link: "https://drive.google.com/file/d/1JmVk2dNgDlzUDRutwL4PzHQZfTpd1rDP/view?usp=drive_link"
  }
];

const CertificationsSection = forwardRef<HTMLElement, {}>((props, ref) => {
  const sectionRef = useRef<HTMLElement>(null);
  
  // Expose the section ref
  useImperativeHandle(ref, () => sectionRef.current!);

  const inView = useInView(sectionRef, { once: true, amount: 0.1, margin: "-100px" });

  return (
    <section
      id="certifications"
      ref={sectionRef}
      className="py-20 md:py-32 relative bg-space overflow-hidden"
    >
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-full h-full pointer-events-none">
        <motion.div
           animate={{
            scale: [1, 1.2, 1],
            opacity: [0.1, 0.2, 0.1],
          }}
          transition={{ duration: 8, repeat: Infinity }}
          className="absolute top-1/4 left-1/4 w-[400px] h-[400px] bg-neon-blue/10 rounded-full blur-[100px]"
        />
        <motion.div
           animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.1, 0.2, 0.1],
          }}
          transition={{ duration: 10, repeat: Infinity }}
          className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-neon-purple/10 rounded-full blur-[100px]"
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
            Certifications
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="text-white/70 text-lg max-w-2xl mx-auto"
          >
            A showcase of my professional credentials and continual learning in the rapidly advancing field of AI & Machine Learning.
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {certifications.map((cert, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ delay: 0.2 + index * 0.1, duration: 0.6 }}
              className="group relative h-full"
            >
              {/* Card Container */}
              <div className="bg-space-light/40 backdrop-blur-md rounded-2xl p-8 border border-white/10 h-full transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_10px_40px_-15px_rgba(0,0,0,0.5)] flex flex-col items-start relative overflow-hidden z-10">
                
                {/* Glow Overlay */}
                <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${cert.color} opacity-0 group-hover:opacity-20 blur-3xl rounded-full transition-opacity duration-500`} />

                <div className={`p-4 rounded-xl inline-flex bg-gradient-to-br ${cert.color} shadow-lg mb-6 relative z-10`}>
                  <cert.icon className="w-8 h-8 text-white" />
                </div>

                <div className="flex-1 flex flex-col justify-between w-full relative z-10">
                  <div>
                    <h3 className="text-xl md:text-2xl font-bold text-white mb-2 leading-tight">
                      {cert.title}
                    </h3>
                    <p className="text-neon-blue font-medium mb-1">{cert.issuer}</p>
                    <p className="text-sm text-white/50 mb-4">{cert.date}</p>
                    <p className="text-white/70 leading-relaxed text-sm">
                      {cert.description}
                    </p>
                  </div>

                  {cert.link && (
                    <a href={cert.link} target="_blank" rel="noopener noreferrer" className="mt-6 inline-flex items-center text-sm font-medium text-neon-purple hover:text-neon-pink transition-colors">
                      View Credential <ExternalLink className="ml-2 w-4 h-4" />
                    </a>
                  )}
                </div>
                
                {/* Bottom Border Glow */}
                <div className={`absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r ${cert.color} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left`} />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
});

CertificationsSection.displayName = "CertificationsSection";

export default CertificationsSection;
