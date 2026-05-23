'use client';


import styles from './footer.module.css';
import vk from '../../../public/images/vk.png'
import github from '../../../public/images/github.png'

const Footer = () => {
  const currentYear = new Date().getFullYear();
  return (
    <footer className={styles.footer}>
      <div className={styles.links}>
          <h4>Социальные сети</h4>
          <ul className={styles.VkAndGit}>
            <a href="https://github.com/ingwar888" target="_blank" rel="noopener noreferrer"><img src={github} alt="" className={styles.GitHub}/></a>
            <a href="https://m.vk.com/ing.war888" target="_blank" rel="noopener noreferrer"><img src={vk} alt="" className={styles.Vkontakte}/></a>
          </ul>
      </div>
      <div className={styles.bottomSection}>
          <div>
            © {currentYear} Popenko.ru Все права защищены.
          </div>
      </div>
      <div className={styles.contacts}>
          <h4>Контакты</h4>
          <ul>
            <a href="mailto:p0penko.igor@yandex.ru">p0penko.igor@yandex.ru</a>
            <a href="#">+7 (901) 088-28-65</a>
          </ul>
      </div>
    </footer>
  );
};

export default Footer;