import styles from 'src/ui/Card/Card.module.scss';
import { useState } from 'react';
import cn from 'classnames/bind';
import { membersProps } from 'src/services/types';
import { DownOutlined, EditOutlined, UpOutlined } from '@ant-design/icons';
import { useAppDispatch, useAppSelector } from 'src/store/hooks';
import {
  fetchGetMemberId,
  selectUsers,
  setIsProfileOpen,
} from 'src/store/features/slice/userSlice';

const cx = cn.bind(styles);

export default function Card({
  isFilterOpen = false,
  draggable = true,
  full_name,
  department,
  title,
  count,
  image,
  id,
  hideMembers,
  restoreMembers,
  onDragStart,
}: membersProps) {

  const [showMembers, setShowMembers] = useState(true);
  const employesNewTeam = window.location.hash === '#/new-team';
  const dispatch = useAppDispatch();
  const { isProfileOpen } = useAppSelector(selectUsers);

  const handleMemberClick = async (id: number) => {
    const memberData = await dispatch(fetchGetMemberId(id));
    if (memberData.payload) {
      dispatch(setIsProfileOpen(!isProfileOpen));
    }
  };

  return (
    <div
      className={cx(styles.card, {
        [styles.card_mini]: isFilterOpen,
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
        <div
          className={cx(styles.buttonsContainer, {
            [styles.disabled]: isFilterOpen,
          })}
        >
          <EditOutlined
            className={styles.button}
            onClick={() => handleMemberClick(Number(id))}
          />
        </div>
      </div>
      <div className={styles.nameContainer}>
        <div className={cx(styles.img, { [styles.disabled]: isFilterOpen })}>
          <img
            className={styles.img}
            src={image}
            alt='Фото профиля'
            onError={() => console.error('Ошибка загрузки изображения:', image)}
          />
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
                [styles.disabled]: !employesNewTeam,
              })}
              onClick={() => setShowMembers(!showMembers)}
            >
              {showMembers ? (
                <DownOutlined onClick={hideMembers} />
              ) : (
                <UpOutlined onClick={restoreMembers} />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
