import styles from 'src/components/Header/Header.module.scss';
import Logo from 'src/assets/Logo.svg?react';
import { Input } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import Filter from 'src/components/Filter/Filter';
import cn from 'classnames/bind';
import { useAppDispatch, useAppSelector } from 'src/store/hooks';
import {
  selectMembers,
  setIsFilterOpen,
} from 'src/store/features/slice/membersSlice';
import { membersProps } from 'src/services/types';
import { selectUsers } from 'src/store/features/slice/userSlice';
const cx = cn.bind(styles);

interface HeaderProps {
  droppedCards: membersProps[];
}

export default function Header({ droppedCards }: HeaderProps) {
  const { isFilterOpen } = useAppSelector(selectMembers);
  const { loggedIn } = useAppSelector(selectUsers);
  const dispatch = useAppDispatch();

  function handleFilterClick() {
    dispatch(setIsFilterOpen(!isFilterOpen));
  }
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
                [styles.input_disabled]: isFilterOpen,
              })}
            />
            <Link to='/new-team'>
              <PlusOutlined
                onClick={handleFilterClick}
                className={cx(styles.headerIcon, {
                  [styles.headerIcon_disabled]: isFilterOpen,
                })}
              />
            </Link>
          </div>
        )}
      </header>
      {isFilterOpen && <Filter droppedCards={droppedCards} />}
    </>
  );
}
