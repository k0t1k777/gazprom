import { TeamsProps } from 'src/services/types';
import styles from 'src/ui/TeamsItem/TeamsItem.module.scss';

export default function TeamsItem({ name, projects }: TeamsProps) {
  return (
    <div className={styles.teamsItem}>
      <p className={styles.title}>{name}</p>
      {projects &&
        projects.map((item) => (
          <p key={item.id} className={`${styles.text} ${styles.text_link}`}>
            {item.name}
          </p>
        ))}
    </div>
  );
}
