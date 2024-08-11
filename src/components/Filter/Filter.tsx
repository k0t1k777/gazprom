import styles from 'src/components/Filter/Filter.module.scss';
import { useEffect, useRef } from 'react';
import useOutsideClick from 'src/hooks/useOutsideClick';
import { Input } from 'antd';
import { CloseOutlined } from '@ant-design/icons';
import Card from 'src/ui/Card/Card';
import { cardsList } from 'src/services/mock';
import FilterList from 'src/ui/FilterList/FilterList';
import { useAppDispatch, useAppSelector } from 'src/store/hooks';
import {
  selectMembers,
  setIsFilterOpen,
} from 'src/store/features/slice/membersSlice';
import { DroppedCard } from 'src/services/types';
import { handleDragStart } from 'src/services/dragAndDrop';
// import { fetchGetMembers, selectMembers } from 'src/store/features/slice/membersSlice';
// import { useAppDispatch, useAppSelector } from 'src/store/hooks';

interface FilterProps {
  droppedCards: DroppedCard[];
}
// const dispatch = useAppDispatch();
// const { members } = useAppSelector(selectMembers);

// useEffect(() => {
//   dispatch(fetchGetMembers());
// }, [dispatch]);
export default function Filter({ droppedCards }: FilterProps) {
  let { isFilterOpen } = useAppSelector(selectMembers);
  const dispatch = useAppDispatch();

  // console.log('droppedCards: ', droppedCards);

  const ref = useRef(null);

  useOutsideClick(ref, () => {
    dispatch(setIsFilterOpen(false));
  });

  const modalRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (modalRef.current) {
      const modal = modalRef.current;

      if (isFilterOpen) {
        modal.style.display = 'block';
        modal.style.opacity = '0';
        modal.animate([{ opacity: 0 }, { opacity: 1 }], {
          duration: 400,
          easing: 'ease-in-out',
          fill: 'forwards',
        });
      } else {
        modal.animate([{ opacity: 1 }, { opacity: 0 }], {
          duration: 400,
          easing: 'ease-in-out',
          fill: 'forwards',
        }).onfinish = () => {
          modal.style.display = 'none';
        };
      }
    }
  }, [isFilterOpen]);

  return (
    <div ref={ref} className={styles.filter}>
      <div ref={modalRef}>
        <Input className={styles.input} placeholder='Поиск' />
        <div className={styles.container}>
          <CloseOutlined className={styles.img} />
          <p className={styles.text}>Фильтры</p>
        </div>
        <FilterList teams='Подразделение' positions='Должность' city='Город' />
        <div className={styles.containerResult}>
          {cardsList.map((card, index) => (
            <Card
              id={card.id}
              key={card.id}
              name={card.name}
              position={card.position}
              index={index}
              isFilterOpen={isFilterOpen}
              onDragStart={(e) => handleDragStart(e, droppedCards)}
              draggable={
                !droppedCards.some((droppedCard) => droppedCard.id === card.id)
              }
            />
          ))}
        </div>
      </div>
    </div>
  );
}
