import { useLocation } from 'react-router-dom';
import styles from 'src/pages/Employees/Employees.module.scss';
import Card from 'src/ui/Card/Card';
import FilterList from 'src/ui/FilterList/FilterList';
import { useAppDispatch, useAppSelector } from 'src/store/hooks';
import { useEffect } from 'react';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import {
  fetchGetMembers,
  fetchGetMembersAmount,
  selectMembers,
  setCurrentPage,
} from 'src/store/features/slice/membersSlice';
import cn from 'classnames/bind';
import { itemsPerPage } from 'src/services/const';

export default function Employees() {
  let { shortWindow } = useAppSelector(selectMembers);
  const cx = cn.bind(styles);

  const location = useLocation();
  const dispatch = useAppDispatch();
  const { members, membersAmount, currentPage } = useAppSelector(selectMembers);
  const employesRout = location.pathname === '/employees';

  const startIndex = (currentPage - 1) * itemsPerPage + 1;
  const endIndex = Math.min(startIndex + itemsPerPage - 1, membersAmount);
  const maxPages = Math.ceil(membersAmount / itemsPerPage);

  function nextPage() {
    if (currentPage < maxPages) {
      dispatch(fetchGetMembers(currentPage + 1));
      dispatch(setCurrentPage(currentPage + 1));
    }
  }

  function previousPage() {
    if (currentPage > 1) {
      dispatch(fetchGetMembers(currentPage - 1));
      dispatch(setCurrentPage(currentPage - 1));
    }
  }

  useEffect(() => {
    dispatch(fetchGetMembersAmount());
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchGetMembers(currentPage));
  }, [dispatch]);

  return (
    <div   className={cx(styles.employees, {
      [styles.employeesasdasdasd]: shortWindow,
    })}>
      <p
        className={cx(styles.title, {
          [styles.marginLeft]: shortWindow,
        })}
      >
        Всего {membersAmount} сотрудников
      </p>
      <div className={cx(styles.headerContainer, {
          [styles.marginLeft]: shortWindow,
        })}>
        <FilterList
          employesRout={employesRout}
          teams='ФИО'
          positions='Должность'
          city='Отдел'
        />
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
            employesRout={employesRout}
          />
        ))}
      </div>
    </div>
  );
}
