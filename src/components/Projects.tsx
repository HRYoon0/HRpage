
import { ExternalLink, Github, FileText, Code, Share2, ArrowUp } from 'lucide-react';
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
import useScrollAnimation from '@/hooks/useScrollAnimation';

const Projects = () => {
  const [selectedProjectInitial, setSelectedProjectInitial] = useState(null);
  const [fullProjectDetails, setFullProjectDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
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

  const projects = [
    {
      title: "파일 공유",
      description: "Python 등을 활용한 프로그램",
      icon: FileText,
      tech: ["React", "Node.js", "MongoDB", "Stripe"],
      gradient: "from-blue-500 to-purple-600",
      jsonPath: "/file_sharing.json"
    },
    {
      title: "Apps Script 공유",
      description: "Apps Script를 활용한 교실 자동화 도구",
      icon: Code,
      tech: ["Vue.js", "Firebase", "Vuex", "WebSocket"],
      gradient: "from-green-500 to-teal-600",
      jsonPath: "/apps_script.json"
    },
    {
      title: "기타 공유",
      description: "날씨 확장 프로그램 등",
      icon: Share2,
      tech: ["React", "Chart.js", "OpenWeather API", "Tailwind"],
      gradient: "from-orange-500 to-red-600",
      jsonPath: "/other_sharing.json"
    }
  ];

  useEffect(() => {
    if (selectedProjectInitial && selectedProjectInitial.jsonPath) {
      setIsLoading(true);
      fetch(`${import.meta.env.BASE_URL}${selectedProjectInitial.jsonPath}`)
        .then(response => response.json())
        .then(data => {
          setFullProjectDetails({ ...selectedProjectInitial, links: data });
          if (scrollRef.current) {
            scrollRef.current.scrollTop = 0;
          }
        })
        .catch(error => {
          console.error('Error fetching project details:', error);
          setFullProjectDetails(null); // Clear details on error
        })
        .finally(() => {
          setIsLoading(false);
          setShowScrollButton(false);
        });
    } else {
      setFullProjectDetails(null); // Clear details if no project is selected
    }
  }, [selectedProjectInitial]);

  return (
    <section ref={sectionRef} id="projects" className="py-20 bg-gray-50 opacity-0 transition-all duration-1000">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4 text-gray-900">Projects</h2>
          <div className="w-20 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto mb-8"></div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            바이브 코딩을 통해 만든 프로젝트들입니다.
          </p>
        </div>
        
        <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <div key={index} className="group">
              <Dialog onOpenChange={(open) => {
                if (open) {
                  if (scrollRef.current) {
                    scrollRef.current.scrollTop = 0;
                  }
                  setShowScrollButton(false); // Ensure hidden on open
                } else {
                  setSelectedProjectInitial(null);
                }
              }}>
                <DialogTrigger asChild>
                  <div 
                    className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100 cursor-pointer"
                    onClick={() => setSelectedProjectInitial(project)}
                    
                  >
                    <div className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${project.gradient} flex items-center justify-center mb-6 mx-auto group-hover:scale-110 transition-transform duration-300`}>
                      <project.icon className="w-8 h-8 text-white" />
                    </div>
                    
                    <h3 className="text-xl font-bold mb-4 text-gray-900 text-center">{project.title}</h3>
                    <p className="text-gray-600 mb-4 leading-relaxed text-center">{project.description}</p>
                    
                    
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
                  {isLoading ? (
                    <div className="text-center py-8">로딩 중...</div>
                  ) : fullProjectDetails ? (
                    <>
                      <DialogHeader className="bg-gray-50 px-6 py-4 border-0">
                        <DialogTitle>{fullProjectDetails.title}</DialogTitle>
                        <DialogDescription>
                          {fullProjectDetails.description}
                        </DialogDescription>
                      </DialogHeader>
                      <div ref={scrollRef} className="grid gap-1 py-4 border-0 max-h-[400px] overflow-y-auto">
                        {fullProjectDetails.links && fullProjectDetails.links.map((link, linkIndex) => (
                          <a key={linkIndex} href={link.url} target="_blank" rel="noopener noreferrer" className="flex items-center justify-between p-4 rounded-lg hover:bg-gray-100 transition-colors duration-200 group border border-gray-200 shadow-sm">
                            <div className="flex flex-col">
                              <span className="text-gray-800 group-hover:text-blue-600 font-bold">{link.title}</span>
                              {link.description && <p className="text-sm text-gray-500">{link.description}</p>}
                            </div>
                          </a>
                        ))}
                      </div>
                      {showScrollButton && (
                        <button
                          onClick={() => scrollRef.current?.scrollTo({ top: 0, behavior: 'smooth' })}
                          className="absolute bottom-4 right-4 bg-blue-500 text-white p-2 rounded-full shadow-lg hover:bg-blue-600 transition-colors duration-200"
                        >
                          <ArrowUp className="w-5 h-5" />
                        </button>
                      )}
                    </>
                  ) : (
                    <div className="text-center py-8">프로젝트 정보를 불러올 수 없습니다.</div>
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

export default Projects;
