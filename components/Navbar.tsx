
import React, { useState, useEffect } from 'react';

interface NavbarProps {
  lang: 'en' | 'cn';
  setLang: (lang: 'en' | 'cn') => void;
  translations: any;
  currentView: 'home' | 'contact' | 'projects';
  setView: (view: 'home' | 'contact' | 'projects') => void;
}

const Navbar: React.FC<NavbarProps> = ({ lang, setLang, translations, currentView, setView }) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      // Always visible on Contact page, scroll-dependent on Home
      if (currentView === 'contact') {
        setIsVisible(true);
        return;
      }
      if (window.scrollY > 100) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check
    return () => window.removeEventListener('scroll', handleScroll);
  }, [currentView]);

  const handleNavClick = (e: React.MouseEvent, section: string) => {
    e.preventDefault();
    
    // If clicking "Contacts", we always switch to the dedicated contact page view
    if (section === 'contact') {
      setView('contact');
      return;
    }

    if (section === 'projects') {
      setView('projects');
      return;
    }
    
    // If we are currently on the contact page or projects page and want to go home
    if (currentView === 'contact' || currentView === 'projects') {
      setView('home');
      // Delay scrolling slightly to allow the home view components to mount
      // 200ms provides a safer margin for React reconciliation and mount animations
      setTimeout(() => {
        try {
          const el = document.getElementById(section);
          if (el) {
            el.scrollIntoView({ behavior: 'smooth' });
          } else {
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }
        } catch (err) {
          console.warn("Navigation scroll failed, falling back to top.", err);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }
      }, 200);
    } else {
      // We are already on the home view, just handle the scroll
      const el = document.getElementById(section);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      } else if (section === 'home') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }
  };

  const toggleLang = () => {
    setLang(lang === 'en' ? 'cn' : 'en');
  };

  return (
    <nav 
      className={`fixed top-6 left-1/2 -translate-x-1/2 z-50 transition-all duration-700 transform ${
        isVisible ? 'translate-y-0 opacity-100' : '-translate-y-12 opacity-0 pointer-events-none'
      }`}
    >
      <div className="bg-white/80 backdrop-blur-xl border border-[#47474F]/5 rounded-full px-6 py-2.5 flex items-center gap-6 shadow-[0_20px_40px_-10px_rgba(0,0,0,0.05)]">
        <a 
          href="#home" 
          onClick={(e) => handleNavClick(e, 'home')}
          className={`text-sm font-bold transition-all ${currentView === 'home' ? 'text-[#47474F]' : 'text-[#47474F]/40 hover:text-[#47474F]'}`}
        >
          {translations.nav.home}
        </a>
        <a 
          href="#projects" 
          onClick={(e) => handleNavClick(e, 'projects')}
          className={`text-sm font-bold transition-all ${currentView === 'projects' ? 'text-[#47474F]' : 'text-[#47474F]/40 hover:text-[#47474F]'}`}
        >
          {translations.nav.projects}
        </a>
        <button 
          onClick={(e) => handleNavClick(e as any, 'contact')}
          className={`text-sm font-bold transition-all ${currentView === 'contact' ? 'text-[#47474F]' : 'text-[#47474F]/40 hover:text-[#47474F]'}`}
        >
          {translations.nav.contacts}
        </button>
        
        <div className="h-4 w-[1px] bg-[#47474F]/10 mx-1" />
        
        <button 
          onClick={toggleLang}
          className="flex items-center gap-2 text-[#47474F]/40 hover:text-[#47474F] transition-all"
        >
          <span className="text-[10px] font-extrabold uppercase tracking-widest">{lang === 'en' ? 'EN' : 'CN'}</span>
          <svg className={`w-3 h-3 transition-transform duration-300 ${lang === 'cn' ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
