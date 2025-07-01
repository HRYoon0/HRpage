import React, { useState, useEffect } from 'react';

interface TypingEffectProps {
  text: string;
  typingSpeed?: number;
  delay?: number;
  loop?: boolean;
}

const TypingEffect: React.FC<TypingEffectProps> = ({
  text,
  typingSpeed = 50,
  delay = 0,
  loop = false,
}) => {
  const [displayedText, setDisplayedText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (!text) return;

    const timeout1 = setTimeout(() => {
      if (currentIndex < text.length) {
        const timeout2 = setTimeout(() => {
          setDisplayedText((prevText) => prevText + text[currentIndex]);
          setCurrentIndex((prevIndex) => prevIndex + 1);
        }, typingSpeed);
        return () => clearTimeout(timeout2);
      } else if (loop) {
        const timeout3 = setTimeout(() => {
          setDisplayedText('');
          setCurrentIndex(0);
        }, 1000); // Delay before restarting the loop
        return () => clearTimeout(timeout3);
      }
    }, delay);

    return () => clearTimeout(timeout1);
  }, [currentIndex, text, typingSpeed, delay, loop]);

  return <>{displayedText}</>;
};

export default TypingEffect;
