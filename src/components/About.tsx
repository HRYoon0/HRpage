
import { Code, Palette, Zap, Youtube, Bot, ArrowUp } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
  DialogFooter
} from './ui/dialog';
import { Button } from './ui/button';
import { ExternalLink } from 'lucide-react';
import useScrollAnimation from '@/hooks/useScrollAnimation';

const About = () => {
  const [youtubeLinks, setYoutubeLinks] = useState([]);
  const [aiSites, setAiSites] = useState([]);
  const [codingSites, setCodingSites] = useState([]);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [showScrollButton, setShowScrollButton] = useState(false);
  const sectionRef = useScrollAnimation();

  useEffect(() => {
    const handleScroll = () => {
      if (scrollRef.current) {
        setShowScrollButton(scrollRef.current.scrollTop > 100);
      }
    };

    const currentScrollRef = scrollRef.current;
    if (currentScrollRef) {
      currentScrollRef.addEventListener('scroll', handleScroll);
    }

    return () => {
      if (currentScrollRef) {
        currentScrollRef.removeEventListener('scroll', handleScroll);
      }
    };
  }, []);

  useEffect(() => {
    fetch(`${import.meta.env.BASE_URL}youtube_links.json`)
      .then(response => response.json())
      .then(data => setYoutubeLinks(data))
      .catch(error => console.error('Error fetching YouTube links:', error));

    fetch(`${import.meta.env.BASE_URL}ai_sites.json`)
      .then(response => response.json())
      .then(data => setAiSites(data))
      .catch(error => console.error('Error fetching AI sites:', error));

    fetch(`${import.meta.env.BASE_URL}coding_sites.json`)
      .then(response => response.json())
      .then(data => setCodingSites(data))
      .catch(error => console.error('Error fetching Coding sites:', error));
  }, []);

  const skills = [
    {
      icon: Youtube,
      title: "AI 유튜브 자료",
      description: "AI 관련 볼만한 자료",
      color: "from-blue-500 to-cyan-500"
    },
    {
      icon: Bot,
      title: "AI 사이트",
      description: "활용도가 높은 AI 사이트 모음",
      color: "from-purple-500 to-pink-500"
    },
    {
      icon: Code,
      title: "Coding 사이트",
      description: "Coding에 유용한 사이트 모음",
      color: "from-yellow-500 to-orange-500"
    }
  ];

  return (
    <section ref={sectionRef} id="about" className="py-20 bg-white opacity-0 transition-all duration-1000">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4 text-gray-900">AI & Coding</h2>
          <div className="w-20 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto mb-8"></div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            AI와 코딩을 위한 유용한 링크를 준비하였습니다.
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {skills.map((skill, index) => (
            <div key={index} className="group">
              <Dialog onOpenChange={(open) => {
                if (open) {
                  setTimeout(() => {
                    setShowScrollButton(false);
                    if (scrollRef.current) {
                      scrollRef.current.scrollTop = 0;
                    }
                  }, 0); // Delay to ensure DOM is ready
                }
              }}>
                <DialogTrigger asChild>
                  <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100 cursor-pointer">
                    <div className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${skill.color} flex items-center justify-center mb-6 mx-auto group-hover:scale-110 transition-transform duration-300`}>
                      <skill.icon className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-xl font-bold mb-4 text-gray-900 text-center">{skill.title}</h3>
                    <p className="text-gray-600 text-center leading-relaxed">{skill.description}</p>
                  </div>
                </DialogTrigger>
                <DialogContent className="sm:max-w-md bg-white rounded-xl shadow-2xl p-10">
                  <div className="absolute top-4 left-4 flex space-x-2">
                    <DialogClose asChild>
                      <span className="w-3 h-3 rounded-full bg-red-500 cursor-pointer"></span>
                    </DialogClose>
                    <span className="w-3 h-3 rounded-full bg-yellow-500"></span>
                    <span className="w-3 h-3 rounded-full bg-green-500"></span>
                  </div>
                  <DialogHeader className="bg-gray-50 px-6 py-4 rounded-t-xl border-0">
                    <DialogTitle>{skill.title}</DialogTitle>
                    <DialogDescription>
                      아래 링크들을 클릭하여 관련 자료를 확인하세요.
                    </DialogDescription>
                  </DialogHeader>
                  <div ref={scrollRef} className="grid gap-1 py-4 border-0 max-h-[400px] overflow-y-auto">
                    {skill.title === "AI 유튜브 자료" && (
                      <>
                        {youtubeLinks.map((link, linkIndex) => (
                          <a key={linkIndex} href={link.url} target="_blank" rel="noopener noreferrer" className="flex items-center justify-between p-4 rounded-lg hover:bg-gray-100 transition-colors duration-200 group border border-gray-200 shadow-sm">
                            <div className="flex flex-col">
                              <span className="text-gray-800 group-hover:text-blue-600 font-bold">{link.title}</span>
                              {link.description && <p className="text-sm text-gray-500">{link.description}</p>}
                            </div>
                          </a>
                        ))}
                      </>
                    )}
                    {skill.title === "AI 사이트" && (
                      <>
                        {aiSites.map((link, linkIndex) => (
                          <a key={linkIndex} href={link.url} target="_blank" rel="noopener noreferrer" className="flex items-center justify-between p-4 rounded-lg hover:bg-gray-100 transition-colors duration-200 group border border-gray-200 shadow-sm">
                            <div className="flex flex-col">
                              <span className="text-gray-800 group-hover:text-blue-600 font-bold">{link.title}</span>
                              {link.description && <p className="text-sm text-gray-500">{link.description}</p>}
                            </div>
                          </a>
                        ))}
                      </>
                    )}
                    {skill.title === "Coding 사이트" && (
                      <>
                        {codingSites.map((link, linkIndex) => (
                          <a key={linkIndex} href={link.url} target="_blank" rel="noopener noreferrer" className="flex items-center justify-between p-4 rounded-lg hover:bg-gray-100 transition-colors duration-200 group border border-gray-200 shadow-sm">
                            <div className="flex flex-col">
                              <span className="text-gray-800 group-hover:text-blue-600 font-bold">{link.title}</span>
                              {link.description && <p className="text-sm text-gray-500">{link.description}</p>}
                            </div>
                          </a>
                        ))}
                      </>
                    )}
                  </div>
                  {showScrollButton && (
                    <button
                      onClick={() => scrollRef.current?.scrollTo({ top: 0, behavior: 'smooth' })}
                      className="absolute bottom-4 right-4 bg-blue-500 text-white p-2 rounded-full shadow-lg hover:bg-blue-600 transition-colors duration-200"
                    >
                      <ArrowUp className="w-5 h-5" />
                    </button>
                  )}
                </DialogContent>
              </Dialog>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;

