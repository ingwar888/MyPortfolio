'use client';

import { motion } from 'framer-motion';
import styles from './skillpage.module.css';

const skills = {
  languages: [
    { name: 'C#', level: 90, icon: '' },
    { name: 'C++', level: 80, icon: '' },
    { name: 'Python', level: 50, icon: '' },
    { name: 'GO', level: 15, icon: '' },
    { name: 'HTML', level: 75, icon: '' },
    { name: 'CSS', level: 75, icon: '' },
    { name: 'JavaScript', level: 75, icon: '' },
    { name: 'TypeScript', level: 75, icon: '' },
    { name: 'SQL', level: 75, icon: '' },
  ],
  frameworks: [
    { name: '.NET / ADO.NET', level: 80, icon: '' },
    { name: 'Entity Framework', level: 90, icon: '' },
    { name: 'ASP.NET', level: 25, icon: '' },
    { name: 'Next.js', level: 35, icon: ''}
  ],
  tools: [
    { name: 'Git / GitHub', level: 70, icon: '' },
    { name: 'Visual Studio / Code', level: 90, icon: '' },
    { name: 'DB Browser', level: 75, icon: '' },
    { name: 'Microsoft SQL Server', level: 60, icon: '' },
    { name: 'StarUML', level: 80, icon: '' },
  ],
  databases: [
    { name: 'SQLite', level: 70, icon: '' },
    { name: 'MS SQL Server', level: 90, icon: '' },
    { name: 'Postgre', level: 75, icon: '' },
    { name: 'MySQL', level: 60, icon: '' },
    { name: 'Oracle Database', level: 80, icon: '' },
  ],
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const cardVariants = {
  hidden: { y: 40, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { duration: 0.4 } },
};

export default function SkillPage() {
  return (
    <div className={styles.page}>
      <div className={styles.hero}>
        <h1 className={styles.title}>Мои навыки</h1>
        <p className={styles.subtitle}>Технологии, которые я использую ежедневно</p>
      </div>

      <motion.div
        className={styles.skillsGrid}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div className={styles.category} variants={cardVariants}>
          <h2 className={styles.categoryTitle}>Языки</h2>
          {skills.languages.map((skill) => (
            <div key={skill.name} className={styles.skillItem}>
              <div className={styles.skillHeader}>
                <span className={styles.skillIcon}>{skill.icon}</span>
                <span className={styles.skillName}>{skill.name}</span>
                <span className={styles.skillPercent}>{skill.level}%</span>
              </div>
              <div className={styles.progressBar}>
                <div
                  className={styles.progressFill}
                  style={{ width: `${skill.level}%` }}
                />
              </div>
            </div>
          ))}
        </motion.div>

        <motion.div className={styles.category} variants={cardVariants}>
          <h2 className={styles.categoryTitle}>Фреймворки</h2>
          {skills.frameworks.map((skill) => (
            <div key={skill.name} className={styles.skillItem}>
              <div className={styles.skillHeader}>
                <span className={styles.skillIcon}>{skill.icon}</span>
                <span className={styles.skillName}>{skill.name}</span>
                <span className={styles.skillPercent}>{skill.level}%</span>
              </div>
              <div className={styles.progressBar}>
                <div
                  className={styles.progressFill}
                  style={{ width: `${skill.level}%` }}
                />
              </div>
            </div>
          ))}
        </motion.div>

        <motion.div className={styles.category} variants={cardVariants}>
          <h2 className={styles.categoryTitle}>Инструменты</h2>
          {skills.tools.map((skill) => (
            <div key={skill.name} className={styles.skillItem}>
              <div className={styles.skillHeader}>
                <span className={styles.skillIcon}>{skill.icon}</span>
                <span className={styles.skillName}>{skill.name}</span>
                <span className={styles.skillPercent}>{skill.level}%</span>
              </div>
              <div className={styles.progressBar}>
                <div
                  className={styles.progressFill}
                  style={{ width: `${skill.level}%` }}
                />
              </div>
            </div>
          ))}
        </motion.div>
          <motion.div className={styles.category} variants={cardVariants}>
            <h2 className={styles.categoryTitle}>СУБД</h2>
            {skills.databases.map((skill) => (
              <div key={skill.name} className={styles.skillItem}>
                <div className={styles.skillHeader}>
                  <span className={styles.skillIcon}>{skill.icon}</span>
                  <span className={styles.skillName}>{skill.name}</span>
                  <span className={styles.skillPercent}>{skill.level}%</span>
                </div>
                <div className={styles.progressBar}>
                  <div
                    className={styles.progressFill}
                    style={{ width: `${skill.level}%` }}
                  />
                </div>
              </div>
            ))}
          </motion.div>
      </motion.div>
    </div>
  );
}