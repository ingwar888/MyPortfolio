'use client';

import { motion } from 'framer-motion';
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

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 },
  },
};

const projectVariants = {
  hidden: { y: 50, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { duration: 0.5 } },
};

export default function ProjectsPage() {
  return (
    <div className={styles.page}>
      <div className={styles.headerSection}>
        <motion.h1 className={`${styles.title} ${styles.shimmerTitle}`}>Мои проекты</motion.h1>
        <p className={styles.subtitle}>
          Реальные решения, которые я разработал
        </p>
      </div>

      <motion.div
        className={styles.projectsGrid}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {projects.map((project) => (
          <motion.div
            key={project.title}
            className={styles.projectCard}
            variants={projectVariants}
            whileHover={{ y: -10 }}
          >
            <div className={styles.cardHeader}>
              <h3 className={styles.projectTitle}>{project.title}</h3>
            </div>
            <p className={styles.description}>{project.description}</p>
            <div className={styles.techStack}>
              {project.tech.map((t) => (
                <span key={t} className={styles.tech}>
                  {t}
                </span>
              ))}
            </div>
            <div className={styles.links}>
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.githubLink}
              >
                <span>GitHub</span>
              </a>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}