'use client';

import { motion } from 'framer-motion';
import styles from './aboutpage.module.css';

export default function AboutPage() {
  return (
    <div className={styles.page}>
      <div className={styles.bgOrb} />
      <div className={styles.bgOrb2} />

      <div className={styles.container}>
        <motion.div
          className={styles.photoColumn}
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
        >
          <div className={styles.photoGlow}>
            <div className={styles.photoFrame}>
              <img
                src="/images/FinalMyPhoto.jpg"
                alt="Моё фото"
                className={styles.photo}
              />
              <div className={styles.photoShine} />
            </div>
            <div className={styles.decoLine1} />
            <div className={styles.decoLine2} />
          </div>
        </motion.div>

        <motion.div
          className={styles.content}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.2, ease: 'easeOut' }}
        >
          <div className={styles.label}>
            <span className={styles.labelDot} />
            <span>Кто я</span>
          </div>
          <h1 className={styles.title}>
            Обо <span className={styles.gold}>мне</span>
          </h1>

          <div className={styles.bio}>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              Привет! Меня зовут Игорь. Я{' '}
              <strong className={styles.highlight}>
                backend-разработчик
              </strong>{' '}
              с опытом создания надёжных и масштабируемых систем на{' '}
              <strong>C# / .NET</strong> и на других инструментах.
            </motion.p>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
            >
              Люблю чистую архитектуру, высокую производительность и элегантные
              решения сложных задач. Постоянно учусь новому и применяю лучшие
              практики в учебной и коммерческой разработке.
            </motion.p>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.5 }}
            >
              За пределами кода — увлекаюсь спортом, чтением классической и технической
              литературы и прохождением видеоигр.
            </motion.p>
          </div>

          <motion.div
            className={styles.quote}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.6, duration: 0.4 }}
          >
            <span className={styles.quoteIcon}>“</span>
            <p>Код — это поэзия, написанная для машин и людей.</p>
          </motion.div>

          <div className={styles.divider} />
        </motion.div>
      </div>
    </div>
  );
}