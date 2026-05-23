'use client';

import { motion } from 'framer-motion';
import styles from './contactspage.module.css';
import github from '../../../public/images/github.png'
import vk from '../../../public/images/vk.png'

const contacts = [
  {
    type: 'Email',
    value: 'p0penko.igor@yandex.ru',
    link: 'mailto:your.email@example.com',
    icon: '✉️',
  },
  {
    type: 'GitHub',
    value: 'ingwar888',
    link: 'https://github.com/ingwar888',
    icon: <img src={github} alt="" className={styles.GitHubS}/>,
  },
  {
    type: 'VKontakte',
    value: 'ing.war888',
    link: 'https://m.vk.com/ing.war888',
    icon: <img src={vk} alt="" className={styles.Vkontakte}/>,
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 },
  },
};

const cardVariants = {
  hidden: { scale: 0.9, opacity: 0 },
  visible: { scale: 1, opacity: 1, transition: { duration: 0.4 } },
};

export default function ContactsPage() {
  return (
    <div className={styles.page}>
      <div className={styles.hero}>
        <h1 className={styles.title}>Свяжитесь со мной</h1>
        <p className={styles.subtitle}>
          Всегда открыт для новых идей и предложений
        </p>
      </div>

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
            whileHover={{ y: -8, scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <span className={styles.contactIcon}>{contact.icon}</span>
            <h3 className={styles.contactType}>{contact.type}</h3>
            <p className={styles.contactValue}>{contact.value}</p>
            <span className={styles.arrow}>→</span>
          </motion.a>
        ))}
      </motion.div>

      <div className={styles.extraNote}>
        <p>Или напишите мне прямо сейчас — отвечу в течение дня!</p>
      </div>
    </div>
  );
}