import styles from 'src/components/Filter/Filter.module.scss';
import { useRef } from 'react';
import useOutsideClick from 'src/hooks/useOutsideClick';
import { Input } from 'antd';
import { CloseOutlined, DownOutlined } from '@ant-design/icons';
import Card from 'src/ui/Card/Card';
import { cards } from 'src/utills/mock';

interface FilterProps {
  isFilterOpen: boolean;
  setIsFilterOpen: (type: boolean) => void;
}

export default function Filter({ isFilterOpen, setIsFilterOpen }: FilterProps) {
  const ref = useRef(null);

  useOutsideClick(ref, () => {
    setIsFilterOpen(false);
  });

  return (
    <div ref={ref} className={styles.filter}>
      <Input className={styles.input} placeholder='Поиск' />
      <div className={styles.container}>
        <CloseOutlined className={styles.img} />
        <p className={styles.text}>Фильтры</p>
      </div>
      <ul className={styles.list}>
        <li className={styles.containerItem}>
          <p className={styles.item}>Подразделение</p>
          <DownOutlined className={styles.arrow} />
        </li>

        <li className={styles.containerItem}>
          <p className={styles.item}>Должность</p>
          <DownOutlined className={styles.arrow} />
        </li>
        <li className={styles.containerItem}>
          <p className={styles.item}>Город</p>
          <DownOutlined className={styles.arrow} />
        </li>
      </ul>
      <div className={styles.containerResult}>

      {cards.map((card, index) => (
              <Card
                key={card.id}
                name={card.name}
                position={card.position}
                index={index}
                isFilterOpen={isFilterOpen}
              />
            ))}
      </div>
    </div>
  );
}
