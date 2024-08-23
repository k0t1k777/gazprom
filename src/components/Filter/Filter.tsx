import styles from 'src/components/Filter/Filter.module.scss';
import { useEffect, useRef, useState } from 'react';
import useOutsideClick from 'src/hooks/useOutsideClick';
import { Input } from 'antd';
import { CloseOutlined } from '@ant-design/icons';
import Card from 'src/ui/Card/Card';
import FilterList from 'src/ui/FilterList/FilterList';
import {
  setIsFilterOpen,
  setSearch,
} from 'src/store/features/slice/membersSlice';
import { membersProps } from 'src/services/types';
import { handleDragStart } from 'src/services/dragAndDrop';
import {
  fetchGetMembers,
  selectMembers,
} from 'src/store/features/slice/membersSlice';
import { useAppDispatch, useAppSelector } from 'src/store/hooks';
import { itemsPerPage } from 'src/services/const';
import { selectFilter } from 'src/store/features/slice/filterSlice';

interface FilterProps {
  droppedCards: membersProps[];
}

export default function Filter({ droppedCards }: FilterProps) {
  const { isFilterOpen, members, search, membersAmount } =
    useAppSelector(selectMembers);
  const modalRef = useRef<HTMLDivElement>(null);
  const dispatch = useAppDispatch();
  const { department, position } = useAppSelector(selectFilter);
  const [currentPageFilter, setCurrentPageFilter] = useState(1);

  const currentPageRef = useRef(currentPageFilter);

  const handleChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    dispatch(setSearch(value));
    setCurrentPageFilter(1);
    currentPageRef.current = 1;
    await dispatch(
      fetchGetMembers({ page: 1, search: value, position, department })
    );
  };

  const handleScroll = async () => {
    if (!modalRef.current) return;
    const { scrollTop, clientHeight, scrollHeight } = modalRef.current;
    const maxPages = Math.ceil(membersAmount / itemsPerPage);
    const nextPage = currentPageRef.current + 1;

    if (scrollHeight - scrollTop - clientHeight <= 0 && nextPage <= maxPages) {
      setCurrentPageFilter(nextPage);
      currentPageRef.current = nextPage;
      await dispatch(
        fetchGetMembers({
          page: nextPage,
          search: search ? search : '',
          position,
          department,
        })
      );
    }
  };

  // Отслеживание изменения membersAmount
  useEffect(() => {
    if (membersAmount > 0) {
      const modalElement = modalRef.current;
      if (modalElement) {
        modalElement.addEventListener('scroll', handleScroll);
      }

      return () => {
        if (modalElement) {
          modalElement.removeEventListener('scroll', handleScroll);
        }
      };
    }
  }, [membersAmount]);

  useEffect(() => {
    dispatch(
      fetchGetMembers({
        page: currentPageFilter,
        search: search ? search : '',
        position,
        department,
      })
    );
  }, [dispatch, currentPageFilter, search, position, department]);

  useEffect(() => {
    if (modalRef.current) {
      modalRef.current.scrollTop = 0;
    }
  }, [members]);

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

  useOutsideClick(modalRef, () => {
    dispatch(setIsFilterOpen(false));
  });

  return (
    <div ref={modalRef} className={styles.filter}>
      <div>
        <Input
          className={styles.input}
          placeholder='Поиск'
          onChange={handleChange}
          value={search}
        />
        <div className={styles.container}>
          <CloseOutlined
            className={styles.img}
            onClick={() => dispatch(setIsFilterOpen(false))}
          />
          <p className={styles.text}>Фильтры</p>
        </div>
        <FilterList teams='Подразделение' positions='Должность' city='Город' />
        <div className={styles.containerResult}>
          {members &&
            members.map((card, index) => (
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
