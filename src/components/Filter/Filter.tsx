import styles from 'src/components/Filter/Filter.module.scss';
import { useEffect, useRef } from 'react';
import useOutsideClick from 'src/hooks/useOutsideClick';
import { Input } from 'antd';
import { CloseOutlined } from '@ant-design/icons';
import Card from 'src/ui/Card/Card';
import FilterList from 'src/ui/FilterList/FilterList';
import {
  setCurrentPageFilter,
  setIsFilterOpen,
} from 'src/store/features/slice/membersSlice';
import { membersProps } from 'src/services/types';
import { handleDragStart } from 'src/services/dragAndDrop';
import {
  fetchGetMembers,
  selectMembers,
} from 'src/store/features/slice/membersSlice';
import { useAppDispatch, useAppSelector } from 'src/store/hooks';
import { selectUsers, setLoading } from 'src/store/features/slice/userSlice';

interface FilterProps {
  droppedCards: membersProps[];
}

export default function Filter({ droppedCards }: FilterProps) {
  const { isFilterOpen, members, currentPageFilter } =
    useAppSelector(selectMembers);
  const { loading } = useAppSelector(selectUsers);
  const modalRef = useRef<HTMLDivElement>(null);
  const dispatch = useAppDispatch();

  // Подгрузка карточек
  const handleScroll = () => {
    if (!modalRef.current) return;
    const { scrollTop, clientHeight, scrollHeight } = modalRef.current;
    if (
      scrollHeight - scrollTop - clientHeight <= 0 &&
      !loading &&
      currentPageFilter < 12
    ) {
      setLoading(true);
      dispatch(setCurrentPageFilter(1));
    }
  };

  useEffect(() => {
    const fetchMembers = async () => {
      if (loading) return;
      await dispatch(fetchGetMembers(currentPageFilter));
    };

    fetchMembers();
  }, [dispatch, currentPageFilter]);

  useEffect(() => {
    const modalElement = modalRef.current;
    if (modalElement) {
      modalElement.addEventListener('scroll', handleScroll);
    }

    return () => {
      if (modalElement) {
        modalElement.removeEventListener('scroll', handleScroll);
      }
    };
  }, [modalRef]);

  useEffect(() => {
    if (modalRef.current) {
      modalRef.current.scrollTop = 0;
    }
  }, [members]);

  useOutsideClick(modalRef, () => {
    dispatch(setIsFilterOpen(false));
  });

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
    <div ref={modalRef} className={styles.filter}>
      <div>
        <Input className={styles.input} placeholder='Поиск' />
        <div className={styles.container}>
          <CloseOutlined
            className={styles.img}
            onClick={() => dispatch(setIsFilterOpen(false))}
          />
          <p className={styles.text}>Фильтры</p>
        </div>
        <FilterList teams='Подразделение' positions='Должность' city='Город' />
        <div className={styles.containerResult}>
          {members.map((card, index) => (
            <Card
              id={String(card.id)}
              key={String(card.id)}
              title={card.position}
              full_name={card.full_name}
              department={card.department}
              index={index}
              isFilterOpen={isFilterOpen}
              onDragStart={(e) => handleDragStart(e, droppedCards)}
              draggable={
                !droppedCards.some(
                  (droppedCard) => droppedCard.id === String(card.id)
                )
              }
            />
          ))}
        </div>
        <div className={styles.downContainer}></div>
      </div>
    </div>
  );
}
