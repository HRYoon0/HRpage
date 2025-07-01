
import { useCallback } from 'react';
import Hero from "@/components/Hero";
import About from "@/components/About";
import Projects from "@/components/Projects";
import Footer from "@/components/Footer";

const Index = () => {

  return (
    <div className="min-h-screen">
      <Hero />
      <About id="about" />
      <Projects id="projects" />
      <Footer id="footer" />
    </div>
  );
};

export default Index;
