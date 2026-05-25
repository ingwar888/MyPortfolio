'use client';

import { motion, useMotionValue, useSpring } from 'framer-motion';
import { useEffect, useState, useRef } from 'react';
import styles from './skillpage.module.css';

const skills = {
  languages: [
    { name: 'C#', level: 85, icon: '#>', color: '#9B4D96' },
    { name: 'C++', level: 80, icon: '++', color: '#00599C' },
    { name: 'Python', level: 40, icon: 'def', color: '#3776AB' },
    { name: 'GO', level: 15, icon: '>>', color: '#00ADD8' },
    { name: 'HTML', level: 55, icon: '</>', color: '#E34F26' },
    { name: 'CSS', level: 75, icon: '#.', color: '#1572B6' },
    { name: 'JavaScript', level: 25, icon: '()=>', color: '#F7DF1E' },
    { name: 'TypeScript', level: 25, icon: '<>', color: '#3178C6' },
    { name: 'SQL', level: 80, icon: '[]', color: '#CC2927' },
  ],
  frameworks: [
    { name: '.NET / ADO.NET', level: 80, icon: '.N', color: '#512BD4' },
    { name: 'Entity Framework', level: 90, icon: 'EF', color: '#512BD4' },
    { name: 'ASP.NET', level: 25, icon: 'AS', color: '#512BD4' },
    { name: 'Next.js', level: 35, icon: 'NX', color: '#000000' }
  ],
  tools: [
    { name: 'Git / GitHub', level: 50, icon: '$>', color: '#F05032' },
    { name: 'Visual Studio', level: 95, icon: '>_', color: '#5C2D91' },
    { name: 'DB Browser', level: 75, icon: '=>', color: '#4479A1' },
    { name: 'MS SQL Server', level: 60, icon: '|>', color: '#CC2927' },
    { name: 'StarUML', level: 80, icon: '#>', color: '#FF6B6B' },
  ],
  databases: [
    { name: 'SQLite', level: 90, icon: 'SL', color: '#003B57' },
    { name: 'Microsoft SQL', level: 80, icon: 'MS', color: '#CC2927' },
    { name: 'PostgreSQL', level: 25, icon: 'PG', color: '#336791' },
    { name: 'MySQL', level: 25, icon: 'MY', color: '#4479A1' },
    { name: 'Oracle', level: 20, icon: 'OR', color: '#F80000' },
  ],
};

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
    const colors = ['#702cbe', '#ffd700', '#f5a623', '#7d44be'];
    const newParticles = Array.from({ length: 50 }, () => ({
      left: Math.random() * 100,
      size: 1 + Math.random() * 3,
      duration: 5 + Math.random() * 15,
      delay: Math.random() * 10,
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

// Сканирующая линия
const ScanLine = () => {
  return <div className={styles.scanLine} />;
};

// Карточка категории с эффектом 3D-параллакса
const SkillCategory = ({ 
  title, 
  skills, 
  delay 
}: { 
  title: string; 
  skills: Array<{ name: string; level: number; icon: string; color: string }>;
  delay: number;
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
      className={styles.category}
      initial={{ opacity: 0, y: 50, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ 
        duration: 0.6, 
        delay,
        ease: [0.4, 0, 0.2, 1]
      }}
      style={{
        rotateX: springX,
        rotateY: springY,
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <h2 className={styles.categoryTitle}>{title}</h2>
      
      {skills.map((skill, index) => (
        <motion.div
          key={skill.name}
          className={styles.skillItem}
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ 
            duration: 0.4, 
            delay: delay + 0.1 + index * 0.05 
          }}
        >
          <div className={styles.skillHeader}>
            <div className={styles.skillInfo}>
              <span 
                className={styles.skillIcon}
                style={{ 
                  filter: `drop-shadow(0 0 5px ${skill.color})` 
                }}
              >
                {skill.icon}
              </span>
              <span className={styles.skillName}>{skill.name}</span>
            </div>
            <span 
              className={styles.skillLevel}
              style={{ color: skill.color }}
            >
              {skill.level}%
            </span>
          </div>
          <div className={styles.progressBar}>
            <motion.div
              className={styles.progressFill}
              initial={{ width: 0 }}
              animate={{ width: `${skill.level}%` }}
              transition={{ 
                duration: 1.2, 
                delay: delay + 0.3 + index * 0.05,
                ease: [0.4, 0, 0.2, 1]
              }}
              style={{
                background: `linear-gradient(90deg, ${skill.color}, #7d44be)`,
                boxShadow: `0 0 10px ${skill.color}`,
              }}
            />
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
};

export default function SkillPage() {
  return (
    <div className={styles.page}>
      {/* Фоновые эффекты */}
      <FloatingParticles />
      <GeometricShapes />
      <ScanLine />

      {/* Основной контент */}
      <motion.div
        className={styles.hero}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <motion.h1 
          className={styles.title}
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ 
            duration: 0.8, 
            delay: 0.2,
            type: "spring",
            stiffness: 100
          }}
        >
          Мои навыки
        </motion.h1>
        <motion.p 
          className={styles.subtitle}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          Стэк технологий, который я знаю и совершенствую
        </motion.p>
      </motion.div>

      <div className={styles.skillsGrid}>
        <SkillCategory 
          title="Языки" 
          skills={skills.languages}
          delay={0.3}
        />
        <SkillCategory 
          title="Фреймворки" 
          skills={skills.frameworks}
          delay={0.5}
        />
        <SkillCategory 
          title="Инструменты" 
          skills={skills.tools}
          delay={0.7}
        />
        <SkillCategory 
          title="СУБД" 
          skills={skills.databases}
          delay={0.9}
        />
      </div>
    </div>
  );
}