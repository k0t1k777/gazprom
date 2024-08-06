import { DownOutlined, EditOutlined, UpOutlined } from '@ant-design/icons';
import styles from 'src/ui/Card/Card.module.scss';
import Avatar from 'src/assets/images/Avatar.png';
import { useState } from 'react';
import cn from 'classnames/bind';

const cx = cn.bind(styles);

interface CardProps {
  id: string;
  isFilterOpen?: boolean;
  position?: string;
  title?: string;
  count?: number;
  name?: string;
  index?: number;
  onDragStart?: (e: React.DragEvent<HTMLDivElement>) => void;
  draggable?: boolean;
  cellId?: any;
}

export default function Card({
  isFilterOpen = false,
  name,
  position,
  title,
  count,
  id,
  // удалить
  cellId,
  onDragStart,
  draggable = true,
}: CardProps) {
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
            {name}
          </p>
          <p
            className={cx(styles.position, {
              [styles.miniPosition]: isFilterOpen,
              [styles.noMoveColor]: !draggable,
            })}
          >
            {/* удалить */}
            {cellId}
            {/* {position} */}
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
