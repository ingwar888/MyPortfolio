import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';
import PageMeta from '../../components/Seo/PageMeta';
import { getProjectBySlug } from '../../entities/projects/projectsData';
import { FloatingParticles, GeometricShapes } from './ProjectPageBackground';
import styles from './projectpage.module.css';

export default function ProjectDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const project = getProjectBySlug(slug);

  if (!project) {
    return <Navigate to="/projects" replace />;
  }

  const seoDescription = project.seoDescription ?? project.description;
  const ogImage = project.screenshots[0];
  const projectKeywords: Record<string, string> = {
    'node-app': 'приложение, база данных, игорь, разработчик, проектная, решение',
    'victorina-game': 'викторина, приложение, игорь, разработчик, проектная',
    'text-editor': 'текстовый редактор, приложение, игорь, разработчик, проектная',
  };

  return (
    <div className={styles.page}>
      <PageMeta
        title={project.title}
        description={seoDescription}
        image={ogImage}
        path={`/projects/${project.id}`}
        keywords={projectKeywords[project.id] ?? 'приложение, игорь, разработчик, проектная'}
      />
      <FloatingParticles />
      <GeometricShapes />

      <div className={styles.detailContainer}>
        <Link to="/projects" className={styles.backLink}>
          ← Все проекты
        </Link>

        <motion.article
          className={styles.detailContent}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <header className={styles.detailHeader}>
            <h1 className={styles.detailTitle}>{project.title}</h1>
            <p className={styles.detailDescription}>{project.description}</p>
          </header>

          <ProjectSlideshow screenshots={project.screenshots} title={project.title} />

          <div className={styles.detailTechStack}>
            {project.tech.map((tech) => (
              <span key={tech} className={styles.detailTech}>
                {tech}
              </span>
            ))}
          </div>

          <div className={styles.detailActions}>
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.githubLink}
            >
              <span>Открыть на GitHub</span>
            </a>
          </div>
        </motion.article>
      </div>
    </div>
  );
}

function ProjectSlideshow({
  screenshots,
  title,
}: {
  screenshots: string[];
  title: string;
}) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [images, setImages] = useState<string[]>([]);
  const [imageErrors, setImageErrors] = useState<Set<number>>(new Set());
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    const checkImages = async () => {
      const validImages: string[] = [];

      for (const screenshot of screenshots) {
        try {
          const response = await fetch(screenshot, { method: 'HEAD' });
          if (response.ok) {
            validImages.push(screenshot);
          }
        } catch {
          // skip broken image
        }
      }

      setImages(validImages);
      setCurrentImageIndex(0);
      setImageErrors(new Set());
    };

    checkImages();
  }, [screenshots]);

  useEffect(() => {
    if (images.length <= 1) return;

    intervalRef.current = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % images.length);
    }, 3000);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [images.length]);

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

  const handlePrevImage = () => {
    setCurrentImageIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
    resetInterval();
  };

  const handleNextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
    resetInterval();
  };

  const handleDotClick = (index: number) => {
    setCurrentImageIndex(index);
    resetInterval();
  };

  const handleImageError = (index: number) => {
    setImageErrors((prev) => new Set(prev).add(index));
  };

  return (
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
                transition={{ duration: 0.5, ease: 'easeInOut' }}
              >
                {!imageErrors.has(currentImageIndex) ? (
                  <img
                    src={images[currentImageIndex]}
                    alt={`${title} — скриншот ${currentImageIndex + 1}`}
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

          {images.length > 1 && (
            <>
              <button
                type="button"
                className={`${styles.navButton} ${styles.prevButton}`}
                onClick={handlePrevImage}
                aria-label="Предыдущее изображение"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
                  <path
                    d="M15 18l-6-6 6-6"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>
              </button>
              <button
                type="button"
                className={`${styles.navButton} ${styles.nextButton}`}
                onClick={handleNextImage}
                aria-label="Следующее изображение"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
                  <path
                    d="M9 18l6-6-6-6"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>
              </button>

              <div className={styles.dotsContainer}>
                {images.map((_, index) => (
                  <button
                    key={index}
                    type="button"
                    className={`${styles.dot} ${index === currentImageIndex ? styles.activeDot : ''}`}
                    onClick={() => handleDotClick(index)}
                    aria-label={`Перейти к изображению ${index + 1}`}
                  />
                ))}
              </div>
            </>
          )}
        </>
      ) : (
        <div className={styles.noImages}>
          <span>Скриншоты не найдены</span>
          <p>Добавьте изображения в папку проекта</p>
        </div>
      )}
    </div>
  );
}
