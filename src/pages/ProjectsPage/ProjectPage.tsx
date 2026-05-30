'use client';

import { motion, useMotionValue, useSpring } from 'framer-motion';
import { useEffect, useState, useRef } from 'react';
import styles from './projectpage.module.css';

const projects = [
  {
    title: '"Узел" - приложение по контролю наличия оборудования',
    description: 'Написано на C# c использованием Entity Framework и базой данных SQLite',
    tech: ['C#', 'Entity Framework','SQLite','Windows Forms','Visual Studio 2022'],
    github: 'https://github.com/ingwar888/NODE_app_v.1.0',
  },
  {
    title: '"Викторина" - игра - приложение',
    description: 'Моё первое консольное приложение, написанное на C++ с использованием различных инструментов (библиотек (Windows.h), функций, условных операторов и др.)',
    tech: ['С++', 'Visual Studio 2022'],
    github: 'https://github.com/ingwar888/Victorina-Game',
  },
  {
    title: 'Текстовый редактор',
    description: 'Прикладное приложение для удобной работы с текстом, написанное на C# и использующее Windows Forms',
    tech: ['C#', 'Windows Forms','Visual Studio 2022'],
    github: 'https://github.com/ingwar888/Text-editor-v1',
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

// Карточка проекта
const ProjectCard = ({ 
  project, 
  index 
}: { 
  project: { title: string; description: string; tech: string[]; github: string };
  index: number;
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
        >
          <span>GitHub</span>
        </motion.a>
      </div>
    </motion.div>
  );
};

export default function ProjectsPage() {
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
          <ProjectCard key={project.title} project={project} index={index} />
        ))}
      </div>
    </div>
  );
}