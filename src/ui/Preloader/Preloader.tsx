import styles from 'src/ui/Preloader/Preloader.module.scss';

export default function Preloader() {
  return (
    <div className={styles.preloader}>
      <div className={styles.preloader__overlay}></div>
      <div className={styles.preloader__loader}></div>
    </div>
  );
}
