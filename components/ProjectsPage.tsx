
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ExternalLink, Code, Palette, Cpu, Globe, Layout, Layers, ZoomIn, ZoomOut, Maximize2, ChevronLeft, ChevronRight, FileText, Download } from 'lucide-react';

interface Project {
  id: string;
  title: string;
  title_cn: string;
  description: string;
  description_cn: string;
  tags: string[];
  category: 'engineering' | 'design';
  featured?: boolean;
  pdfUrl: string;
  details: {
    overview: string;
    overview_cn: string;
    whatIDid: string;
    whatIDid_cn: string;
    tools: string[];
    outcome: string;
    outcome_cn: string;
  };
}

const projectsData: Project[] = [
  // Engineering Projects
  {
    id: 'eng-solar-tracker',
    title: 'Automated Solar Tracking System',
    title_cn: '自动太阳能追踪系统',
    description: 'Built an automated solar tracking system using LDR sensors and servo control to dynamically align the panel with the strongest light source, improving energy capture compared to a fixed-position setup.',
    description_cn: '使用 LDR 传感器、伺服电机和 Arduino 设计并实现了太阳能追踪系统，以优化面板方向。',
    tags: ['Arduino'],
    category: 'engineering',
    pdfUrl: '/case-studies/eng-solar-tracker.pdf',
    details: {
      overview: 'Built an automated solar tracking system using LDR sensors and servo control to dynamically align the panel with the strongest light source, improving energy capture compared to a fixed-position setup.',
      overview_cn: '设计并构建了一个自动太阳能追踪系统，根据光照强度调整面板方向，以最大限度地增加能量暴露。',
      whatIDid: '- Integrated LDR sensors to detect real-time light intensity differences\n- Programmed Arduino (C/C++) to process sensor data and control servo motors\n- Developed control logic to continuously track and align with the optimal light direction\n- Designed and assembled the mechanical structure and mounted electronic components\n- Conducted comparative testing between fixed and tracking configurations',
      whatIDid_cn: '• 集成了 LDR 传感器以检测光强差异\n• 编写 Arduino 程序处理传感器输入并控制伺服电机\n• 实现了控制逻辑，使面板持续对准最强光源\n• 组装机械结构并安装组件\n• 进行了效率测试，比较固定式与追踪式的性能',
      tools: ['Arduino'],
      outcome: 'Improved energy alignment and demonstrated the effectiveness of integrating sensing, control logic, and mechanical design into a functional embedded system.',
      outcome_cn: '与固定位置面板相比，展示了改进的能量对齐效果，体现了硬件、软件和控制逻辑的集成。'
    }
  },
  // Design Projects
  {
    id: 'des-linkain',
    title: 'linkain.id — Social Media Manager & Post Designer',
    title_cn: 'linkain.id — 社交媒体运营与海报设计',
    description: 'Managed content planning and designed social posts to keep the brand consistent and improve engagement.',
    description_cn: '负责内容策划并设计社交媒体帖子，以保持品牌一致性并提高参与度。',
    tags: ['Canva'],
    category: 'design',
    pdfUrl: '/case-studies/des-linkain.pdf',
    details: {
      overview: 'Managed the entire social media account independently, overseeing content strategy, visual production, and brand direction to create a professional yet engaging online presence.',
      overview_cn: '独立管理整个社交媒体账号，监督内容策略、视觉制作和品牌方向，打造专业且引人入胜的在线形象。',
      whatIDid: '• Managed end-to-end content creation, including photoshoots, video editing, photo editing, and poster design\n• Developed a consistent visual identity using a defined color palette and typography system\n• Balanced professionalism and entertainment to improve engagement\n• Created educational carousel posts and relatable content to connect with audiences\n• Prioritized consistency and brand voice while maintaining a high visual standard',
      whatIDid_cn: '• 管理端到端的内容创作，包括拍摄、视频编辑、照片编辑和海报设计\n• 使用定义的配色方案和排版系统开发了一致的视觉识别系统\n• 平衡专业性与娱乐性以提高参与度\n• 创作教育类轮播贴和引起共鸣的内容以连接受众\n• 在保持品牌一致性的同时融入轻松的幽默和梗图',
      tools: ['Canva'],
      outcome: 'Improved engagement by making the account visually cohesive and entertaining, strengthening overall brand perception and professionalism.',
      outcome_cn: '通过使账号视觉统一且具有娱乐性，提高了用户参与度，增强了整体品牌认知度和专业性。'
    }
  },
  {
    id: 'des-gc-volunteer',
    title: 'GC Volunteer Club — WeChat Content Creator',
    title_cn: 'GC 志愿者协会 — 微信内容创作者',
    description: 'Created and designed WeChat posts to promote volunteer events and communicate updates clearly.',
    description_cn: '创作并设计微信推送，以推广志愿者活动并清晰地传达更新信息。',
    tags: ['Canva'],
    category: 'design',
    pdfUrl: '/case-studies/des-gc-volunteer.pdf',
    details: {
      overview: 'As a member of GC Volunteer Club, I was responsible for creating and designing WeChat posts to promote volunteer activities and share important announcements.',
      overview_cn: '作为 GC 志愿者协会的一员，我负责创作和设计微信推送，以推广志愿者活动并分享重要公告。',
      whatIDid: '• Designed visual layouts for WeChat articles and promotional posts\n• Structured content to make event details clear and easy to read\n• Coordinated with the team to gather event information and updates\n• Ensured consistent formatting and visual style across posts',
      whatIDid_cn: '• 为微信文章和推广帖子设计视觉布局\n• 组织内容结构，使活动详情清晰易读\n• 与团队协调收集活动信息和更新\n• 确保所有推送的格式和视觉风格保持一致',
      tools: ['Canva'],
      outcome: 'Improved clarity of event communication and helped increase visibility of volunteer activities within the community.',
      outcome_cn: '提高了活动沟通的清晰度，并帮助提升了志愿者活动在社区内的知名度。'
    }
  },
  {
    id: 'des-presentation',
    title: 'Technical Presentation & Poster Design',
    title_cn: '技术演示与海报设计',
    description: 'Designed structured slides and technical posters to present engineering concepts clearly and effectively.',
    description_cn: '设计结构化的演示文稿和技术海报，以清晰有效地展示工程概念。',
    tags: ['PowerPoint', 'Canva'],
    category: 'design',
    pdfUrl: '/case-studies/des-presentation.pdf',
    details: {
      overview: 'Designed presentation slides and academic posters for multiple engineering subjects, focusing on clarity, structure, and visual organization of technical content.',
      overview_cn: '为多个工程学科设计演示文稿和学术海报，专注于技术内容的清晰度、结构和视觉组织。',
      whatIDid: '• Structured complex engineering concepts into clear slide layouts\n• Designed visual hierarchy using spacing, typography, and diagrams\n• Created academic posters for lab reports and project presentations\n• Ensured consistency in formatting across different subjects',
      whatIDid_cn: '• 将复杂的工程概念组织成清晰的幻灯片布局\n• 利用间距、排版和图表设计视觉层级\n• 为实验报告和项目演示创作学术海报\n• 确保不同学科之间的格式一致性',
      tools: ['PowerPoint', 'Canva'],
      outcome: 'Improved clarity of technical communication and made complex material easier to understand during presentations and reports.',
      outcome_cn: '提高了技术沟通的清晰度，使复杂材料在演示和报告中更容易被理解。'
    }
  },
  {
    id: 'des-adiparagata',
    title: 'Adiparagata — Mobile App Design & Development',
    title_cn: 'Adiparagata — 移动应用设计与开发',
    description: 'Designed and developed a mobile application using Figma and Flutter, focusing on user flow and interface clarity.',
    description_cn: '使用 Figma 和 Flutter 设计并开发了一款移动应用，专注于用户流程和界面清晰度。',
    tags: ['Figma', 'Flutter'],
    category: 'design',
    pdfUrl: '/case-studies/des-adiparagata.pdf',
    details: {
      overview: 'Designed and built a mobile application called Adiparagata, focusing on structured user flow, clean interface design, and consistent visual elements.',
      overview_cn: '设计并构建了名为 Adiparagata 的移动应用，专注于结构化的用户流程、简洁的界面设计和一致的视觉元素。',
      whatIDid: '• Designed the full app interface and screen layouts in Figma\n• Created user flow and navigation structure\n• Implemented the app using Flutter\n• Ensured layout consistency, spacing, and responsive behavior\n• Refined typography and color usage for better readability',
      whatIDid_cn: '• 在 Figma 中设计了完整的应用界面和屏幕布局\n• 创建了用户流程和导航结构\n• 使用 Flutter 实现了该应用\n• 确保布局一致性、间距和响应式行为\n• 优化了排版和颜色使用以提高可读性',
      tools: ['Figma', 'Flutter'],
      outcome: 'Developed a functional mobile application with a clear structure and user-friendly interface, demonstrating both design planning and technical implementation.',
      outcome_cn: '开发了一款功能齐全、结构清晰且界面友好的移动应用，展示了设计规划和技术实现能力。'
    }
  }
];

interface ProjectsPageProps {
  onBack: () => void;
  lang: 'en' | 'cn';
  initialProjectId?: string;
}

const ProjectsPage: React.FC<ProjectsPageProps> = ({ onBack, lang, initialProjectId }) => {
  const [activeCategory, setActiveCategory] = useState<'engineering' | 'design'>(
    initialProjectId && projectsData.find(p => p.id === initialProjectId)?.category === 'design' 
      ? 'design' 
      : 'engineering'
  );
  const [selectedProject, setSelectedProject] = useState<Project | null>(
    initialProjectId ? projectsData.find(p => p.id === initialProjectId) || null : null
  );

  const filteredProjects = projectsData.filter(p => p.category === activeCategory);

  return (
    <div className="min-h-screen bg-[#FBFBFB] pt-32 pb-20">
      <div className="container mx-auto px-6 md:px-20">
        {/* Header */}
        <div className="max-w-3xl mb-16">
          <motion.button 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            onClick={onBack}
            className="mb-8 flex items-center gap-2 text-sm font-bold text-[#47474F]/40 hover:text-[#47474F] transition-all group"
          >
            <X className="w-4 h-4 group-hover:rotate-90 transition-transform" />
            {lang === 'en' ? 'Back to Home' : '返回首页'}
          </motion.button>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-6xl font-extrabold text-[#47474F] mb-6 tracking-tight"
          >
            {lang === 'en' ? 'Projects' : '项目'}
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl text-[#47474F]/60 leading-relaxed"
          >
            {lang === 'en' 
              ? 'A selection of projects across engineering and design.' 
              : '涵盖工程与设计的项目精选。'}
          </motion.p>
        </div>

        {/* Category Switcher */}
        <div className="flex justify-center mb-16">
          <div className="bg-white p-1.5 rounded-2xl shadow-sm border border-[#47474F]/5 flex gap-1">
            <button
              onClick={() => setActiveCategory('engineering')}
              className={`px-8 py-3 rounded-xl text-sm font-bold transition-all flex items-center gap-2 ${
                activeCategory === 'engineering' 
                  ? 'bg-[#47474F] text-white shadow-md' 
                  : 'text-[#47474F]/40 hover:text-[#47474F] hover:bg-gray-50'
              }`}
            >
              <Cpu className="w-4 h-4" />
              {lang === 'en' ? 'Engineering' : '工程技术'}
            </button>
            <button
              onClick={() => setActiveCategory('design')}
              className={`px-8 py-3 rounded-xl text-sm font-bold transition-all flex items-center gap-2 ${
                activeCategory === 'design' 
                  ? 'bg-[#47474F] text-white shadow-md' 
                  : 'text-[#47474F]/40 hover:text-[#47474F] hover:bg-gray-50'
              }`}
            >
              <Palette className="w-4 h-4" />
              {lang === 'en' ? 'Design & Communication' : '设计与沟通'}
            </button>
          </div>
        </div>

        {/* All Projects */}
        <div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map((project) => (
              <ProjectCard 
                key={project.id} 
                project={project} 
                lang={lang}
                onClick={() => setSelectedProject(project)} 
              />
            ))}
          </div>
        </div>
      </div>

      {/* Project Detail Modal */}
      <AnimatePresence>
        {selectedProject && (
          <ProjectModal 
            project={selectedProject} 
            onClose={() => setSelectedProject(null)} 
            lang={lang}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

const ProjectCard: React.FC<{ project: Project; onClick: () => void; lang: 'en' | 'cn' }> = ({ project, onClick, lang }) => {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ y: -5 }}
      className="bg-white rounded-3xl p-8 border border-[#47474F]/5 shadow-sm hover:shadow-xl transition-all cursor-pointer group flex flex-col"
      onClick={onClick}
    >
      <div className="flex justify-between items-start mb-6">
        <div className="p-3 bg-[#47474F]/5 rounded-2xl text-[#47474F]/60 group-hover:bg-[#47474F] group-hover:text-white transition-colors">
          {project.category === 'engineering' ? <Cpu className="w-6 h-6" /> : <Palette className="w-6 h-6" />}
        </div>
      </div>
      
      <h3 className="font-bold text-[#47474F] mb-3 group-hover:text-[#B09E3A] transition-colors text-xl">
        {lang === 'en' ? project.title : project.title_cn}
      </h3>
      
      <p className="text-[#47474F]/60 text-sm leading-relaxed mb-6 flex-grow">
        {lang === 'en' ? project.description : project.description_cn}
      </p>
      
      <div className="flex flex-wrap gap-2 mb-8">
        {project.tags.map(tag => (
          <span key={tag} className="text-[10px] font-bold text-[#47474F]/40 bg-[#47474F]/5 px-2.5 py-1 rounded-lg">
            {tag}
          </span>
        ))}
      </div>
      
      <div className="flex items-center gap-2 text-xs font-bold text-[#47474F] group-hover:gap-4 transition-all">
        {lang === 'en' ? 'View Details' : '查看详情'}
        <ExternalLink className="w-3 h-3" />
      </div>
    </motion.div>
  );
};

const ProjectModal: React.FC<{ project: Project; onClose: () => void; lang: 'en' | 'cn' }> = ({ project, onClose, lang }) => {
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8">
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-[#47474F]/20 backdrop-blur-md"
      />
      
      <motion.div 
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
        className="bg-white w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-[2rem] shadow-2xl relative z-10"
      >
        <div className="p-8 md:p-12">
          {/* Header Row */}
          <div className="flex items-center gap-4 mb-8">
            <span className="text-[10px] font-bold uppercase tracking-widest text-[#47474F]/40 bg-[#47474F]/5 px-3 py-1 rounded-full whitespace-nowrap">
              {project.category === 'engineering' 
                ? (lang === 'en' ? 'Engineering' : '工程技术') 
                : (lang === 'en' ? 'Design' : '设计与沟通')}
            </span>
            <div className="h-[1px] flex-grow bg-[#47474F]/5" />
            <button 
              onClick={onClose}
              className="p-2 bg-[#47474F]/5 hover:bg-[#47474F]/10 rounded-full transition-all group shrink-0"
            >
              <X className="w-4 h-4 text-[#47474F]/60 group-hover:text-[#47474F] transition-colors" />
            </button>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-extrabold text-[#47474F] mb-8 tracking-tight">
            {lang === 'en' ? project.title : project.title_cn}
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="md:col-span-2 space-y-10">
              <section>
                <h4 className="text-xs uppercase tracking-[0.2em] font-bold text-[#47474F]/40 mb-4">
                  {lang === 'en' ? 'Overview' : '项目概览'}
                </h4>
                <p className="text-[#47474F] leading-relaxed text-lg whitespace-pre-line">
                  {lang === 'en' ? project.details.overview : project.details.overview_cn}
                </p>
              </section>
              
              <section>
                <h4 className="text-xs uppercase tracking-[0.2em] font-bold text-[#47474F]/40 mb-4">
                  {lang === 'en' ? 'What I Did' : '我的工作'}
                </h4>
                <p className="text-[#47474F] leading-relaxed whitespace-pre-line">
                  {lang === 'en' ? project.details.whatIDid : project.details.whatIDid_cn}
                </p>
              </section>
              
              <section>
                <h4 className="text-xs uppercase tracking-[0.2em] font-bold text-[#47474F]/40 mb-4">
                  {lang === 'en' ? 'Outcome' : '项目成果'}
                </h4>
                <p className="text-[#47474F] leading-relaxed whitespace-pre-line">
                  {lang === 'en' ? project.details.outcome : project.details.outcome_cn}
                </p>
              </section>
            </div>
            
            <div className="space-y-10">
              <section>
                <h4 className="text-xs uppercase tracking-[0.2em] font-bold text-[#47474F]/40 mb-4">
                  {lang === 'en' ? 'Tools & Skills' : '工具与技能'}
                </h4>
                <div className="flex flex-wrap gap-2">
                  {project.details.tools.map(tool => (
                    <span key={tool} className="text-xs font-bold text-[#47474F] bg-[#47474F]/5 px-3 py-1.5 rounded-xl border border-[#47474F]/5">
                      {tool}
                    </span>
                  ))}
                </div>
              </section>
              
              <div className="space-y-4">
                <h4 className="text-xs uppercase tracking-[0.2em] font-bold text-[#47474F]/40">
                  {lang === 'en' ? 'CASE STUDY' : '案例研究'}
                </h4>
                <div className="bg-[#47474F]/5 rounded-3xl p-8 border border-[#47474F]/10 flex flex-col items-center text-center">
                  <div className="w-16 h-16 bg-white rounded-2xl shadow-sm flex items-center justify-center mb-6">
                    <FileText className="w-8 h-8 text-[#B09E3A]" />
                  </div>
                  <h5 className="font-bold text-[#47474F] mb-2">
                    {lang === 'en' ? 'Full Case Study' : '完整案例研究'}
                  </h5>
                  <p className="text-xs text-[#47474F]/60 mb-8">
                    {lang === 'en' ? 'Detailed documentation of the project process and results.' : '项目过程和结果的详细文档。'}
                  </p>
                  <div className="flex flex-col w-full gap-3">
                    <a 
                      href={project.pdfUrl} 
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full py-4 bg-[#47474F] text-white rounded-2xl font-bold text-sm hover:bg-[#B09E3A] transition-all flex items-center justify-center gap-2"
                    >
                      <ExternalLink className="w-4 h-4" />
                      {lang === 'en' ? 'View Case Study' : '查看案例研究'}
                    </a>
                    <a 
                      href={project.pdfUrl} 
                      download 
                      className="w-full py-4 bg-white border border-[#47474F]/10 text-[#47474F] rounded-2xl font-bold text-sm hover:bg-gray-50 transition-all flex items-center justify-center gap-2"
                    >
                      <Download className="w-4 h-4" />
                      {lang === 'en' ? 'Download PDF' : '下载 PDF'}
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default ProjectsPage;
