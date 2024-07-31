import { DownOutlined, EditOutlined, UpOutlined } from '@ant-design/icons';
import styles from 'src/components/Card/Card.module.scss';
import Avatar from 'src/assets/images/Avatar.png';
import { useState } from 'react';

export default function Card() {
  const [isOpen, setIsopen] = useState(true);
  return (
    <div className={styles.card}>
      <div className={styles.titleContainer}>
        <p className={styles.title}>Генеральный директор</p>
        <div className={styles.edit}>
          <EditOutlined />
        </div>
      </div>
      <div className={styles.nameContainer}>
        <div className={styles.img}>
          <img src={Avatar} alt='Фото профиля' />
        </div>
        <div>
          <p className={styles.name}>Евграфов Евграф Семёнович</p>
          <p className={styles.position}>Газовый сектор</p>

          <div className={styles.countContainer}>
            <p className={styles.count}>3</p>
            <div className={styles.countImg} onClick={() => setIsopen(!isOpen)}>
              {isOpen ? <UpOutlined /> : <DownOutlined />}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
