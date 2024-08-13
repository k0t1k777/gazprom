import styles from 'src/ui/ProjectsItem/ProjectsItem.module.scss';
import { ProjectseProps } from 'src/services/types';

export default function ProjectsItem({ name, teams }: ProjectseProps) {
  return (
    <div className={styles.projectsItem}>
      <p className={styles.title}>{name}</p>
      <div className={styles.mainContainer}>
        {teams &&
          teams.map((item) => (
            <p key={item.id} className={`${styles.text} ${styles.text_link}`}>
              {item.name}
            </p>
          ))}
        <p className={styles.text}>
          Опорное месторождение Ямальского центра газодобычи
        </p>
        <p className={styles.text}>с 2012 по 2028 гг.</p>
      </div>
    </div>
  );
}
