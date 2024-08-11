import { DownOutlined, EditOutlined, UpOutlined } from '@ant-design/icons';
import styles from 'src/ui/Card/Card.module.scss';
import Avatar from 'src/assets/images/Avatar.png';
import { useState } from 'react';
import cn from 'classnames/bind';
import { CardProps } from 'src/services/types';

const cx = cn.bind(styles);

export default function Card({
  employesRout = false,
  isFilterOpen = false,
  name,
  position,
  title,
  count,
  id,
  onDragStart,
  draggable = true,
}: CardProps) {
  const [isOpen, setIsopen] = useState(true);

  return (
    <div
      className={cx(styles.card, {
        [styles.mini]: isFilterOpen,
        [`${styles.noMove} ${styles.noMoveColor}`]: !draggable,
        // [`${styles.noMove} ${styles.card_employesRout}`]: employesRout,
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
            {name}
          </p>
          <p
            className={cx(styles.position, {
              [styles.miniPosition]: isFilterOpen,
              [styles.noMoveColor]: !draggable,
            })}
          >
            {position}
          </p>
          <div
            className={cx(styles.countContainer, {
              [styles.disabled]: isFilterOpen,
            })}
          >
            <p className={styles.count}>{count}</p>
            <div className={styles.countImg} onClick={() => setIsopen(!isOpen)}>
              {isOpen ? <UpOutlined /> : <DownOutlined />}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
