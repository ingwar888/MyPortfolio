'use client';


import styles from './footer.module.css';
import vk from '../../../public/images/vk.png'
import github from '../../../public/images/github.png'

const Footer = () => {
  const currentYear = new Date().getFullYear();
  return (
    <footer className={styles.footer}>
      <div className={styles.links}>
          <h4>GitHub и ВКонтакте</h4>
          <ul className={styles.VkAndGit}>
            <a href="https://github.com/ingwar888" target="_blank" rel="noopener noreferrer"><img src={github} alt="Профиль разработчика Игоря на GitHub (гитхаб)" className={styles.GitHub}/></a>
            <a href="https://m.vk.com/ing.war888" target="_blank" rel="noopener noreferrer"><img src={vk} alt="Игорь во ВКонтакте" className={styles.Vkontakte}/></a>
          </ul>
      </div>
      <div className={styles.bottomSection}>
          <div>
            © {currentYear} Popenko.ru Все права защищены.
          </div>
      </div>
      <div className={styles.contacts}>
          <h4>На связи — mail</h4>
          <ul>
            <a href="mailto:p0penko.igor@yandex.ru">p0penko.igor@yandex.ru (mail)</a>
            <a href="#">+7 (901) 088-28-65</a>
          </ul>
      </div>
    </footer>
  );
};

export default Footer;