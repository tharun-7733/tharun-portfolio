import React, { useState, useEffect } from "react";
import GradientText from "./GradientText";
import { Menu, X, FileText } from "lucide-react";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      if (scrollPosition > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = ["About", "Skills", "Certifications", "Projects", "Achievements", "Research", "Contact"];

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${scrolled || mobileMenuOpen ? "bg-space-dark/95 backdrop-blur-md py-3" : "bg-black py-5"
        }`}
    >
      <div className="container mx-auto flex justify-between items-center px-4">
        <a href="#hero" onClick={() => setMobileMenuOpen(false)}>
          <GradientText
            colors={["#00EEFF", "#8B5CF6", "#F471B5", "#00EEFF", "#8B5CF6", "#F471B5"]}
            animationSpeed={10}
            showBorder={false}
            className="text-3xl font-bold tracking-widest"
          >
            TT
          </GradientText>
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-10 items-center">
          {navItems.map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              className="relative text-sm uppercase tracking-wider hover:text-neon-blue transition-colors duration-300 after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-[2px] after:bg-neon-blue after:transition-all hover:after:w-full"
            >
              {item}
            </a>
          ))}
          <a
            href="/Tharun_CV.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 relative text-sm uppercase tracking-wider text-neon-purple hover:text-neon-blue transition-colors duration-300 border border-neon-purple/30 px-3 py-1 rounded-md hover:border-neon-blue shadow-[0_0_10px_rgba(139,92,246,0.1)] hover:shadow-[0_0_15px_rgba(0,238,255,0.2)]"
          >
            <FileText className="w-4 h-4" />
            Resume
          </a>
        </nav>

        {/* Mobile menu button */}
        <button
          className="md:hidden text-white p-2"
          onClick={toggleMobileMenu}
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Navigation Dropdown */}
      <div
        className={`md:hidden absolute w-full bg-space-dark/95 backdrop-blur-md transition-all duration-300 overflow-hidden ${mobileMenuOpen ? "max-h-[500px] border-b border-white/10" : "max-h-0"
          }`}
      >
        <div className="flex flex-col p-6 space-y-6">
          {navItems.map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              className="text-lg uppercase tracking-widest hover:text-neon-blue transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              {item}
            </a>
          ))}
          <a
            href="/Tharun_CV.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 text-lg uppercase tracking-widest text-neon-purple bg-neon-purple/10 py-3 rounded-lg border border-neon-purple/30"
            onClick={() => setMobileMenuOpen(false)}
          >
            <FileText className="w-5 h-5" />
            Resume
          </a>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
