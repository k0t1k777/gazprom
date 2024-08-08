import styles from 'src/pages/NotFound/NotFound.module.scss';

export default function NotFound() {
  return (
    <div className={styles.notFound}>
      <p className={styles.title}>Страница не найдена</p>
    </div>
  );
}
