import styles from 'src/components/Header/Header.module.scss';
import Logo from 'src/assets/Logo.svg?react';
import { Input } from 'antd';
import { FilterOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import Filter from 'src/components/Filter/Filter';
import cn from 'classnames/bind';
import { useAppDispatch, useAppSelector } from 'src/store/hooks';
import { selectMembers, setIsFilterOpen } from 'src/store/features/slice/membersSlice';
import { DroppedCard } from 'src/services/types';
const cx = cn.bind(styles);

interface HeaderProps {
  onDragStart: (e: React.DragEvent<HTMLDivElement>) => void;
  droppedCards: DroppedCard[];
  loggedIn: boolean;
}

export default function Header({
  onDragStart,
  droppedCards,
  loggedIn,
}: HeaderProps) {
  let { isFilterOpen } = useAppSelector(selectMembers);
   const dispatch = useAppDispatch();

  return (
    <>
      <header
        className={cx(styles.header, { [styles.header_loggedIn]: !loggedIn })}
      >
        <Link to='/'>
          <Logo />
        </Link>
        {loggedIn && (
          <div className={styles.container}>
            <Input
              placeholder='Поиск'
              className={cx(styles.input, {
                [styles.input_disabled]: setIsFilterOpen,
              })}
            />
            <FilterOutlined
              onClick={() => dispatch(setIsFilterOpen(!isFilterOpen))}
              className={cx(styles.headerIcon, {
                [styles.headerIcon_disabled]: isFilterOpen,
              })}
            />
          </div>
        )}
      </header>
      {isFilterOpen && (
        <Filter
          onDragStart={onDragStart}
          droppedCards={droppedCards}
        />
      )}
    </>
  );
}
