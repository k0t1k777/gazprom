import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import styles from 'src/pages/Profile/Profile.module.scss';

export default function Profile() {
  return (
    <div className={styles.profile}>
      <div className={styles.profileContainer}>
        <div className={styles.profileContainer}></div>
        <div className={styles.profileContainer}></div>
        <div className={styles.cobtainerButtons}>
        <EditOutlined />
        <DeleteOutlined />
        </div>

      </div>
      <div className={styles.profileContainer}>
        <div className={styles.profileContainer}></div>
        <div className={styles.profileContainer}></div>
      </div>
    </div>
  );
}
