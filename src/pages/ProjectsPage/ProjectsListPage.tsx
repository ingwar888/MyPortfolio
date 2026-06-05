import { motion } from 'framer-motion';
import PageMeta from '../../components/Seo/PageMeta';
import { projects } from '../../entities/projects/projectsData';
import { seoPages } from '../../entities/seo/seoConfig';
import ProjectCard from '../../widgets/ProjectCard/ProjectCard';
import { FloatingParticles, GeometricShapes } from './ProjectPageBackground';
import styles from './projectpage.module.css';

export default function ProjectsListPage() {
  return (
    <div className={styles.page}>
      <PageMeta
        title={seoPages.projects.title}
        description={seoPages.projects.description}
        path={seoPages.projects.path}
        keywords={seoPages.projects.keywords}
      />
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
          transition={{ duration: 0.8, delay: 0.2, type: 'spring', stiffness: 100 }}
        >
          Проектная работа
        </motion.h1>
        <motion.p
          className={styles.subtitle}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          Перечень приложений: от создания проекта до готового решения на C#
        </motion.p>
      </motion.div>

      <div className={styles.projectsGrid}>
        {projects.map((project, index) => (
          <ProjectCard key={project.id} project={project} index={index} />
        ))}
      </div>
    </div>
  );
}
