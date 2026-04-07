
import React from 'react';

interface AboutProps {
  translations: any;
  onContactClick: () => void;
}

const About: React.FC<AboutProps> = ({ translations, onContactClick }) => {
  const t = translations.about;
  
  const renderHeading = () => (
    <h2 className="text-5xl md:text-6xl font-extrabold leading-[1.1] tracking-tighter text-[#47474F]">
      {t.heading}
    </h2>
  );

  const renderDescription = () => (
    <p className="text-xl md:text-2xl font-normal leading-relaxed text-[#47474F]/60 max-w-xl">
      {t.desc}
    </p>
  );

  return (
    <section className="py-32 px-6 md:px-20 max-w-7xl mx-auto border-t border-gray-100 bg-white">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">
        <div className="space-y-12">
          <div className="space-y-8">
            <div className="inline-block bg-[#47474F] text-white text-[10px] font-bold px-4 py-1.5 rounded-full uppercase tracking-[0.2em]">
              {t.profile}
            </div>
            {renderHeading()}
          </div>
          {renderDescription()}
          <div className="flex gap-4 pt-4">
            <button 
              onClick={onContactClick}
              className="group flex items-center gap-3 px-8 py-4 bg-[#47474F] text-white rounded-full font-bold hover:bg-[#333339] transition-all hover:scale-[1.02] active:scale-95 shadow-lg shadow-[#47474F]/10"
            >
              {translations.contact.title}
              <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-8 md:pt-20">
          <div className="group space-y-4 p-10 rounded-[48px] border border-gray-100 bg-[#F9F9F9] transition-all duration-500 hover:bg-white hover:shadow-[0_40px_80px_-15px_rgba(0,0,0,0.08)] hover:-translate-y-2">
            <div className="w-14 h-14 bg-[#47474F] rounded-[20px] flex items-center justify-center text-white shadow-inner">
              <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
              </svg>
            </div>
            <h3 className="text-2xl font-extrabold text-[#47474F]">{t.engTitle}</h3>
            <p className="text-[#47474F]/50 font-medium leading-relaxed text-lg">{t.engDesc}</p>
          </div>

          <div className="group space-y-4 p-10 rounded-[48px] border border-gray-100 bg-[#F9F9F9] transition-all duration-500 hover:bg-white hover:shadow-[0_40px_80px_-15px_rgba(0,0,0,0.08)] hover:-translate-y-2">
            <div className="w-14 h-14 bg-[#B09E3A] rounded-[20px] flex items-center justify-center text-white shadow-inner">
              <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
              </svg>
            </div>
            <h3 className="text-2xl font-extrabold text-[#47474F]">{t.designTitle}</h3>
            <p className="text-[#47474F]/50 font-medium leading-relaxed text-lg">{t.designDesc}</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
