
import { ExternalLink, Github, FileText, Code, Share2 } from 'lucide-react';
import { useState, useEffect } from 'react';
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

const Projects = () => {
  const [selectedProject, setSelectedProject] = useState(null);

  const projects = [
    {
      title: "파일 공유",
      description: "Python 등을 활용한 프로그램",
      icon: FileText,
      tech: ["React", "Node.js", "MongoDB", "Stripe"],
      gradient: "from-blue-500 to-purple-600",
      jsonPath: "/projects/file_sharing.json"
    },
    {
      title: "Apps Script 공유",
      description: "Apps Script를 활용한 교실 자동화 도구",
      icon: Code,
      tech: ["Vue.js", "Firebase", "Vuex", "WebSocket"],
      gradient: "from-green-500 to-teal-600",
      jsonPath: "/projects/task_manager.json"
    },
    {
      title: "기타 공유",
      description: "날씨 확장 프로그램 등",
      icon: Share2,
      tech: ["React", "Chart.js", "OpenWeather API", "Tailwind"],
      gradient: "from-orange-500 to-red-600",
      jsonPath: "/projects/weather_dashboard.json"
    }
  ];

  useEffect(() => {
    if (selectedProject && selectedProject.jsonPath) {
      fetch(selectedProject.jsonPath)
        .then(response => response.json())
        .then(data => setSelectedProject(prev => ({ ...prev, ...data })))
        .catch(error => console.error('Error fetching project details:', error));
    }
  }, [selectedProject?.jsonPath]);

  return (
    <section id="projects" className="py-20 bg-gray-50">
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
              <Dialog onOpenChange={(open) => !open && setSelectedProject(null)}>
                <DialogTrigger asChild>
                  <div 
                    className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100 cursor-pointer"
                    onClick={() => setSelectedProject(project)}
                  >
                    <div className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${project.gradient} flex items-center justify-center mb-6 mx-auto group-hover:scale-110 transition-transform duration-300`}>
                      <project.icon className="w-8 h-8 text-white" />
                    </div>
                    
                    <h3 className="text-xl font-bold mb-4 text-gray-900 text-center">{project.title}</h3>
                    <p className="text-gray-600 mb-4 leading-relaxed text-center">{project.description}</p>
                    
                    
                  </div>
                </DialogTrigger>
                <DialogContent className="sm:max-w-md">
                  {selectedProject && (
                    <>
                      <DialogHeader>
                        <DialogTitle>{selectedProject.title}</DialogTitle>
                        <DialogDescription>
                          {selectedProject.description}
                        </DialogDescription>
                      </DialogHeader>
                      <div className="grid gap-4 py-4">
                        {selectedProject.links && selectedProject.links.map((link, linkIndex) => (
                          <div key={linkIndex} className="flex items-center justify-between">
                            <div className="flex flex-col">
                              <a href={link.url} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                                {link.title}
                              </a>
                              {link.description && <p className="text-sm text-gray-500">{link.description}</p>}
                            </div>
                            <ExternalLink className="w-4 h-4 text-gray-500" />
                          </div>
                        ))}
                      </div>
                      <DialogFooter className="sm:justify-start">
                        <DialogClose asChild>
                          <Button type="button" variant="secondary">
                            닫기
                          </Button>
                        </DialogClose>
                      </DialogFooter>
                    </>
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
