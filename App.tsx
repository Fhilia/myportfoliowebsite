
import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Projects from './components/Projects';
import Contact from './components/Contact';
import ProjectsPage from './components/ProjectsPage';

const translations = {
  en: {
    nav: { home: 'Home', projects: 'Projects', contacts: 'Contacts' },
    hero: { 
      greeting: "Hello I'm Fhilia Wijaya. \nElectrical and Computer Engineering \nUndergraduate Student at Shanghai Jiao \nTong University.",
      focusingOn: "Focusing on",
      words: ['Engineering', 'Innovation', 'Excellence', 'Solutions']
    },
    about: {
      title: 'About Me',
      profile: 'Profile',
      heading: 'I build technical projects and communicate ideas through design.',
      desc: 'I enjoy building technical systems and presenting ideas in a way that is clear, structured, and easy to understand.',
      engTitle: 'Engineering',
      engDesc: 'Circuit theory, digital logic using Verilog, and programming in C++, MATLAB, and Python.',
      designTitle: 'Design & Communication',
      designDesc: 'Website design, presentations, and visual content for academic and organizational work.',
      viewProjects: 'View Projects'
    },
    projects: {
      title: 'Featured Projects',
      featured: 'Featured',
      projects: 'Projects',
      caseStudies: 'Case Studies',
      p1Title: 'Automated Solar Tracking System',
      p1Desc: 'Built an automated solar tracking system using LDR sensors and servo control to dynamically align the panel with the strongest light source, improving energy capture compared to a fixed-position setup.',
      p2Title: 'Adiparagata — Mobile App Design & Development',
      p2Desc: 'Designed and implemented a mobile application using Figma and Flutter, focusing on structured user flow and interface clarity.',
      viewMore: 'View More'
    },
    contact: {
      title: "Let's Get in Touch",
      subtitle: "Have a project in mind or just want to say hi?",
      email: 'Email',
      whatsapp: 'Whatsapp',
      wechat: 'We Chat',
      location: 'Shanghai Jiao Tong University, China',
      copied: 'Copied!',
      clickToCopy: 'Click to copy',
      backToHome: 'Back to Home',
      connection: 'Connection'
    },
    footer: 'All rights reserved.'
  },
  cn: {
    nav: { home: '首页', projects: '项目', contacts: '联系方式' },
    hero: { 
      greeting: "你好，我是 Fhilia Wijaya。\n上海交通大学\n电子与计算机工程专业本科生。",
      focusingOn: "专注于",
      words: ['工程技术', '创新', '卓越', '解决方案']
    },
    about: {
      title: '关于我',
      profile: '个人简介',
      heading: '我构建技术项目并通过设计传达想法。',
      desc: '我喜欢构建技术系统，并以清晰、结构化且易于理解的方式展示想法。',
      engTitle: '工程技术',
      engDesc: '电路理论、基于 Verilog 的数字逻辑，以及 C++、MATLAB 和 Python 编程。',
      designTitle: '设计与沟通',
      designDesc: '用于学术和组织工作的网站设计、演示文稿和视觉内容。',
      viewProjects: '查看项目'
    },
    projects: {
      title: '精选项目',
      featured: '精选',
      projects: '项目',
      caseStudies: '案例研究',
      p1Title: '自动太阳能追踪系统',
      p1Desc: '使用 LDR 传感器、伺服电机和 Arduino 设计并实现了太阳能追踪系统，以优化面板方向。',
      p2Title: 'Adiparagata — 移动应用设计与开发',
      p2Desc: '使用 Figma 和 Flutter 设计并开发了一款移动应用，专注于结构化的用户流程和界面清晰度。',
      viewMore: '查看更多'
    },
    contact: {
      title: '保持联系',
      subtitle: '有一个项目想法，或者只是想打个招呼？',
      email: '电子邮件',
      whatsapp: 'Whatsapp',
      wechat: '微信',
      location: '中国，上海交通大学',
      copied: '已复制！',
      clickToCopy: '点击复制',
      backToHome: '返回首页',
      connection: '建立联系'
    },
    footer: '版权所有。'
  }
};

const App: React.FC = () => {
  const [lang, setLang] = useState<'en' | 'cn'>('en');
  const [view, setView] = useState<'home' | 'contact' | 'projects'>('home');
  const [initialProjectId, setInitialProjectId] = useState<string | undefined>(undefined);
  const t = translations[lang];

  const handleViewProjects = (projectId?: string) => {
    setInitialProjectId(projectId);
    setView('projects');
  };

  // Scroll to top when changing views
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [view]);

  return (
    <main className="min-h-screen bg-white">
      <Navbar 
        lang={lang} 
        setLang={setLang} 
        translations={t} 
        currentView={view} 
        setView={setView} 
      />
      
      {view === 'home' ? (
        <div className="animate-in fade-in duration-700">
          <div id="home">
            <Hero translations={t} />
          </div>
          <About 
            translations={t} 
            onContactClick={() => setView('contact')} 
          />
          <div id="projects">
            <Projects 
              translations={t} 
              onViewMoreClick={() => handleViewProjects()}
              onProjectClick={(id) => handleViewProjects(id)}
            />
          </div>
          {/* Contact section restored to Home Page flow */}
          <div id="contact-section">
            <Contact translations={t} isPage={false} />
          </div>
        </div>
      ) : view === 'projects' ? (
        <div className="animate-in slide-in-from-bottom-4 fade-in duration-700">
          <ProjectsPage 
            lang={lang}
            initialProjectId={initialProjectId}
            onBack={() => setView('home')} 
          />
        </div>
      ) : (
        <div className="animate-in slide-in-from-bottom-4 fade-in duration-700">
          <Contact 
            translations={t} 
            isPage={true} 
            onBack={() => setView('home')} 
          />
        </div>
      )}

      <footer className="py-12 text-center text-xs text-gray-400 border-t border-gray-100 bg-white">
        <p>&copy; {new Date().getFullYear()} Fhilia Wijaya. {t.footer}</p>
      </footer>
    </main>
  );
};

export default App;
