
import { useCallback } from 'react';
import Hero from "@/components/Hero";
import About from "@/components/About";
import Projects from "@/components/Projects";
import Footer from "@/components/Footer";

const Index = () => {
  const scrollToSection = useCallback((id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  return (
    <div className="min-h-screen">
      <Hero scrollToSection={scrollToSection} />
      <About id="about" />
      <Projects id="projects" />
      <Footer id="footer" />
    </div>
  );
};

export default Index;
