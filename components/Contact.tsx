
import React, { useEffect, useRef, useState } from 'react';

interface ContactProps {
  translations: any;
  isPage?: boolean;
  onBack?: () => void;
}

const Contact: React.FC<ContactProps> = ({ translations, isPage = false, onBack }) => {
  const t = translations.contact;
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const mousePos = useRef({ x: -1000, y: -1000 });
  const textRef = useRef<HTMLHeadingElement>(null);
  const [copiedValue, setCopiedValue] = useState<string | null>(null);

  const contactDetails = [
    { label: t.email, value: 'fhilia.wijaya@gmail.com', href: 'mailto:fhilia.wijaya@gmail.com', icon: 'M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z' },
    { label: t.whatsapp, value: '+6281119153153', href: 'https://wa.me/6281119153153', icon: 'M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z' },
    { label: t.wechat, value: '+8615201718399', href: null, isCopy: true, icon: 'M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z' },
  ];

  const handleCopy = (value: string) => {
    navigator.clipboard.writeText(value).then(() => {
      setCopiedValue(value);
      setTimeout(() => setCopiedValue(null), 2000);
    });
  };

  // Particle Animation for Standalone Page
  useEffect(() => {
    if (!isPage || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let particles: Particle[] = [];
    const particleCount = 60;

    class Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;

      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.vx = (Math.random() - 0.5) * 0.5;
        this.vy = (Math.random() - 0.5) * 0.5;
        this.size = Math.random() * 2 + 1;
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;

        if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
        if (this.y < 0 || this.y > canvas.height) this.vy *= -1;

        // Mouse interaction
        const dx = mousePos.current.x - this.x;
        const dy = mousePos.current.y - this.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        if (distance < 150) {
          this.x -= dx * 0.02;
          this.y -= dy * 0.02;
        }
      }

      draw() {
        if (!ctx) return;
        ctx.fillStyle = 'rgba(71, 71, 79, 0.2)';
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    const init = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      particles = [];
      for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      particles.forEach((p, i) => {
        p.update();
        p.draw();

        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p.x - p2.x;
          const dy = p.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 150) {
            ctx.strokeStyle = `rgba(71, 71, 79, ${0.1 * (1 - dist / 150)})`;
            ctx.lineWidth = 0.5;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        }
      });

      // Mouse Parallax for Background Text
      if (textRef.current) {
        const moveX = (mousePos.current.x - window.innerWidth / 2) * -0.05;
        const moveY = (mousePos.current.y - window.innerHeight / 2) * -0.05;
        textRef.current.style.transform = `translate(${moveX}px, ${moveY}px) rotate(12deg)`;
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    window.addEventListener('resize', init);
    init();
    animate();

    return () => {
      window.removeEventListener('resize', init);
      cancelAnimationFrame(animationFrameId);
    };
  }, [isPage]);

  // Render for the Standalone Contact Page (High Impact)
  if (isPage) {
    return (
      <section 
        ref={containerRef}
        onMouseMove={(e) => {
          const rect = containerRef.current?.getBoundingClientRect();
          if (rect) {
            mousePos.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
          }
        }}
        className="relative min-h-screen flex flex-col justify-center px-6 md:px-20 bg-[#FBFBFB] overflow-hidden pt-32 pb-20"
      >
        {/* Interactive Canvas Background */}
        <canvas ref={canvasRef} className="absolute inset-0 z-0 pointer-events-none" />

        <div className="absolute inset-0 z-0 opacity-[0.03] select-none pointer-events-none flex items-center justify-center overflow-hidden">
          <h2 
            ref={textRef}
            className="text-[20vw] font-black tracking-tighter text-[#47474F] transition-transform duration-300 ease-out"
            style={{ transform: 'rotate(12deg)' }}
          >
            CONTACT
          </h2>
        </div>
        
        <div className="absolute inset-0 opacity-20 pointer-events-none z-0" style={{ 
          backgroundImage: `radial-gradient(circle, #47474F 1px, transparent 1px)`,
          backgroundSize: '60px 60px'
        }} />

        <div className="max-w-6xl mx-auto w-full relative z-10 space-y-16">
          <div className="space-y-6 max-w-2xl text-center md:text-left mx-auto md:mx-0">
            <div className="inline-block bg-[#47474F] text-white text-[10px] font-bold px-4 py-1.5 rounded-full uppercase tracking-[0.2em] animate-in fade-in slide-in-from-top-4 duration-700">
              {t.connection}
            </div>
            <h2 className="text-6xl md:text-8xl font-black text-[#47474F] leading-tight tracking-tighter animate-in fade-in slide-in-from-left-8 duration-700 delay-100">
              {t.title}
            </h2>
            <p className="text-2xl text-[#47474F]/50 font-medium leading-relaxed animate-in fade-in slide-in-from-left-8 duration-700 delay-200">
              {t.subtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4">
            {contactDetails.map((item, index) => (
              <div 
                key={index} 
                className={`group relative overflow-hidden rounded-[32px] bg-white border border-gray-100 p-8 md:p-12 transition-all duration-500 hover:shadow-[0_40px_80px_-20px_rgba(0,0,0,0.1)] hover:-translate-y-1 animate-in fade-in slide-in-from-bottom-8 duration-700 ${item.isCopy ? 'cursor-pointer' : ''}`}
                style={{ animationDelay: `${300 + index * 100}ms` }}
                onClick={() => item.isCopy && handleCopy(item.value)}
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                  <div className="flex items-center gap-6">
                    <div className="w-16 h-16 rounded-2xl bg-[#47474F]/5 flex items-center justify-center text-[#47474F] transition-colors group-hover:bg-[#47474F] group-hover:text-white">
                      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={item.icon} />
                      </svg>
                    </div>
                    <div>
                      <span className="text-sm font-bold text-[#47474F]/30 uppercase tracking-widest block mb-1">
                        {item.label}
                      </span>
                      {item.href ? (
                        <a href={item.href} target="_blank" rel="noopener noreferrer" className="text-2xl md:text-3xl font-extrabold text-[#47474F] hover:text-[#B09E3A] transition-colors break-all">
                          {item.value}
                        </a>
                      ) : (
                        <div className="flex items-center gap-3">
                          <span className="text-2xl md:text-3xl font-extrabold text-[#47474F] break-all">
                            {item.value}
                          </span>
                          {item.isCopy && (
                            <span className={`text-xs font-bold uppercase tracking-widest px-2 py-1 rounded bg-[#B09E3A] text-white transition-opacity duration-300 ${copiedValue === item.value ? 'opacity-100' : 'opacity-0'}`}>
                              {t.copied}
                            </span>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                  {item.isCopy && (
                    <div className="hidden md:flex items-center gap-2 text-[#47474F]/20 group-hover:text-[#B09E3A] transition-colors">
                      <span className="text-xs font-bold uppercase tracking-widest">{t.clickToCopy}</span>
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2" />
                      </svg>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="flex flex-col md:flex-row justify-between items-center gap-8 pt-12 border-t border-gray-100 animate-in fade-in duration-700 delay-700">
            <div className="flex items-center gap-3 text-[#47474F]/40 font-bold uppercase text-[10px] tracking-widest">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              {t.location}
            </div>
            {onBack && (
              <button onClick={onBack} className="flex items-center gap-4 text-[#47474F]/60 hover:text-[#47474F] transition-colors font-bold text-sm uppercase tracking-widest group">
                <svg className="w-5 h-5 group-hover:-translate-x-2 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16l-4-4m0 0l4-4m-4 4h18" />
                </svg>
                {t.backToHome}
              </button>
            )}
          </div>
        </div>
      </section>
    );
  }

  // Render for the Home Page Section (Minimalist Screenshot Style)
  return (
    <section id="contact" className="py-32 px-6 md:px-20 max-w-5xl mx-auto bg-white">
      <div className="space-y-14">
        <h2 className="text-5xl md:text-[64px] font-extrabold text-[#47474F] tracking-tight">
          {t.title}
        </h2>
        
        <div className="w-full flex flex-col pt-4">
          {contactDetails.map((item, index) => (
            <div 
              key={index} 
              onClick={() => item.isCopy && handleCopy(item.value)}
              className={`flex justify-between items-center py-5 ${index < contactDetails.length - 1 ? 'border-b-[1.5px] border-[#47474F]' : ''} ${item.isCopy ? 'cursor-pointer group' : ''}`}
            >
              <span className="text-lg md:text-xl font-semibold text-[#47474F]">
                {item.label}
              </span>
              <div className="flex items-center gap-3">
                {copiedValue === item.value && (
                  <span className="text-[10px] font-bold uppercase tracking-widest text-[#B09E3A] animate-in fade-in slide-in-from-right-2">
                    {t.copied}
                  </span>
                )}
                {item.href ? (
                  <a 
                    href={item.href} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="text-lg md:text-xl font-semibold text-[#47474F] hover:text-[#B09E3A] transition-colors"
                  >
                    {item.value}
                  </a>
                ) : (
                  <span className={`text-lg md:text-xl font-semibold text-[#47474F] transition-colors ${item.isCopy ? 'group-hover:text-[#B09E3A]' : ''}`}>
                    {item.value}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="pt-8 flex items-center gap-3 text-[#47474F]/40 font-bold uppercase text-[10px] tracking-[0.25em]">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
          </svg>
          {t.location}
        </div>
      </div>
    </section>
  );
};

export default Contact;
