'use client';

import { motion, useMotionValue, useSpring } from 'framer-motion';
import { useEffect, useState, useRef } from 'react';
import styles from './skillpage.module.css';

const skills = {
  languages: [
    { name: 'C#', level: 85, icon: '#>', color: '#cc40c3' },
    { name: 'C++', level: 80, icon: '++', color: '#3e9be2' },
    { name: 'Python', level: 40, icon: 'def', color: '#924dec' },
    { name: 'GO', level: 15, icon: '>>', color: '#00ADD8' },
    { name: 'HTML', level: 55, icon: '</>', color: '#E34F26' },
    { name: 'CSS', level: 75, icon: '#.', color: '#27a0f7' },
    { name: 'JavaScript', level: 25, icon: '()=>', color: '#F7DF1E' },
    { name: 'TypeScript', level: 25, icon: '<>', color: '#1e86f7' },
    { name: 'SQL', level: 80, icon: '[]', color: '#CC2927' },
  ],
  frameworks: [
    { name: '.NET / ADO.NET', level: 80, icon: '.N', color: '#2aa1e6' },
    { name: 'Entity Framework', level: 90, icon: 'EF', color: '#924dec' },
    { name: 'ASP.NET', level: 25, icon: 'AS', color: '#F7DF1E' },
    { name: 'Next.js', level: 35, icon: 'NX', color: '#FF6B6B' }
  ],
  tools: [
    { name: 'Git / GitHub', level: 50, icon: '$>', color: '#F05032' },
    { name: 'Visual Studio', level: 95, icon: '>_', color: '#924dec' },
    { name: 'DB Browser', level: 75, icon: '=>', color: '#2aa1e6' },
    { name: 'MS SQL Server', level: 60, icon: '|>', color: '#F7DF1E' },
    { name: 'StarUML', level: 80, icon: '#>', color: '#FF6B6B' },
  ],
  databases: [
    { name: 'SQLite', level: 90, icon: 'SL', color: '#FF6B6B' },
    { name: 'Microsoft SQL', level: 80, icon: 'MS', color: '#F7DF1E' },
    { name: 'PostgreSQL', level: 25, icon: 'PG', color: '#924dec' },
    { name: 'MySQL', level: 25, icon: 'MY', color: '#57a5e0' },
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

// Эффект 1: Код на C#
const CSharpCodeEffect = () => {
  const codeLines = [
    { text: '<span class="keyword">using</span> <span class="className">System</span>;', type: 'code' },
    { text: '<span class="keyword">using</span> <span class="className">System.Linq</span>;', type: 'code' },
    { text: '', type: 'empty' },
    { text: '<span class="keyword">namespace</span> <span class="className">MyApp</span>', type: 'code' },
    { text: '{', type: 'bracket' },
    { text: '  <span class="keyword">public class</span> <span class="className">Program</span>', type: 'code' },
    { text: '  {', type: 'bracket' },
    { text: '    <span class="keyword">static void</span> <span class="method">Main</span>()', type: 'code' },
    { text: '    {', type: 'bracket' },
    { text: '      <span class="comment">// TODO: Add logic</span>', type: 'comment' },
  ];

  return (
    <div className={styles.codeBackground}>
      {codeLines.map((line, index) => (
        <div 
          key={index} 
          className={styles.codeLine}
          dangerouslySetInnerHTML={{ __html: line.text || '&nbsp;' }}
        />
      ))}
    </div>
  );
};

// Эффект 2: Проект ASP.NET
const AspNetProjectEffect = () => {
  return (
    <div className={styles.projectBackground}>
      <div className={styles.projectStructure}>
        <div className={styles.projectFile}>
          <span className={styles.folder}>📁 Controllers/</span>
        </div>
        <div className={styles.projectFile}>
          <span className={styles.file}>  ├── HomeController</span><span className={styles.fileExt}>.cs</span>
        </div>
        <div className={styles.projectFile}>
          <span className={styles.file}>  ├── ApiController</span><span className={styles.fileExt}>.cs</span>
        </div>
        <div className={styles.projectFile}>
          <span className={styles.folder}>📁 Models/</span>
        </div>
        <div className={styles.projectFile}>
          <span className={styles.file}>  ├── UserModel</span><span className={styles.fileExt}>.cs</span>
        </div>
        <div className={styles.projectFile}>
          <span className={styles.folder}>📁 Views/</span>
        </div>
        <div className={styles.projectFile}>
          <span className={styles.file}>  ├── Index</span><span className={styles.fileExt}>.cshtml</span>
        </div>
        <div className={styles.projectFile}>
          <span className={styles.file}>  └── _Layout</span><span className={styles.fileExt}>.cshtml</span>
        </div>
      </div>
      <div className={styles.buildingBadge}>● Building...</div>
    </div>
  );
};

// Эффект 3: Git/GitHub
const GitWorkEffect = () => {
  return (
    <div className={styles.gitBackground}>
      <div className={styles.terminal}>
        <div className={styles.terminalLine}>
          <span className={styles.prompt}>$ </span>
          <span className={styles.gitCommand}>git init</span>
        </div>
        <div className={styles.terminalLine}>
          <span className={styles.gitSuccess}>Initialized empty Git repository</span>
        </div>
        <div className={styles.terminalLine}>
          <span className={styles.prompt}>$ </span>
          <span className={styles.gitCommand}>git add .</span>
        </div>
        <div className={styles.terminalLine}>
          <span className={styles.prompt}>$ </span>
          <span className={styles.gitCommand}>git commit -m</span>
          <span className={styles.string}> "initial commit"</span>
        </div>
        <div className={styles.terminalLine}>
          <span className={styles.prompt}>$ </span>
          <span className={styles.gitCommand}>git branch</span>
        </div>
        <div className={styles.terminalLine}>
          <span className={styles.gitBranch}>* main</span>
        </div>
        <div className={styles.terminalLine}>
          <span className={styles.prompt}>$ </span>
          <span className={styles.gitCommand}>git push origin main</span>
        </div>
        <div className={styles.terminalLine}>
          <span className={styles.gitSuccess}>Everything up-to-date</span>
        </div>
      </div>
      <div className={styles.commitHash}>🔗 a1b2c3d</div>
    </div>
  );
};

// Эффект 4: SQL запросы
const SqlQueryEffect = () => {
  return (
    <div className={styles.databaseBackground}>
      <div className={styles.sqlCode}>
        <div className={styles.sqlLine}>
          <span className={styles.sqlKeyword}>SELECT</span> <span className={styles.sqlTable}>*</span>
        </div>
        <div className={styles.sqlLine}>
          <span className={styles.sqlKeyword}>FROM</span> <span className={styles.sqlTable}>users</span>
        </div>
        <div className={styles.sqlLine}>
          <span className={styles.sqlKeyword}>WHERE</span> <span className={styles.sqlTable}>age</span> {'>'} <span className={styles.sqlNumber}>18</span>
        </div>
        <div className={styles.sqlLine}>
          <span className={styles.sqlKeyword}>ORDER BY</span> <span className={styles.sqlTable}>name</span>
        </div>
        <div className={styles.sqlLine}>&nbsp;</div>
        <div className={styles.sqlLine}>
          <span className={styles.sqlKeyword}>INSERT INTO</span> <span className={styles.sqlTable}>users</span>
        </div>
        <div className={styles.sqlLine}>
          (<span className={styles.sqlTable}>name</span>, <span className={styles.sqlTable}>email</span>)
        </div>
        <div className={styles.sqlLine}>
          <span className={styles.sqlKeyword}>VALUES</span> (<span className={styles.sqlString}>'Igor'</span>, <span className={styles.sqlString}>'email@mail.ru'</span>)
        </div>
      </div>
      <div className={styles.tableIcon}>🗄️</div>
    </div>
  );
};

// Карточка категории
const SkillCategory = ({ 
  title, 
  skills, 
  delay,
  effectType 
}: { 
  title: string; 
  skills: Array<{ name: string; level: number; icon: string; color: string }>;
  delay: number;
  effectType: 'csharp' | 'aspnet' | 'git' | 'sql';
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

  const renderEffect = () => {
    switch (effectType) {
      case 'csharp':
        return <CSharpCodeEffect />;
      case 'aspnet':
        return <AspNetProjectEffect />;
      case 'git':
        return <GitWorkEffect />;
      case 'sql':
        return <SqlQueryEffect />;
      default:
        return null;
    }
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
      {/* Индивидуальный эффект */}
      {renderEffect()}

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
      <FloatingParticles />
      <GeometricShapes />

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
          effectType="csharp"
        />
        <SkillCategory 
          title="Фреймворки" 
          skills={skills.frameworks}
          delay={0.5}
          effectType="aspnet"
        />
        <SkillCategory 
          title="Инструменты" 
          skills={skills.tools}
          delay={0.7}
          effectType="git"
        />
        <SkillCategory 
          title="СУБД" 
          skills={skills.databases}
          delay={0.9}
          effectType="sql"
        />
      </div>
    </div>
  );
}