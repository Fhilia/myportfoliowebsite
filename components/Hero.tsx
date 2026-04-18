
import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'motion/react';

interface HeroProps {
  translations: any;
}

const Hero: React.FC<HeroProps> = ({ translations }) => {
  const [displayText, setDisplayText] = useState('');
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  
  const fullText = translations.hero.greeting;
  const focusingOn = translations.hero.focusingOn;
  const words = translations.hero.words;
  
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const mousePos = useRef({ x: -1000, y: -1000 });

  // Typewriter effect
  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      setDisplayText(fullText.slice(0, index));
      index++;
      if (index > fullText.length) clearInterval(interval);
    }, 25);
    return () => clearInterval(interval);
  }, [fullText]);

  // Word cycler
  useEffect(() => {
    const wordInterval = setInterval(() => {
      setCurrentWordIndex((prev) => (prev + 1) % words.length);
    }, 2000);
    return () => clearInterval(wordInterval);
  }, [words.length]);

  // Topographic Flow Lines Animation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = window.innerWidth;
    let height = window.innerHeight;

    // Grid settings
    const rows = 30;
    const cols = 45;
    const points: { x: number; y: number; ox: number; oy: number }[][] = [];

    const initPoints = () => {
      if (!containerRef.current) return;
      width = containerRef.current.offsetWidth;
      height = containerRef.current.offsetHeight;
      canvas.width = width;
      canvas.height = height;
      points.length = 0;
      for (let r = 0; r < rows; r++) {
        const rowPoints = [];
        for (let c = 0; c < cols; c++) {
          const x = (c * width) / (cols - 1);
          const y = (r * height) / (rows - 1);
          rowPoints.push({ x, y, ox: x, oy: y });
        }
        points.push(rowPoints);
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, width, height);

      // Physics update
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const p = points[r][c];
          const dx = mousePos.current.x - p.ox;
          const dy = mousePos.current.y - p.oy;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const maxDist = 350; // Increased range for cursor interaction

          if (dist < maxDist) {
            const force = (maxDist - dist) / maxDist;
            const angle = Math.atan2(dy, dx);
            // Repel from mouse
            p.x = p.ox - Math.cos(angle) * force * 55;
            p.y = p.oy - Math.sin(angle) * force * 55;
          } else {
            // Return to origin
            p.x += (p.ox - p.x) * 0.1;
            p.y += (p.oy - p.y) * 0.1;
          }
        }
      }

      // Drawing styling: Slightly more visible grid
      // Using 0.18 opacity for better visibility without being too dark
      ctx.strokeStyle = 'rgba(71, 71, 79, 0.18)';
      ctx.lineWidth = 0.9;

      // Draw horizontal lines
      for (let r = 0; r < rows; r++) {
        ctx.beginPath();
        ctx.moveTo(points[r][0].x, points[r][0].y);
        for (let c = 1; c < cols; c++) {
          const p = points[r][c];
          ctx.lineTo(p.x, p.y);
        }
        ctx.stroke();
      }

      // Draw vertical lines
      for (let c = 0; c < cols; c++) {
        ctx.beginPath();
        ctx.moveTo(points[0][c].x, points[0][c].y);
        for (let r = 1; r < rows; r++) {
          const p = points[r][c];
          ctx.lineTo(p.x, p.y);
        }
        ctx.stroke();
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    window.addEventListener('resize', initPoints);
    initPoints();
    animate();

    return () => {
      window.removeEventListener('resize', initPoints);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <section 
      ref={containerRef}
      onMouseMove={(e) => {
        const rect = containerRef.current?.getBoundingClientRect();
        if (rect) {
          mousePos.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
        }
      }}
      className="relative h-screen w-full flex items-center justify-center overflow-hidden bg-[#FBFBFB]"
    >
      {/* Background Interactive Mesh */}
      <canvas ref={canvasRef} className="absolute inset-0 z-0 pointer-events-none" />

      {/* Subtle radial overlay for depth - softened to ensure grid visibility at the bottom */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_50%_40%,rgba(255,255,255,0)_0%,rgba(251,251,251,0.3)_100%)] z-1" />

      {/* Main Content Area */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="container mx-auto px-6 md:px-20 z-10 pointer-events-none relative"
      >
        <div className="max-w-5xl">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold leading-[1.1] text-[#47474F] whitespace-pre-wrap tracking-tight">
            {displayText}
            <span className="inline-block w-[3px] h-[0.8em] bg-[#47474F] ml-1 cursor-blink align-middle"></span>
          </h1>

          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="mt-6 md:mt-8 flex flex-row items-center gap-3 md:gap-4 text-lg md:text-2xl font-semibold text-[#47474F]/60"
          >
            <span className="text-[#47474F] whitespace-nowrap">{focusingOn}</span>
            <div className="h-[1.2em] overflow-hidden relative w-48 md:w-64">
              <div 
                className="absolute inset-0 transition-transform duration-700 ease-in-out"
                style={{ transform: `translateY(-${currentWordIndex * 100}%)` }}
              >
                {words.map((word, i) => (
                  <div key={i} className="h-full flex items-center text-[#B09E3A]">
                    {word}
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;
