import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import styles from 'src/pages/Profile/Profile.module.scss';
import { EVENTS_DATA } from 'src/services/const';
import { useAppDispatch, useAppSelector } from 'src/store/hooks';
import { selectMembers } from 'src/store/features/slice/membersSlice';
import cn from 'classnames/bind';
import {
  fetchGetProfile,
  selectUsers,
} from 'src/store/features/slice/userSlice';
import { useEffect } from 'react';
import { BASE_URL } from 'src/store/api';

export default function Profile() {
  let { shortWindow } = useAppSelector(selectMembers);
  let { profile } = useAppSelector(selectUsers);
  const dispatch = useAppDispatch();
  const cx = cn.bind(styles);

  useEffect(() => {
    dispatch(fetchGetProfile());
  }, [dispatch]);

  return (
    <section className={styles.profile}>
      <div className={styles.containerProfile}>
        <div className={styles.photoContainer}>
          <img
            src={`${BASE_URL}${profile?.image}`}
            alt='ваше фото'
            className={styles.photo}
          />
          <div className={styles.containerText}>
            <p className={styles.name}>{profile?.full_name}</p>
            <p className={`${styles.text} ${styles.text_bold}`}>
              {profile?.profile.position}
            </p>
          </div>
        </div>
        <div className={styles.containerText}>
          <p className={`${styles.textInfo} ${styles.textInfo_bold}`}>
            Дата рождения {profile?.profile.birthday}
          </p>
          <p className={styles.textInfo}>Тел. {profile?.profile.phone}</p>
          <p className={styles.textInfo}>{profile?.email}</p>
          <p className={styles.textInfo}>
            Местонахождение: Санкт-Петербург GMT+3
          </p>
        </div>
        <div className={styles.containerButtons}>
          <EditOutlined className={styles.button} />
          <DeleteOutlined className={styles.button} />
        </div>
      </div>
      <div
        className={cx(styles.containerInfo, {
          [styles.containerInfo_column]: !shortWindow,
        })}
      >
        <ul
          className={cx(styles.containerCharts, {
            [styles.containerCharts_row]: !shortWindow,
          })}
        >
            <li className={styles.item}>
              <p className={styles.text}>Загруженность 87 %</p>
              <img
                className={styles.chart}
                src='src/assets/images/diagram1.png'
                alt='иконка диаграммы'
              />
            </li>
            <li className={styles.item}>
              <p className={styles.text}>Следующий грейд 44 %</p>
              <img
                className={styles.chart}
                src='src/assets/images/diagram2.png'
                alt='иконка диаграммы'
              />
            </li>
            <li className={styles.item}>
              <p className={styles.text}>Эффективность 65 %</p>
              <img
                className={styles.chart}
                src='src/assets/images/diagram3.png'
                alt='иконка диаграммы'
              />
            </li>
        </ul>
        <div className={styles.eventsContainer}>
          {EVENTS_DATA.map((cont, index) => (
            <div className={styles.itemContainer} key={index}>
              <h3 className={styles.itemContainerTitle}>{cont.title}</h3>
              <ul className={styles.itemContainerList}>
                {cont.items.map((item, idx) => (
                  <li className={styles.itemContainerItem} key={idx}>
                    {item}
                  </li>
                ))}
              </ul>
              <a
                className={`${styles.itemContainerItem} ${styles.colorBlue}`}
                href='#'
              >
                {cont.link}
              </a>
            </div>
          ))}
          <div className={styles.itemContainer}>
            <h3 className={styles.itemContainerTitle}>
              Участие в текущих проектах
            </h3>
            <ul className={styles.itemContainerList}>
              {profile?.projects.map((item, index) => (
                <li
                  className={`${styles.itemContainerItem} ${styles.colorBlue}`}
                  key={index}
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
