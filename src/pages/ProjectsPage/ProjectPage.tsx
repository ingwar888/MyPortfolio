'use client';

import { motion, useMotionValue, useSpring, AnimatePresence } from 'framer-motion';
import { useEffect, useState, useRef, useCallback } from 'react';
import styles from './projectpage.module.css';

const projects = [
  {
    id: 'node-app',
    title: '"Узел" - приложение по контролю наличия оборудования',
    description: 'Написано на C# c использованием Entity Framework и базой данных SQLite',
    tech: ['C#', 'Entity Framework','SQLite','Windows Forms','Visual Studio 2022'],
    github: 'https://github.com/ingwar888/NODE_app_v.1.0',
    screenshots: [
      '/images/projects/node1.png',
      '/images/projects/node2.png',
      '/images/projects/node3.png',
    ],
  },
  {
    id: 'victorina-game',
    title: '"Викторина" - игра - приложение',
    description: 'Моё первое консольное приложение, написанное на C++ с использованием различных инструментов (библиотек (Windows.h), функций, условных операторов и др.)',
    tech: ['С++', 'Visual Studio 2022'],
    github: 'https://github.com/ingwar888/Victorina-Game',
    screenshots: [
      '/images/projects/victorina1.png',
      '/images/projects/victorina2.png',
      '/images/projects/victorina3.png',
    ],
  },
  {
    id: 'text-editor',
    title: 'Текстовый редактор',
    description: 'Прикладное приложение для удобной работы с текстом, написанное на C# и использующее Windows Forms',
    tech: ['C#', 'Windows Forms','Visual Studio 2022'],
    github: 'https://github.com/ingwar888/Text-editor-v1',
    screenshots: [
      '/images/projects/editor1.png',
      '/images/projects/editor2.png',
      '/images/projects/editor3.png',
    ],
  },
];

// Плавающие частицы
const FloatingParticles = () => {
  const [particles, setParticles] = useState<Array<{
    left: number;
    size: number;
    duration: number;
    delay: number;
    color: string;
  }>>([]);

  useEffect(() => {
    const colors = ['#702cbe', '#ffd700', '#f5a623', '#0078D4'];
    const newParticles = Array.from({ length: 40 }, () => ({
      left: Math.random() * 100,
      size: 1 + Math.random() * 3,
      duration: 8 + Math.random() * 20,
      delay: Math.random() * 15,
      color: colors[Math.floor(Math.random() * colors.length)],
    }));
    setParticles(newParticles);
  }, []);

  return (
    <div className={styles.particlesContainer}>
      {particles.map((particle, index) => (
        <div
          key={index}
          className={styles.particle}
          style={{
            left: `${particle.left}%`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            animationDuration: `${particle.duration}s`,
            animationDelay: `${particle.delay}s`,
            background: particle.color,
            boxShadow: `0 0 10px ${particle.color}, 0 0 20px ${particle.color}`,
          }}
        />
      ))}
    </div>
  );
};

// Геометрические фигуры
const GeometricShapes = () => {
  return (
    <div className={styles.geometricShapes}>
      <div className={styles.shape} />
      <div className={styles.shape} />
      <div className={styles.shape} />
    </div>
  );
};

// Модальное окно со слайд-шоу
const ProjectModal = ({ 
  project, 
  onClose 
}: { 
  project: { 
    title: string; 
    description: string; 
    screenshots: string[]; 
    tech: string[];
    github: string;
  }; 
  onClose: () => void;
}) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [images, setImages] = useState<string[]>([]);
  const [imageErrors, setImageErrors] = useState<Set<number>>(new Set());
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Проверяем существование изображений и фильтруем битые
  useEffect(() => {
    const checkImages = async () => {
      const validImages: string[] = [];
      
      for (const screenshot of project.screenshots) {
        try {
          const response = await fetch(screenshot, { method: 'HEAD' });
          if (response.ok) {
            validImages.push(screenshot);
          }
        } catch (error) {
          console.log(`Изображение не найдено: ${screenshot}`);
        }
      }
      
      setImages(validImages);
    };

    checkImages();
  }, [project.screenshots]);

  // Автоматическое переключение слайдов
  useEffect(() => {
    if (images.length <= 1) return;

    intervalRef.current = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % images.length);
    }, 3000); // Медленная смена каждые 3 секунды

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [images.length]);

  const handleImageError = (index: number) => {
    setImageErrors(prev => new Set(prev).add(index));
  };

  const handlePrevImage = () => {
    setCurrentImageIndex((prev) => 
      prev === 0 ? images.length - 1 : prev - 1
    );
    resetInterval();
  };

  const handleNextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
    resetInterval();
  };

  const resetInterval = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    
    if (images.length > 1) {
      intervalRef.current = setInterval(() => {
        setCurrentImageIndex((prev) => (prev + 1) % images.length);
      }, 3000);
    }
  };

  const handleDotClick = (index: number) => {
    setCurrentImageIndex(index);
    resetInterval();
  };

  return (
    <motion.div
      className={styles.modalOverlay}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      onClick={onClose}
    >
      <motion.div
        className={styles.modalContent}
        initial={{ scale: 0.8, opacity: 0, y: 50 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.8, opacity: 0, y: 50 }}
        transition={{ 
          duration: 0.5, 
          type: "spring", 
          stiffness: 120,
          damping: 15 
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Кнопка закрытия */}
        <button 
          className={styles.closeButton}
          onClick={onClose}
          aria-label="Закрыть окно"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M6 18L18 6M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          </svg>
        </button>

        {/* Заголовок проекта */}
        <div className={styles.modalHeader}>
          <h2 className={styles.modalTitle}>{project.title}</h2>
          <p className={styles.modalDescription}>{project.description}</p>
        </div>

        {/* Слайд-шоу */}
        <div className={styles.slideshowContainer}>
          {images.length > 0 ? (
            <>
              <div className={styles.slideshowWrapper}>
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentImageIndex}
                    className={styles.slide}
                    initial={{ opacity: 0, x: 100 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -100 }}
                    transition={{ duration: 0.5, ease: "easeInOut" }}
                  >
                    {!imageErrors.has(currentImageIndex) ? (
                      <img
                        src={images[currentImageIndex]}
                        alt={`Скриншот ${currentImageIndex + 1}`}
                        className={styles.slideImage}
                        onError={() => handleImageError(currentImageIndex)}
                      />
                    ) : (
                      <div className={styles.imagePlaceholder}>
                        <span>Изображение недоступно</span>
                      </div>
                    )}
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Кнопки навигации */}
              {images.length > 1 && (
                <>
                  <button 
                    className={`${styles.navButton} ${styles.prevButton}`}
                    onClick={handlePrevImage}
                    aria-label="Предыдущее изображение"
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                      <path d="M15 18l-6-6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                    </svg>
                  </button>
                  <button 
                    className={`${styles.navButton} ${styles.nextButton}`}
                    onClick={handleNextImage}
                    aria-label="Следующее изображение"
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                      <path d="M9 18l6-6-6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                    </svg>
                  </button>
                </>
              )}

              {/* Индикаторы точек */}
              {images.length > 1 && (
                <div className={styles.dotsContainer}>
                  {images.map((_, index) => (
                    <button
                      key={index}
                      className={`${styles.dot} ${index === currentImageIndex ? styles.activeDot : ''}`}
                      onClick={() => handleDotClick(index)}
                      aria-label={`Перейти к изображению ${index + 1}`}
                    />
                  ))}
                </div>
              )}
            </>
          ) : (
            <div className={styles.noImages}>
              <span>Скриншоты не найдены</span>
              <p>Добавьте изображения в папку проекта</p>
            </div>
          )}
        </div>

        {/* Технологии */}
        <div className={styles.modalTechStack}>
          {project.tech.map((tech) => (
            <span key={tech} className={styles.modalTech}>
              {tech}
            </span>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
};

// Карточка проекта
const ProjectCard = ({ 
  project, 
  index,
  onClick 
}: { 
  project: { 
    title: string; 
    description: string; 
    tech: string[]; 
    github: string;
    screenshots: string[];
  };
  index: number;
  onClick: () => void;
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
  const springX = useSpring(x, { stiffness: 100, damping: 30 });
  const springY = useSpring(y, { stiffness: 100, damping: 30 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const rotateX = (e.clientY - centerY) / 20;
    const rotateY = (centerX - e.clientX) / 20;
    x.set(rotateX);
    y.set(rotateY);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={cardRef}
      className={styles.projectCard}
      initial={{ opacity: 0, y: 50, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.6, delay: 0.2 + index * 0.15, ease: [0.4, 0, 0.2, 1] }}
      style={{ rotateX: springX, rotateY: springY }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      whileHover={{ y: -10 }}
      onClick={onClick}
    >
      {/* Сканирующая линия */}
      <div className={styles.scannerLine} />
      
      <div className={styles.cardHeader}>
        <h3 className={styles.projectTitle}>{project.title}</h3>
      </div>
      <p className={styles.description}>{project.description}</p>
      <div className={styles.techStack}>
        {project.tech.map((t, techIndex) => (
          <motion.span 
            key={t} 
            className={styles.tech}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: 0.5 + index * 0.15 + techIndex * 0.05 }}
            whileHover={{ scale: 1.1 }}
          >
            {t}
          </motion.span>
        ))}
      </div>
      <div className={styles.links}>
        <motion.a
          href={project.github}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.githubLink}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={(e) => e.stopPropagation()}
        >
          <span>GitHub</span>
        </motion.a>
      </div>
    </motion.div>
  );
};

export default function ProjectsPage() {
  const [selectedProject, setSelectedProject] = useState<typeof projects[0] | null>(null);
  
  const handleProjectClick = (project: typeof projects[0]) => {
    setSelectedProject(project);
    document.body.style.overflow = 'hidden';
  };

  const handleCloseModal = useCallback(() => {
    setSelectedProject(null);
    document.body.style.overflow = 'unset';
  }, []);

  // Закрытие по клавише Escape
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && selectedProject) {
        handleCloseModal();
      }
    };

    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [selectedProject, handleCloseModal]);

  return (
    <div className={styles.page}>
      <FloatingParticles />
      <GeometricShapes />
      
      <motion.div 
        className={styles.headerSection}
        initial={{ opacity: 0 }} 
        animate={{ opacity: 1 }} 
        transition={{ duration: 1 }}
      >
        <motion.h1 
          className={styles.title}
          initial={{ opacity: 0, y: -50 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.8, delay: 0.2, type: "spring", stiffness: 100 }}
        >
          Мои проекты
        </motion.h1>
        <motion.p 
          className={styles.subtitle}
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }} 
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          Реальные решения, которые были мной разработаны
        </motion.p>
      </motion.div>

      <div className={styles.projectsGrid}>
        {projects.map((project, index) => (
          <ProjectCard 
            key={project.id} 
            project={project} 
            index={index}
            onClick={() => handleProjectClick(project)}
          />
        ))}
      </div>

      {/* Модальное окно */}
      <AnimatePresence>
        {selectedProject && (
          <ProjectModal 
            project={selectedProject} 
            onClose={handleCloseModal} 
          />
        )}
      </AnimatePresence>
    </div>
  );
}