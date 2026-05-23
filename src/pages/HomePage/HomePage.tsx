'use client';

import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import styles from './homepage.module.css';

// Параметры частиц
const PARTICLE_COUNT = 20;
const GOLD_COLORS = ['#FFD700', '#F5A623', '#7d44be', '#7700ff'];

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  color: string;
}

export default function HomePage() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const animationFrameRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Инициализация частиц
    const particles: Particle[] = [];
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        radius: Math.random() * 1.5 + 0.5,
        color: GOLD_COLORS[Math.floor(Math.random() * GOLD_COLORS.length)],
      });
    }
    particlesRef.current = particles;

    // Анимация
    const animate = () => {
      ctx.clearRect(0, 0, width, height);
      particlesRef.current.forEach((p) => {
        // Обновление позиции
        p.x += p.vx;
        p.y += p.vy;

        // Зацикливание по краям
        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        // Отрисовка частицы с мягким свечением
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.shadowBlur = 6;
        ctx.shadowColor = p.color;
        ctx.fill();
      });
      animationFrameRef.current = requestAnimationFrame(animate);
    };
    animate();

    // Ресайз
    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      // Перераспределяем частицы по новому размеру
      particlesRef.current.forEach((p) => {
        p.x = Math.min(p.x, width);
        p.y = Math.min(p.y, height);
      });
    };
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationFrameRef.current);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Анимационные настройки для контейнера и дочерних элементов
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.3 },
    },
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.6, ease: 'easeOut' as const },
    },
  };

  return (
    <div className={styles.page}>
      {/* Canvas фон */}
      <canvas ref={canvasRef} className={styles.canvas} />

      {/* Контент */}
      <motion.div
        className={styles.content}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div className={styles.badge} variants={itemVariants}>
          <span className={styles.badgeText}>C# - .NET - ADO.NET - Entity</span>
        </motion.div>

        <motion.h1
          className={`${styles.title} ${styles.shimmerTitle}`}
          variants={itemVariants}
        >
          Создаю надёжные
          <br />
          backend-решения
        </motion.h1>

        <motion.p className={styles.subtitle} variants={itemVariants}>
          Разработчик C# с фокусом на производительность, чистую архитектуру
          и впечатляющий пользовательский опыт. Превращаю сложные задачи в элегантный код.
        </motion.p>

        <motion.div className={styles.buttonGroup} variants={itemVariants}>
          <motion.button
            className={styles.primaryButton}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
          >
            <a href="/projects" className={styles.ForLinkText}>Мои проекты</a>
          </motion.button>

          <motion.button
            className={styles.secondaryButton}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
          >
            <a href="/contact" className={styles.ForLinkTextC}>Связаться</a>
          </motion.button>
        </motion.div>
      </motion.div>
    </div>
  );
}