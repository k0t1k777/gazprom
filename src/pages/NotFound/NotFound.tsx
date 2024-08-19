import { Button } from 'antd/es/radio';
import { Link } from 'react-router-dom';
import styles from 'src/pages/NotFound/NotFound.module.scss';

export default function NotFound() {
  return (
    <section className={styles.notFound}>
      <p className={styles.title}>404 Ошибка</p>
      <p className={styles.text}>Страница, которую вы ищете, не существует</p>
      <Link to='./' className={styles.link}>
        <Button className={styles.button}>На главную</Button>
      </Link>
    </section>
  );
}
