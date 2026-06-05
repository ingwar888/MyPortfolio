import { motion, useMotionValue, useSpring } from 'framer-motion';
import { useRef } from 'react';
import { Link } from 'react-router-dom';
import type { Project } from '../../entities/projects/project.type';
import styles from '../../pages/ProjectsPage/projectpage.module.css';

type ProjectCardProps = {
  project: Project;
  index: number;
};

export default function ProjectCard({ project, index }: ProjectCardProps) {
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
      <div className={styles.scannerLine} />

      <Link to={`/projects/${project.id}`} className={styles.cardLink}>
        <div className={styles.cardHeader}>
          <h2 className={styles.projectTitle}>{project.title}</h2>
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
        <span className={styles.viewProject}>Подробнее о приложении →</span>
      </Link>

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
}
