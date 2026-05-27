'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import styles from './contactspage.module.css';
import github from '../../../public/images/github.png'
import vk from '../../../public/images/vk.png'

const contacts = [
  {
    type: 'Email',
    value: 'p0penko.igor@yandex.ru',
    link: 'mailto:your.email@example.com',
    icon: '✉️',
    chatMessages: [
      { text: 'Привет! ✋', type: 'received' },
      { text: 'Есть идея для проекта', type: 'received' },
      { text: 'Отправить письмо? 📧', type: 'sent' },
      { text: 'Да, конечно!', type: 'received' },
      { text: 'Жду твой email ✉️', type: 'sent' },
      { text: 'Уже пишу...', type: 'received' },
    ],
    typewriterText: 'Написать письмо...',
    typingLabel: '✉️ Печатает...',
  },
  {
    type: 'GitHub',
    value: 'ingwar888',
    link: 'https://github.com/ingwar888',
    icon: <img src={github} alt="GitHub" className={styles.GitHubS} />,
    chatMessages: [
      { text: 'Смотрел твой код 💻', type: 'received' },
      { text: 'Очень круто! ⭐', type: 'received' },
      { text: 'Спасибо! Буду рад коллабе', type: 'sent' },
      { text: 'Го сделаем проект 🚀', type: 'received' },
      { text: 'Я за! Пиши в личку', type: 'sent' },
      { text: 'Уже форкаю репу 🔀', type: 'received' },
    ],
    typewriterText: 'git push origin...',
    typingLabel: '💻 Коммитит...',
  },
  {
    type: 'VKontakte',
    value: 'ing.war888',
    link: 'https://m.vk.com/ing.war888',
    icon: <img src={vk} alt="VKontakte" className={styles.Vkontakte} />,
    chatMessages: [
      { text: 'Здарова! 🤝', type: 'received' },
      { text: 'Как дела?', type: 'received' },
      { text: 'Отлично! Работаю', type: 'sent' },
      { text: 'Что по проектам?', type: 'received' },
      { text: 'Есть пару идей 💡', type: 'sent' },
      { text: 'Давай обсудим в лс', type: 'received' },
    ],
    typewriterText: 'Печатает сообщение...',
    typingLabel: '💬 Набирает текст...',
  },
];

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
    const colors = ['#702cbe', '#ffd700', '#f5a623', '#0078D4'];
    const newParticles = Array.from({ length: 40 }, () => ({
      left: Math.random() * 100,
      size: 1 + Math.random() * 3,
      duration: 8 + Math.random() * 20,
      delay: Math.random() * 15,
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

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 },
  },
};

const cardVariants = {
  hidden: { scale: 0.9, opacity: 0, y: 30 },
  visible: { 
    scale: 1, 
    opacity: 1, 
    y: 0,
    transition: { 
      duration: 0.5,
      ease: [0.4, 0, 0.2, 1]
    } 
  },
};

export default function ContactsPage() {
  return (
    <div className={styles.page}>
      <FloatingParticles />
      <GeometricShapes />

      <motion.div 
        className={styles.hero}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <h1 className={styles.title}>Свяжитесь со мной</h1>
        <p className={styles.subtitle}>
          Всегда открыт для новых идей и предложений
        </p>
      </motion.div>

      <motion.div
        className={styles.contactsGrid}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {contacts.map((contact) => (
          <motion.a
            key={contact.type}
            href={contact.link}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.contactCard}
            variants={cardVariants}
            whileHover={{ y: -10 }}
            whileTap={{ scale: 0.98 }}
          >
            {/* Чат на фоне */}
            <div className={styles.chatBackground}>
              {contact.chatMessages.map((msg, index) => (
                <div 
                  key={index} 
                  className={`${styles.chatMessage} ${msg.type === 'received' ? styles.received : styles.sent}`}
                >
                  {msg.text}
                </div>
              ))}
            </div>

            {/* Печатная машинка */}
            <div className={styles.typewriter}>
              {contact.typewriterText}
            </div>

            {/* Печатающийся текст */}
            <div className={styles.typingText}>
              {contact.typingLabel}
            </div>

            {/* Точки соединения */}
            <div className={styles.connectionLines}>
              {[...Array(5)].map((_, index) => (
                <div key={index} className={styles.connectionDot} />
              ))}
            </div>

            {/* Цифровые волны */}
            <div className={styles.digitalWave}>
              {[...Array(10)].map((_, index) => (
                <div key={index} className={styles.waveBar} />
              ))}
            </div>

            <motion.span 
              className={styles.contactIcon}
              whileHover={{ 
                scale: 1.2,
                rotate: [0, -10, 10, -10, 0],
                transition: { duration: 0.5 }
              }}
            >
              {contact.icon}
            </motion.span>
            <h3 className={styles.contactType}>{contact.type}</h3>
            <p className={styles.contactValue}>{contact.value}</p>
            <motion.span 
              className={styles.arrow}
              animate={{ x: [0, 5, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              →
            </motion.span>
          </motion.a>
        ))}
      </motion.div>

      <motion.div 
        className={styles.extraNote}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.8 }}
      >
        <p>Или напишите мне прямо сейчас — отвечу в течение дня!</p>
      </motion.div>
    </div>
  );
}