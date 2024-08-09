import styles from 'src/components/Filter/Filter.module.scss';
import { useEffect, useRef } from 'react';
import useOutsideClick from 'src/hooks/useOutsideClick';
import { Input } from 'antd';
import { CloseOutlined } from '@ant-design/icons';
import Card from 'src/ui/Card/Card';
// import { cardsList } from 'src/services/mock';
import { DroppedCard } from '../App/App';
import FilterList from 'src/ui/FilterList/FilterList';
import { fetchGetMembers, selectMembers } from 'src/store/features/slice/membersSlice';
import { useAppDispatch, useAppSelector } from 'src/store/hooks';

interface FilterProps {
  isFilterOpen: boolean;
  setIsFilterOpen: (type: boolean) => void;
  onDragStart: (e: React.DragEvent<HTMLDivElement>) => void;
  droppedCards: DroppedCard[];
}

export default function Filter({
  isFilterOpen,
  setIsFilterOpen,
  onDragStart,
  droppedCards,
}: FilterProps) {
  const dispatch = useAppDispatch();
  const { members } = useAppSelector(selectMembers);
  console.log('members: ', members);
 
  useEffect(() => {
    dispatch(fetchGetMembers());
  }, [dispatch]);

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
      <FilterList teams='Подразделение' positions='Должность' city='Город' />
      <div className={styles.containerResult}>
        {members.map((card, index) => (
          <Card
            id={card.id}
            key={card.id}
            name={card.full_name}
            position={card.position}
            index={index}
            isFilterOpen={isFilterOpen}
            onDragStart={onDragStart}
            draggable={
              !droppedCards.some((droppedCard) => droppedCard.id === card.id)
            }
          />
        ))}
      </div>
    </div>
  );
}
