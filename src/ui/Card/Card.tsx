import { DownOutlined, EditOutlined, UpOutlined } from '@ant-design/icons';
import styles from 'src/ui/Card/Card.module.scss';
import Avatar from 'src/assets/images/Avatar.png';
import { useState } from 'react';
import cn from 'classnames/bind';
import { membersProps } from 'src/services/types';

const cx = cn.bind(styles);

export default function Card({
  employesRout = false,
  isFilterOpen = false,
  full_name,
  department,
  title,
  count,
  id,
  onDragStart,
  draggable = true,
}: membersProps) {
  const [isOpen, setIsopen] = useState(true);

  return (
    <div
      className={cx(styles.card, {
        [styles.mini]: isFilterOpen,
        [`${styles.noMove} ${styles.noMoveColor}`]: !draggable,
      })}
      onDragStart={onDragStart}
      id={id}
      draggable={draggable}
    >
      <div className={styles.titleContainer}>
        <p className={cx(styles.title, { [styles.disabled]: isFilterOpen })}>
          {title}
        </p>
        <div className={cx(styles.edit, { [styles.disabled]: isFilterOpen })}>
          <EditOutlined />
        </div>
      </div>
      <div className={styles.nameContainer}>
        <div className={cx(styles.img, { [styles.disabled]: isFilterOpen })}>
          <img src={Avatar} alt='Фото профиля' />
        </div>
        <div
          className={cx(styles.mainContainer, {
            [styles.miniContainer]: isFilterOpen,
          })}
        >
          <p className={cx(styles.name, { [styles.miniName]: isFilterOpen })}>
            {full_name}
          </p>
          <p
            className={cx(styles.position, {
              [styles.position_miniPosition]: isFilterOpen,
              [styles.noMoveColor]: !draggable,
            })}
          >
            {department}
          </p>
          <div
            className={cx(styles.countContainer, {
              [styles.disabled]: isFilterOpen,
            })}
          >
            <p className={styles.count}>{count}</p>
            <div
              className={cx(styles.countImg, {
                [styles.disabled]: employesRout,
              })}
              onClick={() => setIsopen(!isOpen)}
            >
              {isOpen ? <UpOutlined /> : <DownOutlined />}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
