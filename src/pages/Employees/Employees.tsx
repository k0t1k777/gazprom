import styles from 'src/pages/Employees/Employees.module.scss';
import Card from 'src/ui/Card/Card';
import { useAppDispatch, useAppSelector } from 'src/store/hooks';
import { useEffect } from 'react';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import {
  fetchGetMembers,
  selectMembers,
  setCurrentPage,
} from 'src/store/features/slice/membersSlice';
import cn from 'classnames/bind';
import { itemsPerPage } from 'src/services/const';
import PopupProfile from 'src/components/PopupProfile/PopupProfile';
import { selectUsers } from 'src/store/features/slice/userSlice';
import { selectFilter } from 'src/store/features/slice/filterSlice';
import EmployeesList from 'src/ui/EmployeesList/EmployeesList';

export default function Employees() {
  const { shortWindow } = useAppSelector(selectMembers);
  const { members, membersAmount, currentPage, search } =
    useAppSelector(selectMembers);
  const { isProfileOpen } = useAppSelector(selectUsers);
  const { department, position, city } = useAppSelector(selectFilter);
  const cx = cn.bind(styles);
  const dispatch = useAppDispatch();
  console.log('members: ', members);

  const startIndex = (currentPage - 1) * itemsPerPage + 1;
  const endIndex = Math.min(startIndex + itemsPerPage - 1, membersAmount);
  const maxPages = Math.ceil(membersAmount / itemsPerPage);

  function nextPage() {
    if (currentPage < maxPages) {
      dispatch(
        fetchGetMembers({
          page: currentPage + 1,
          search,
          position,
          department,
          city,
        })
      );
      dispatch(setCurrentPage(currentPage + 1));
    }
  }

  function previousPage() {
    if (currentPage > 1) {
      dispatch(
        fetchGetMembers({
          page: currentPage - 1,
          search,
          position,
          department,
          city,
        })
      );
      dispatch(setCurrentPage(currentPage - 1));
    }
  }

  useEffect(() => {
    dispatch(
      fetchGetMembers({ page: currentPage, search, position, department, city })
    );
  }, [dispatch, currentPage, search, position, department, city]);

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
        <EmployeesList />
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
      {members.length ? (
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
      ) : (
        <p className={styles.noFound}>
          По вашему запросу ничего не найдено, попробуйте изменить фильтры
        </p>
      )}
      {isProfileOpen && <PopupProfile />}
    </section>
  );
}
