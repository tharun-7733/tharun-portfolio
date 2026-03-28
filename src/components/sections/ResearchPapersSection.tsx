import React, { useRef, useImperativeHandle, forwardRef } from "react";
import { motion, useInView } from "framer-motion";
import { FileText, ExternalLink, Download } from "lucide-react";

interface ResearchPaper {
  title: string;
  authors: string;
  conference?: string;
  date: string;
  description: string;
  link: string;
  color: string;
}

const researchPapers: ResearchPaper[] = [
  {
    title: "Medical Predictive Maintenance",
    authors: "Tharun Teja",
    date: "2024",
    description: "Developing a machine learning framework to predict maintenance risks for biomedical devices. The project integrates numerical data (age, downtime, cost) with NLP analysis of technician logs using Logistic Regression, Random Forest, and XGBoost models.",
    link: "/Medical_predictive_maintenance.pdf",
    color: "from-neon-blue to-purple-600",
  }
];

const ResearchPapersSection = forwardRef<HTMLElement, {}>((props, ref) => {
  const sectionRef = useRef<HTMLElement>(null);
  
  // Expose the section ref
  useImperativeHandle(ref, () => sectionRef.current!);

  const inView = useInView(sectionRef, { once: true, amount: 0.1, margin: "-100px" });

  return (
    <section
      id="research"
      ref={sectionRef}
      className="py-20 md:py-32 relative bg-space overflow-hidden"
    >
      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        <motion.div
           animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.1, 0.15, 0.1],
          }}
          transition={{ duration: 10, repeat: Infinity }}
          className="absolute top-1/3 right-1/4 w-[400px] h-[400px] bg-neon-purple/10 rounded-full blur-[100px]"
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
            Research Papers
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="text-white/70 text-lg max-w-2xl mx-auto"
          >
            A collection of my research contributions and publications in the field of Artificial Intelligence and Machine Learning.
          </motion.p>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          {researchPapers.map((paper, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ delay: 0.2 + index * 0.1, duration: 0.6 }}
              className="group relative mb-8"
            >
              {/* Card Container */}
              <div className="bg-space-light/40 backdrop-blur-md rounded-2xl p-8 border border-white/10 transition-all duration-300 hover:border-neon-blue/30 flex flex-col md:flex-row gap-6 items-center md:items-start relative overflow-hidden z-10">
                
                <div className={`p-4 rounded-xl inline-flex bg-gradient-to-br ${paper.color} shadow-lg relative z-10 flex-shrink-0`}>
                  <FileText className="w-8 h-8 text-white" />
                </div>

                <div className="flex-1 text-center md:text-left">
                  <h3 className="text-xl md:text-2xl font-bold text-white mb-2 leading-tight group-hover:text-neon-blue transition-colors">
                    {paper.title}
                  </h3>
                  <p className="text-white/70 font-medium mb-1">{paper.authors}</p>
                  <p className="text-sm text-white/50 mb-4">{paper.date}</p>
                  <p className="text-white/60 leading-relaxed text-sm mb-4">
                    {paper.description} 
                    The goal is to shift hospitals from reactive to predictive maintenance.
                  </p>
                  
                  <div className="mb-6">
                    <h4 className="text-sm font-semibold text-white/80 mb-2">Key Highlights:</h4>
                    <ul className="text-xs text-white/60 space-y-1 list-disc list-inside">
                      <li>ML-based risk prediction (LogReg, RF, XGBoost)</li>
                      <li>NLP on technician maintenance logs</li>
                      <li>Real-time prediction with interactive dashboard</li>
                      <li>Scalable pipeline for hospital datasets</li>
                    </ul>
                  </div>
                  
                  <div className="flex flex-wrap gap-4 justify-center md:justify-start">
                    <a 
                      href={paper.link} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="inline-flex items-center px-5 py-2 rounded-full bg-neon-blue/10 border border-neon-blue/30 text-neon-blue hover:bg-neon-blue hover:text-white transition-all duration-300 text-sm font-medium"
                    >
                      View PDF <ExternalLink className="ml-2 w-4 h-4" />
                    </a>
                    <a 
                      href={paper.link} 
                      download 
                      className="inline-flex items-center px-5 py-2 rounded-full bg-white/5 border border-white/10 text-white hover:bg-white/10 transition-all duration-300 text-sm font-medium"
                    >
                      Download <Download className="ml-2 w-4 h-4" />
                    </a>
                  </div>
                </div>
                
                {/* Side Accent Decor */}
                <div className={`absolute left-0 top-0 w-1 h-full bg-gradient-to-b ${paper.color} opacity-30 group-hover:opacity-100 transition-opacity duration-500`} />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
});

ResearchPapersSection.displayName = "ResearchPapersSection";

export default ResearchPapersSection;
