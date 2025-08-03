import styles from './Footer.module.css';

export const Footer: React.FC = () => {
  return (
    <footer id={styles['footer']}>
      <p>Martin Panov &copy; 2023</p>
    </footer>
  );
};