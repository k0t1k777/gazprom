import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import styles from 'src/pages/Profile/Profile.module.scss';
import Photo from 'src/assets/images/Avatar.png';
import {
  CHARTS_DATA,
  EVENTS_DATA,
  INFO_DATA,
  PROFILE_DATA,
} from 'src/services/mock';

export default function Profile() {
  return (
    <div className={styles.profile}>
      <div className={styles.containerProfile}>
        <div className={styles.photoContainer}>
          <img src={Photo} alt='ваше фото' className={styles.photo} />
          <div className={styles.containerText}>
            <p className={styles.name}>Карпов Сергей</p>
            {PROFILE_DATA.map((item, index) => (
              <p key={index} className={`${styles.text} ${styles.text_bold}`}>
                {item}
              </p>
            ))}
          </div>
        </div>
        <div className={styles.containerText}>
          <p className={`${styles.textInfo} ${styles.textInfo_bold}`}>
            Дата рождения 12.12.1987
          </p>

          {INFO_DATA.map((item, index) => (
            <p key={index} className={styles.textInfo}>
              {item}
            </p>
          ))}
        </div>
        <div className={styles.containerButtons}>
          <EditOutlined className={styles.button} />
          <DeleteOutlined className={styles.button} />
        </div>
      </div>
      <div className={styles.containerInfo}>
        <ul className={styles.containerCharts}>
          {CHARTS_DATA.map((item, index) => (
            <li className={styles.item} key={index}>
              <p className={styles.text}>{item.text}</p>
              <img
                className={styles.chart}
                src={item.img}
                alt='иконка диаграммы'
              />
            </li>
          ))}
        </ul>
        <div className={styles.eventsContainer}>
      {EVENTS_DATA.map((cont, index) => (
        <div className="item" key={index}>
          <h3>{cont.title}</h3>
          <ul>
            {cont.items.map((item, idx) => (
              <li key={idx}>{item}</li>
            ))}
          </ul>
          <a href="#">{cont.link}</a>
        </div>
      ))}
        </div>
      </div>
    </div>
  );
}
