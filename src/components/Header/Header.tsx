import styles from 'src/components/Header/Header.module.scss';
import Logo from 'src/assets/Logo.svg?react';
import { Input } from 'antd';
import { FilterOutlined } from '@ant-design/icons';
import { 
  // Link, 
  useNavigate } from 'react-router-dom';
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
  let { isFilterOpen } = useAppSelector(selectMembers);
  let { loggedIn } = useAppSelector(selectUsers);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  function handleFilterClick() {
    dispatch(setIsFilterOpen(!isFilterOpen));
    navigate('/');
  }
{/* <PlusOutlined /> */}
  return (
    <>
      <header
        className={cx(styles.header, { [styles.header_loggedIn]: !loggedIn })}
      >
        {/* <Link to='/'> */}
          <Logo />
        {/* </Link> */}
        {loggedIn && (
          <div className={styles.container}>
            <Input
              placeholder='Поиск'
              className={cx(styles.input, {
                [styles.input_disabled]: isFilterOpen,
              })}
            />
            <FilterOutlined
              onClick={handleFilterClick}
              className={cx(styles.headerIcon, {
                [styles.headerIcon_disabled]: isFilterOpen,
              })}
            />
          </div>
        )}
      </header>
      {isFilterOpen && (
        <Filter droppedCards={droppedCards} />
      )}
    </>
  );
}
