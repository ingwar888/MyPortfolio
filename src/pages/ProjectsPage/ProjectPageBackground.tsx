import { useEffect, useState } from 'react';
import styles from './projectpage.module.css';

export function FloatingParticles() {
  const [particles, setParticles] = useState<
    Array<{
      left: number;
      size: number;
      duration: number;
      delay: number;
      color: string;
    }>
  >([]);

  useEffect(() => {
    const colors = ['#702cbe', '#ffd700', '#f5a623', '#0078D4'];
    setParticles(
      Array.from({ length: 40 }, () => ({
        left: Math.random() * 100,
        size: 1 + Math.random() * 3,
        duration: 8 + Math.random() * 20,
        delay: Math.random() * 15,
        color: colors[Math.floor(Math.random() * colors.length)],
      })),
    );
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
}

export function GeometricShapes() {
  return (
    <div className={styles.geometricShapes}>
      <div className={styles.shape} />
      <div className={styles.shape} />
      <div className={styles.shape} />
    </div>
  );
}
