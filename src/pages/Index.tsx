
import { useCallback } from 'react';
import Hero from "@/components/Hero";
import About from "@/components/About";
import Projects from "@/components/Projects";
import Footer from "@/components/Footer";

const Index = () => {
  const scrollToSection = useCallback((id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const startPosition = window.pageYOffset;
      const targetPosition = element.getBoundingClientRect().top + window.pageYOffset;
      const distance = targetPosition - startPosition;
      const duration = 800; // milliseconds
      let startTime: number | null = null;

      // Easing function (quadrilateral ease-in-out)
      const easeInOutQuad = (t: number, b: number, c: number, d: number) => {
        t /= d / 2;
        if (t < 1) return c / 2 * t * t + b;
        t--;
        return -c / 2 * (t * (t - 2) - 1) + b;
      };

      const animateScroll = (currentTime: number) => {
        if (startTime === null) startTime = currentTime;
        const timeElapsed = currentTime - startTime;
        const easedProgress = easeInOutQuad(timeElapsed, startPosition, distance, duration);

        window.scrollTo(0, easedProgress);

        if (timeElapsed < duration) {
          requestAnimationFrame(animateScroll);
        } else {
          // Ensure final position is exact to prevent slight misalignments
          window.scrollTo(0, targetPosition);
        }
      };

      requestAnimationFrame(animateScroll);
    }
  }, []);

  return (
    <div>
      <Hero scrollToSection={scrollToSection} />
      <About id="about" />
      <Projects id="projects" />
      <Footer id="footer" />
    </div>
  );
};

export default Index;
