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

export default function Employees() {
  const location = useLocation();
  const dispatch = useAppDispatch();
  const { members } = useAppSelector(selectMembers);
  console.log('members: ', members);

  useEffect(() => {
    dispatch(fetchGetMembers());
  }, [dispatch]);

  const employesRout = location.pathname === '/employees';
  return (
    <div className={styles.employees}>
      <p className={styles.title}>Всего {members.length} сотрудников</p>
      <div className={styles.filterContainer}>
        <FilterList
          employesRout={employesRout}
          teams='ФИО'
          positions='Должность'
          city='Отдел'
        />
      </div>
      <div className={styles.cardContainer}>
        {members.map((card, index) => (
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
