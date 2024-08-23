import styles from 'src/pages/Employees/Employees.module.scss';
import Card from 'src/ui/Card/Card';
import { useAppDispatch, useAppSelector } from 'src/store/hooks';
import { useCallback, useEffect, useState } from 'react';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import {
  fetchGetMembers,
  selectMembers,
  setCurrentPage,
  setSearch,
} from 'src/store/features/slice/membersSlice';
import cn from 'classnames/bind';
import { itemsPerPage } from 'src/services/const';
import Select from 'src/ui/Select/Select';
import { Input } from 'antd';
import PopupProfile from 'src/components/PopupProfile/PopupProfile';
import { selectUsers } from 'src/store/features/slice/userSlice';
import {
  fetchSelects,
  selectFilter,
  setDepartment,
  setPosition,
} from 'src/store/features/slice/filterSlice';

export default function Employees() {
  const { shortWindow } = useAppSelector(selectMembers);
  const { members, membersAmount, currentPage, search } =
    useAppSelector(selectMembers);
  const { isProfileOpen } = useAppSelector(selectUsers);
  const { selects, department, position } = useAppSelector(selectFilter);

  const cx = cn.bind(styles);
  const dispatch = useAppDispatch();

  const handleChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    dispatch(setSearch(value));
    dispatch(setCurrentPage(1));
    await dispatch(
      fetchGetMembers({ page: 1, search: value, position, department })
    );
  };

  const startIndex = (currentPage - 1) * itemsPerPage + 1;
  const endIndex = Math.min(startIndex + itemsPerPage - 1, membersAmount);
  const maxPages = Math.ceil(membersAmount / itemsPerPage);

  function nextPage() {
    if (currentPage < maxPages) {
      dispatch(
        fetchGetMembers({ page: currentPage + 1, search, position, department })
      );
      dispatch(setCurrentPage(currentPage + 1));
    }
  }

  function previousPage() {
    if (currentPage > 1) {
      dispatch(
        fetchGetMembers({ page: currentPage - 1, search, position, department })
      );
      dispatch(setCurrentPage(currentPage - 1));
    }
  }

  useEffect(() => {
    dispatch(
      fetchGetMembers({ page: currentPage, search, position, department })
    );
  }, [dispatch, currentPage, search, position, department]);

  useEffect(() => {
    dispatch(fetchSelects());
  }, [dispatch]);

  const [departmentValue, setDepartmentValue] = useState('');

  const setDepartmentCallback = useCallback(() => {
    dispatch(setDepartment(departmentValue));
  }, [departmentValue]);

  useEffect(() => {
    setDepartmentCallback();
  }, [setDepartmentCallback]);

  const [positionsValue, setPositionsValue] = useState('');

  const setPositionCallback = useCallback(() => {
    dispatch(setPosition(positionsValue));
  }, [positionsValue]);

  useEffect(() => {
    setPositionCallback();
  }, [setPositionCallback]);

  return (
    <section
      className={cx(styles.employees, {
        [styles.employees_short]: shortWindow,
      })}
    >
      <p
        className={cx(styles.title, {
          [styles.marginLeft]: shortWindow,
        })}
      >
        Всего {membersAmount} сотрудников
      </p>
      <div
        className={cx(styles.headerContainer, {
          [styles.marginLeft]: shortWindow,
        })}
      >
        <ul className={styles.list}>
          <li className={styles.containerItem}>
            <Input
              placeholder='ФИО'
              className={styles.input}
              onChange={handleChange}
              value={search}
            />
          </li>
          <li className={styles.containerItem}>
            <Select
              text='Должность'
              options={selects.positions}
              value={position}
              setValue={setPositionsValue}
            />
          </li>
          <li className={styles.containerItem}>
            <Select
              text='Отдел'
              options={selects.departments}
              value={department}
              setValue={setDepartmentValue}
            />
          </li>
        </ul>
        <div className={styles.pagesContainer}>
          <p className={styles.pages}>
            {startIndex}-{endIndex} из {membersAmount}
          </p>
          <div className={styles.buttonPages}>
            <LeftOutlined
              className={cx(styles.button, {
                [styles.button_disabled]: currentPage === 1,
              })}
              onClick={previousPage}
              disabled={currentPage === 1}
            />
            <RightOutlined
              className={cx(styles.button, {
                [styles.button_disabled]: currentPage === maxPages,
              })}
              disabled={currentPage >= maxPages}
              onClick={nextPage}
            />
          </div>
        </div>
      </div>
      <div
        className={cx(styles.cardContainer, {
          [styles.cardContainer_center]: shortWindow,
        })}
      >
        {members.map((card, index) => (
          <Card
            id={card.id}
            key={card.id}
            title={card.position}
            full_name={card.full_name}
            department={card.department}
            index={index}
          />
        ))}
      </div>
      {isProfileOpen && <PopupProfile />}
    </section>
  );
}
