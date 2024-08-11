import { useLocation } from 'react-router-dom';
import styles from 'src/pages/Employees/Employees.module.scss';
import Card from 'src/ui/Card/Card';
import FilterList from 'src/ui/FilterList/FilterList';
import { useAppDispatch, useAppSelector } from 'src/store/hooks';
import {
  fetchGetMembers,
  selectMembers,
} from 'src/store/features/slice/membersSlice';
import { useEffect } from 'react';
import { initialCards } from 'src/services/mock';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';

export default function Employees() {
  const location = useLocation();
  const dispatch = useAppDispatch();
  const { members } = useAppSelector(selectMembers);

  useEffect(() => {
    dispatch(fetchGetMembers());
  }, [dispatch]);
  console.log('members: ', members);
  console.log(' members.count: ', members.count);

  const employesRout = location.pathname === '/employees';
  return (
    <div className={styles.employees}>
      <p className={styles.title}>Всего {members.length} сотрудников</p>
      <div className={styles.headerContainer}>
        {/* <div className={styles.filterContainer}> */}
        <FilterList
          employesRout={employesRout}
          teams='ФИО'
          positions='Должность'
          city='Отдел'
        />
        {/* </div> */}
        <div className={styles.pagesContainer}>
          <p className={styles.pages}>1-12 из 666</p>
          <div className={styles.buttonPages}>
            <LeftOutlined className={styles.button}/>
            <RightOutlined className={styles.button}/>
          </div>
        </div>
      </div>
      <div className={styles.cardContainer}>
        {initialCards.map((card, index) => (
          <Card
            id={card.id}
            key={card.id}
            name={card.full_name}
            position={card.department}
            index={index}
            employesRout={employesRout}
          />
        ))}
      </div>
    </div>
  );
}
