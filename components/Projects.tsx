
import React from 'react';

interface ProjectsProps {
  translations: any;
  onViewMoreClick: () => void;
  onProjectClick: (id: string) => void;
}

const Projects: React.FC<ProjectsProps> = ({ translations, onViewMoreClick, onProjectClick }) => {
  const t = translations.projects;
  return (
    <section id="projects" className="bg-[#111111] py-32 px-6 md:px-20 overflow-hidden relative">
      {/* Decorative Grid Background */}
      <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ 
        backgroundImage: `radial-gradient(circle, #888 1px, transparent 1px)`,
        backgroundSize: '40px 40px'
      }} />

      <div className="max-w-7xl mx-auto space-y-24 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div className="space-y-4">
            <div className="text-[10px] font-bold text-emerald-500 uppercase tracking-widest">{t.caseStudies}</div>
            <h2 className="text-5xl md:text-7xl font-extrabold text-white leading-none tracking-tighter">
              {t.featured} <br/><span className="text-[#B09E3A]">{t.projects}</span>
            </h2>
          </div>
          <div className="max-w-xs text-[#797D85] font-medium leading-relaxed">
            {t.headerDesc}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {[
            { id: 'eng-solar-tracker', title: t.p1Title, desc: t.p1Desc, tag: 'Hardware' },
            { id: 'des-adiparagata', title: t.p2Title, desc: t.p2Desc, tag: 'Design' }
          ].map((proj, idx) => (
            <div 
              key={idx} 
              onClick={() => onProjectClick(proj.id)}
              className="group relative aspect-[4/5] md:aspect-[1/1] rounded-[60px] overflow-hidden bg-[#1A1A1A] border border-white/5 cursor-pointer"
            >
              <div className="absolute inset-0 bg-[#B09E3A]/20 scale-110 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
              <div className="absolute inset-0 flex flex-col justify-end p-12 z-20">
                <div className="space-y-4 transform translate-y-8 group-hover:translate-y-0 transition-transform duration-500">
                  <div className="bg-white/10 backdrop-blur-md text-white text-[10px] font-bold px-3 py-1 rounded-full w-fit uppercase tracking-widest">
                    {proj.tag}
                  </div>
                  <h3 className="text-3xl md:text-4xl font-bold text-white">{proj.title}</h3>
                  <p className="text-gray-400 font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100 max-w-sm">
                    {proj.desc}
                  </p>
                </div>
              </div>
              <div className="absolute top-12 right-12 w-16 h-16 bg-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transform translate-x-4 group-hover:translate-x-0 transition-all duration-500">
                <svg className="w-8 h-8 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center pt-12">
          <button 
            onClick={onViewMoreClick}
            className="text-white font-bold group flex items-center gap-4 mx-auto hover:text-[#B09E3A] transition-colors"
          >
            <span className="text-2xl uppercase tracking-tighter">{t.viewMore}</span>
            <div className="w-10 h-10 border border-white/20 rounded-full flex items-center justify-center group-hover:border-[#B09E3A] transition-colors">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </div>
          </button>
        </div>
      </div>
    </section>
  );
};

export default Projects;
