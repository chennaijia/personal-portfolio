/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Github, Linkedin, X, ExternalLink, Filter, ChevronDown, Mail, Phone, Maximize2 } from 'lucide-react';
import { PROJECTS } from "@/assets/project.ts"
import { Project, ProjectCardProps } from "@/types/project";

const withBase = (path?: string | null): string => {
  if (!path) return '';
  if (/^(https?:)?\/\//.test(path)) return path;
  return `${import.meta.env.BASE_URL}${path.replace(/^\/+/, '')}`;
};

function ProjectCard({ project, onClick }: ProjectCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.3 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
      className={`project-card cursor-pointer group flex flex-col ${project.isComingSoon ? 'project-card-faded' : ''}`}
    >
      <div className="aspect-square bg-gray-100 overflow-hidden border-b border-brand-blue/20 relative">
        <AnimatePresence mode="wait">
          {isHovered && project.gifUrl ? (
            <motion.img
              key="gif"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              src={project.gifUrl}
              alt={project.title}
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          ) : (
            <motion.img
              key="static"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              src={project.imageUrl}
              alt={project.title}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              referrerPolicy="no-referrer"
            />
          )}
        </AnimatePresence>
      </div>
      <div className="p-6 flex flex-col grow relative">
        <div className="flex justify-between items-start mb-2">
          <h3 className="flex items-center font-bold text-xl group-hover:text-brand-blue transition-colors gap-2">
            {project.title}
            {project.githubUrl && !project.isComingSoon && (
              <Github 
                size={18} 
                className="text-brand-blue/40 group-hover:text-brand-blue transition-colors" 
              />
            )}
          </h3>
        </div>
        <p className="text-sm opacity-70 mb-4 line-clamp-2 leading-relaxed">{project.description}</p>
        
        <div className="flex flex-wrap gap-1.5 mb-4">
          {project.technologies.slice(0, 3).map(tech => (
            <span key={tech} className="text-[10px] px-2 py-0.5 bg-brand-blue/5 rounded-md border border-brand-blue/10">
              {tech}
            </span>
          ))}
        </div>

        <p className="text-xs font-mono opacity-40 mt-auto">{project.date}</p>
      </div>
    </motion.div>
  );
}

export default function App() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [activeFilter, setActiveFilter] = useState<string>('全部');
  const [showScrollHint, setShowScrollHint] = useState(true);
  const [zoomedImageUrl, setZoomedImageUrl] = useState<string | null>(null);

  const handleOpenProject = (project: Project) => {
    setSelectedProject(project);
    setShowScrollHint(true);
    setZoomedImageUrl(null);
  };

  const allFilters = useMemo(() => {
    const categories = Array.from(new Set(PROJECTS.flatMap(p => p.categories)));
    const technologies = Array.from(new Set(PROJECTS.flatMap(p => p.technologies)));
    return ['全部', ...categories, ...technologies];
  }, []);

  const filteredProjects = useMemo(() => {
    if (activeFilter === '全部') return PROJECTS;
    return PROJECTS.filter(p => 
      p.categories.includes(activeFilter) || p.technologies.includes(activeFilter)
    );
  }, [activeFilter]);

  return (
    <div className="min-h-screen p-8 md:p-16 max-w-7xl mx-auto relative z-10">
      {/* Header Section */}
      <header className="flex flex-col md:flex-row items-center md:items-start gap-8 mb-20">
        <div className="w-44 h-44 rounded-full bg-white/50 border-2 border-brand-blue/20 overflow-hidden flex-shrink-0">
          <img 
            src={withBase("assets/images/profile.jpg")} 
            alt="Profile" 
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
        </div>
        <div className="flex flex-col gap-2 text-center md:text-left">
          <h1 className="text-3xl font-bold tracking-tight">陳乃嘉 Jessica</h1>
          <p className="text-xl opacity-80">國立政治大學 資訊管理系 人工智慧應用學士學位學程 大三</p>
          <p className="text-base opacity-80">作為政治大學資訊管理系學生，我具備高度熱忱、自我挑戰精神與良好的自學能力。在學期間，我主動接受各種挑戰，雙主修人工智慧應用學程，並積極參與校內專案與校外研究實驗室，持續磨練技術與研究能力。面對不熟悉的領域時，我善於運用網路資源並主動尋求協助，勇於面對挑戰而不退縮，累積了實際開發經驗並多次參與黑客松競賽。</p>
          <div className="flex flex-wrap gap-x-6 gap-y-3 mt-4 justify-center md:justify-start">
            <a href="https://github.com/chennaijia" className="flex items-center gap-2 hover:text-brand-blue transition-colors group">
              <Github size={20} className="group-hover:scale-110 transition-transform" />
              <span className="font-medium">Github</span>
            </a>
            {/* <a href="#" className="flex items-center gap-2 hover:text-brand-blue transition-colors group">
              <Linkedin size={20} className="group-hover:scale-110 transition-transform" />
              <span className="font-medium">Linkedin</span>
            </a> */}
            <a href="mailto:naijia030@gmail.com" className="flex items-center gap-2 hover:text-brand-blue transition-colors group">
              <Mail size={20} className="group-hover:scale-110 transition-transform" />
              <span className="font-medium">naijia030@gmail.com</span>
            </a>
            <div className="flex items-center gap-2 group">
              <Phone size={20} className="text-brand-blue/60" />
              <span className="font-medium">0978-477-237</span>
            </div>
          </div>
        </div>
      </header>

      {/* Filter Bar */}
      <div className="mb-12">
        <div className="flex items-center gap-3 mb-6">
          <Filter size={20} className="opacity-60" />
          <h3 className="font-bold text-lg">篩選作品</h3>
        </div>
        <div className="flex flex-wrap gap-2">
          {allFilters.map(filter => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`filter-btn ${activeFilter === filter ? 'filter-btn-active' : ''}`}
            >
              {filter}
            </button>
          ))}
        </div>
      </div>

      {/* Projects Section */}
      <section>
        <div className="flex justify-between items-end mb-10">
          <h2 className="text-4xl font-bold tracking-tight">Project</h2>
          <p className="opacity-50 text-sm">顯示 {filteredProjects.length} 個作品</p>
        </div>
        
        <motion.div 
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
        >
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project) => (
              <ProjectCard 
                key={project.id} 
                project={project} 
                onClick={() => !project.isComingSoon && handleOpenProject(project)} 
              />
            ))}
          </AnimatePresence>
        </motion.div>
      </section>

      {/* Project Detail Modal */}
      <AnimatePresence>
        {selectedProject && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedProject(null)}
              className="absolute inset-0 bg-brand-blue/20 backdrop-blur-md"
            />
            <motion.div
              initial={{ opacity: 0, y: 50, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 50, scale: 0.95 }}
              onScroll={(e) => {
                if (e.currentTarget.scrollTop > 50) setShowScrollHint(false);
              }}
              className="glass-modal w-full max-w-4xl max-h-[90vh] overflow-y-auto relative flex flex-col"
            >
              <button 
                onClick={() => setSelectedProject(null)}
                className="absolute top-6 right-6 p-2 hover:bg-brand-blue/10 rounded-full transition-colors z-20 bg-white/50 backdrop-blur-sm"
              >
                <X size={24} />
              </button>

              {/* Banner Image */}
              <div className="w-full max-h-[30vh] aspect-video bg-gray-200 border-b border-brand-blue/10 relative group/image overflow-hidden shrink-0">
                <img 
                  src={selectedProject.gifUrl || selectedProject.imageUrl || ""} 
                  alt={selectedProject.title} 
                  className="w-full h-full max-h-[90vh] object-cover block"
                  referrerPolicy="no-referrer"
                />
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    setZoomedImageUrl(selectedProject.gifUrl || selectedProject.imageUrl);
                  }}
                  className="absolute bottom-4 right-4 p-3 bg-white/90 text-brand-blue rounded-full image:opacity-100 transition-all hover:scale-110 hover:bg-white z-10"
                  title="放大圖片"
                >
                  <Maximize2 size={20} />
                </button>
              </div>

              {/* <AnimatePresence>
                {showScrollHint && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="fixed bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 pointer-events-none z-30 text-brand-blue"
                  >
                    <motion.div
                      animate={{ y: [0, 6, 0] }}
                      transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                    >
                      <ChevronDown size={24} className="opacity-60" />
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence> */}

              <div className="aspect-video w-full bg-gray-100 border-b border-brand-blue/10 relative overflow-hidden">
                <img 
                  src={selectedProject.gifUrl || selectedProject.imageUrl} 
                  alt={selectedProject.title} 
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
              
              <div className="p-8 md:p-16">
                <div className="flex flex-wrap gap-2 mb-6 justify-center">
                  {selectedProject.categories.map(cat => (
                    <span key={cat} className="px-3 py-1 bg-brand-blue text-white text-xs rounded-full">
                      {cat}
                    </span>
                  ))}
                </div>
                
                <h2 className="text-4xl font-bold text-center mb-12">{selectedProject.title}</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                  <div className="md:col-span-2 space-y-10">
                    <section>
                      <h4 className="font-bold mb-4 text-xl border-l-4 border-brand-blue pl-4">專案簡介</h4>
                      <p className="text-lg opacity-80 leading-relaxed">{selectedProject.description}</p>
                    </section>

                    <section>
                      <h4 className="font-bold mb-4 text-xl border-l-4 border-brand-blue pl-4">負責項目</h4>
                      <p className="opacity-70 leading-relaxed">{selectedProject.responsibility || '專案開發與維護。'}</p>
                    </section>

                    <section>
                      {selectedProject.difficulties && selectedProject.solution && (
                        <section>
                        <h4 className="font-bold mb-4 text-xl border-l-4 border-brand-blue pl-4">技術挑戰與解決</h4>
                        <div className="space-y-4">
                      
                          <div>
                            <p className="font-semibold text-brand-blue mb-1">遇到困難：</p>
                            <p className="opacity-70">{selectedProject.difficulties || '在開發過程中遇到的技術挑戰。'}</p>
                          </div>
                          <div>
                            <p className="font-semibold text-brand-blue mb-1">如何解決：</p>
                            <p className="opacity-70">{selectedProject.solution || '透過研究與實作找到的最佳解法。'}</p>
                          </div>
                        </div>
                        </section>
                      )}
                    </section>

                  </div>

                  <div className="space-y-8">
                    {selectedProject.gallery && selectedProject.gallery.length > 0 && (
                      <section>
                        <h4 className="font-bold mb-4 text-lg opacity-60 uppercase tracking-widest">圖庫</h4>
                        <div className="grid grid-cols-2 gap-3">
                          {selectedProject.gallery.map((img, idx) => (
                            <div 
                              key={idx} 
                              className="aspect-square rounded-lg overflow-hidden cursor-zoom-in relative group/gallery border border-brand-blue/10"
                              onClick={() => setZoomedImageUrl(img)}
                            >
                              <img 
                                src={img} 
                                alt={`Gallery ${idx}`} 
                                className="w-full h-full object-cover transition-transform duration-500 group-hover/gallery:scale-110"
                                referrerPolicy="no-referrer"
                              />
                              <div className="absolute inset-0 bg-black/20 opacity-0 group-hover/gallery:opacity-100 transition-opacity flex items-center justify-center">
                                <Maximize2 size={20} className="text-white" />
                              </div>
                            </div>
                          ))}
                        </div>
                      </section>
                    )}
                    <section>
                      <h4 className="font-bold mb-4 text-lg opacity-60 uppercase tracking-widest">使用技術</h4>
                      <div className="flex flex-wrap gap-2">
                        {selectedProject.technologies.map(tech => (
                          <span key={tech} className="px-3 py-1.5 bg-brand-blue/10 rounded-lg text-sm font-medium">
                            {tech}
                          </span>
                        ))}
                      </div>
                    </section>

                    <section>
                      <h4 className="font-bold mb-4 text-lg opacity-60 uppercase tracking-widest">開發時間</h4>
                      <p className="font-mono">{selectedProject.date}</p>
                    </section>

                    <div className="pt-8 flex flex-col gap-3">
                      {selectedProject.visitUrl && (
                        <a 
                          href={selectedProject.visitUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-full py-3 bg-brand-blue text-white rounded-xl hover:shadow-lg transition-all flex items-center justify-center gap-2 font-bold"
                        >
                          <ExternalLink size={18} />
                          專案網站
                        </a>
                      )}
                      {selectedProject.competitionUrl && (
                        <a 
                          href={selectedProject.competitionUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-full py-3 bg-brand-blue text-white rounded-xl hover:shadow-lg transition-all flex items-center justify-center gap-2 font-bold"
                        >
                          <ExternalLink size={18} />
                          競賽/研討會官網
                        </a>
                      )}
                      {selectedProject.githubUrl && (
                        <a 
                          href={selectedProject.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-full py-3 border-2 border-brand-blue text-brand-blue rounded-xl hover:bg-brand-blue hover:text-white transition-all flex items-center justify-center gap-2 font-bold"
                        >
                          <Github size={18} />
                          Github 原始碼
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
      {/* Image Zoom Overlay */}
      <AnimatePresence>
        {zoomedImageUrl && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 p-4 md:p-10 cursor-zoom-out"
            onClick={() => setZoomedImageUrl(null)}
          >
            <button 
              className="absolute top-6 right-6 p-2 text-white/60 hover:text-white transition-colors"
              onClick={() => setZoomedImageUrl(null)}
            >
              <X size={32} />
            </button>
            <motion.img
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              src={zoomedImageUrl}
              alt="Zoomed image"
              className="max-w-full max-h-full object-contain shadow-2xl"
              referrerPolicy="no-referrer"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}