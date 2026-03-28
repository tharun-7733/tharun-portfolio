import React from "react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-space py-10 border-t border-neon-blue/10 relative overflow-hidden mb-16 md:mb-0">
      {/* Subtle animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute -top-24 -right-24 w-48 h-48 rounded-full bg-neon-blue/5 filter blur-3xl animate-pulse"
          style={{ animationDuration: "8s" }}
        ></div>
        <div
          className="absolute -bottom-32 -left-32 w-64 h-64 rounded-full bg-neon-purple/5 filter blur-3xl animate-pulse"
          style={{ animationDuration: "10s" }}
        ></div>
      </div>

      <div className="container mx-auto px-4 relative">
        <div className="flex flex-col md:flex-row justify-between items-center md:items-end">
          <div className="mb-8 md:mb-0 relative flex items-center gap-4">
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-neon-blue to-neon-purple rounded-full blur opacity-25 group-hover:opacity-75 transition duration-1000 group-hover:duration-200"></div>
              <div className="relative w-12 h-12 rounded-full overflow-hidden border border-white/20 bg-white/5 backdrop-blur-sm shadow-[0_0_15px_rgba(0,238,255,0.2)] group-hover:shadow-[0_0_25px_rgba(0,238,255,0.4)] transition-all duration-500 hover:scale-110">
                <a 
                  href="/Tharun_CV.pdf" 
                  download="Tharun_CV.pdf" 
                  className="block w-full h-full cursor-pointer"
                  title="Download Resume"
                >
                  <img 
                    src="/assets/myPic.jpeg" 
                    alt="Tharun Teja" 
                    className="w-full h-full object-cover object-top filter grayscale-[20%] group-hover:grayscale-0 transition-all duration-500"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = "/assets/profile_photo.jpg"; // Try next
                      target.onerror = () => {
                        target.src = "/assets/tharun_linkedin.jpg"; // Ultimate fallback
                      };
                    }}
                  />
                </a>
              </div>
            </div>
            <div>
              <a href="#" className="text-2xl font-bold text-gradient group block">
                Tharun Teja
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-neon-blue via-neon-purple to-neon-pink group-hover:w-full transition-all duration-300 ease-out"></span>
              </a>
              <p className="text-white/60 mt-1 text-sm">
                AI & Machine Learning Engineer
              </p>
            </div>
          </div>


          <div className="flex flex-col items-center mt-4 md:items-end md:mt-0 gap-4">
            <p className="text-white/60">© {currentYear} All Rights Reserved</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
