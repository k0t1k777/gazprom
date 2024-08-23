import styles from 'src/components/Header/Header.module.scss';
import Logo from 'src/assets/icon/Logo.svg?react';
import { Input } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { Link, useNavigate } from 'react-router-dom';
import Filter from 'src/components/Filter/Filter';
import cn from 'classnames/bind';
import { useAppDispatch, useAppSelector } from 'src/store/hooks';
import {
  fetchGetMembers,
  selectMembers,
  setCurrentPage,
  setIsFilterOpen,
  setSearch,
} from 'src/store/features/slice/membersSlice';
import { membersProps } from 'src/services/types';
import {
  selectUsers,
  setIsProfileOpen,
} from 'src/store/features/slice/userSlice';
import { useEffect } from 'react';
const cx = cn.bind(styles);

interface HeaderProps {
  droppedCards: membersProps[];
}

export default function Header({ droppedCards }: HeaderProps) {
  const { isFilterOpen, search, currentPage } = useAppSelector(selectMembers);
  const { loggedIn } = useAppSelector(selectUsers);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  function handleFilterClick() {
    dispatch(setIsFilterOpen(!isFilterOpen));
    dispatch(setIsProfileOpen(false));
  }

  const handleChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setCurrentPage(1));
    const { value } = event.target;
    dispatch(setSearch(value));
    await dispatch(
      fetchGetMembers({
        page: currentPage,
        search: value,
        position: '',
        department: '',
        city: '',
      })
    );
    navigate('/employees');
  };

  useEffect(() => {
    dispatch(setSearch(''));
  }, [location.pathname, dispatch]);

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
              onChange={handleChange}
              value={search}
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
