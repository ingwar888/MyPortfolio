import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { motion} from 'framer-motion';
import type { LinkType } from '../../../entities/navigationlinks/navigationlink.type';
import style from './navigation.module.css';

interface LinkProps {
  links: LinkType[];
}

// Варианты анимации для списка ссылок
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: -10 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' as const } },
};

const Navigation: React.FC<LinkProps> = ({ links }) => {
  const location = useLocation();

  return (
    <nav className={style.nav}>
      <motion.ul
        className={style.navList}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {links.map((item) => {
          const isActive =
            location.pathname === item.link ||
            (item.link === '/projects' && location.pathname.startsWith('/projects/'));
          return (
            <motion.li
              key={item.id}
              className={style.navItem}
              variants={itemVariants}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
            >
              <NavLink
                to={item.link}
                className={`${style.navLink} ${isActive ? style.active : ''}`}
              >
                {item.title}
                {isActive && (
                  <motion.span
                    className={style.activeIndicator}
                    layoutId="underline"
                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                  />
                )}
              </NavLink>
            </motion.li>
          );
        })}
      </motion.ul>
    </nav>
  );
};

export default Navigation;