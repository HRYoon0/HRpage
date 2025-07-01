
import { ArrowDown, Github, Linkedin, Mail, Bot, Code } from 'lucide-react';
import { useState } from 'react';
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
import { Input } from './ui/input';
import { Copy } from 'lucide-react';

const Hero = ({ scrollToSection }: { scrollToSection: (id: string) => void }) => {
  return (
    <section id="hero" className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-blue-50 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-50">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-100/20 to-purple-100/20"></div>
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.1),transparent_50%)]"></div>
      </div>
      
      <div className="container mx-auto px-6 text-center relative z-10">
        <div className="animate-fade-in">
          {/* Profile Image */}
          <div className="w-32 h-32 mx-auto mb-8 rounded-full bg-gradient-to-r from-blue-400 to-purple-500 p-1 shadow-2xl">
            <div className="w-full h-full rounded-full bg-gray-200 flex items-center justify-center text-4xl font-bold text-gray-600">
              HR
            </div>
          </div>
          
          {/* Name and Title */}
          
          <p className="text-2xl md:text-3xl text-gray-600 mb-8 font-bold">
            AI & 코딩 공부하는 교사
          </p>
          
          {/* Description */}
          <p className="text-lg text-gray-700 mb-12 max-w-2xl mx-auto leading-relaxed">
            환영합니다! <br />
            AI와 코딩에 늘 관심을 가지고 있는 초등교사입니다. <br />
            편한 교실 환경을 만들고자 늘 공부하고 있습니다!
          </p>
          
          {/* Social Links */}
          <div className="flex flex-col items-center space-y-4 mb-12">
            <span onClick={() => scrollToSection("about")} className="cursor-pointer text-lg font-semibold text-gray-700">
              바로가기 버튼
            </span>
            <div className="flex flex-row justify-center space-x-4">
              <a onClick={() => scrollToSection("about")} className="flex items-center space-x-2 p-3 bg-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 group cursor-pointer">
                <Bot className="w-6 h-6 text-gray-700 group-hover:text-blue-600" />
                <span className="text-gray-700 group-hover:text-blue-600 font-medium">AI & Coding</span>
              </a>
              <a onClick={() => scrollToSection("projects")} className="flex items-center space-x-2 p-3 bg-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 group cursor-pointer">
                <Code className="w-6 h-6 text-gray-700 group-hover:text-blue-600" />
                <span className="text-gray-700 group-hover:text-blue-600 font-medium">Projects</span>
              </a>
              <Dialog>
                <DialogTrigger asChild>
                  <button className="flex items-center space-x-2 p-3 bg-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 group cursor-pointer">
                    <Mail className="w-6 h-6 text-gray-700 group-hover:text-blue-600" />
                    <span className="text-gray-700 group-hover:text-blue-600 font-medium">Contact</span>
                  </button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-md">
                  <DialogHeader>
                    <DialogTitle>이메일 주소</DialogTitle>
                    <DialogDescription>
                      아래 이메일 주소를 복사하여 연락해주세요.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="flex items-center space-x-2">
                    <div className="grid flex-1 gap-2">
                      <Input id="email" defaultValue="tmdsh2000@naver.com" readOnly />
                    </div>
                    <Button type="submit" size="sm" className="px-3" onClick={() => navigator.clipboard.writeText('tmdsh2000@naver.com')}>
                      <span className="sr-only">Copy</span>
                      <Copy className="h-4 w-4" />
                    </Button>
                  </div>
                  <DialogFooter className="sm:justify-start">
                    <DialogClose asChild>
                      <Button type="button" variant="secondary">
                        닫기
                      </Button>
                    </DialogClose>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
          </div>
          
          
        </div>
      </div>
    </section>
  );
};

export default Hero;
