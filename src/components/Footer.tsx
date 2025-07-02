
import { Heart } from 'lucide-react';
import useScrollAnimation from '@/hooks/useScrollAnimation';

const Footer = () => {
  const sectionRef = useScrollAnimation();

  return (
    <footer ref={sectionRef} className="bg-gray-900 text-white py-8 opacity-0 transition-all duration-1000">
      <div className="container mx-auto px-6 text-center">
        <p className="text-gray-300">
          © 2025 HR's Page.
        </p>
        <p className="text-gray-300 mt-2">
          문의: tmdsh2000@naver.com
        </p>
      </div>
    </footer>
  );
};

export default Footer;
