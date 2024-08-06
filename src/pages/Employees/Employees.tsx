import { useLocation } from 'react-router-dom';
import styles from 'src/pages/Employees/Employees.module.scss';
import Card from 'src/ui/Card/Card';
import FilterList from 'src/ui/FilterList/FilterList';
import { cardsList } from 'src/utills/mock';

export default function Employees() {
  const location = useLocation();

  const employesRout = location.pathname === '/employees';
  return (
    <div className={styles.employees}>
      <p className={styles.title}>Всего {666} сотрудников</p>
      <div className={styles.filterContainer}>
        <FilterList
          employesRout={employesRout}
          teams='ФИО'
          positions='Должность'
          city='Отдел'
        />
      </div>
      <div className={styles.cardContainer}>
        {cardsList.map((card, index) => (
          <Card
            id={card.id}
            key={card.id}
            name={card.name}
            position={card.position}
            index={index}
            employesRout={employesRout}
          />
        ))}
      </div>
    </div>
  );
}
