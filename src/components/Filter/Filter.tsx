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
import { T1 } from 'src/ui/typography';

interface FilterProps {
  droppedCards: membersProps[];
}

export default function Filter({ droppedCards }: FilterProps) {
  const { isFilterOpen, members, search, membersAmount } =
    useAppSelector(selectMembers);
  const modalRef = useRef<HTMLDivElement>(null);
  const dispatch = useAppDispatch();
  const { department, position, city } = useAppSelector(selectFilter);
  const [currentPageFilter, setCurrentPageFilter] = useState(1);

  const currentPageRef = useRef(currentPageFilter);

  const handleChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    dispatch(setSearch(value));
    setCurrentPageFilter(1);
    currentPageRef.current = 1;
    await dispatch(
      fetchGetMembers({ page: 1, search: value, position, department, city })
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
          city,
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
        city,
      })
    );
  }, [dispatch, currentPageFilter, search, position, department, city]);

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
    <div
      ref={modalRef}
      className='absolute top-10 right-10 rounded-bl-lg w-88.5 h-full shadow-lg bg-white-100 py-14 px-12 z-30 overflow-y-auto'
    >
      <div className='w-60'>
        <Input
          className='border border-white rounded py-1.5 px-6 w-full h-8 shadow'
          placeholder='Поиск'
          onChange={handleChange}
          value={search}
        />
        <div className='flex gap-4 py-14 px-4 border-b border-light-gray-100'>
          <CloseOutlined
            className='text-summer-sky-100 cursor-pointer'
            onClick={() => dispatch(setIsFilterOpen(false))}
          />
          <T1>Фильтры</T1>
        </div>
        <FilterList setCurrentPageFilter={setCurrentPageFilter} />
        {members.length ? (
          <div className='flex flex-col gap-2'>
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
        ) : (
          <T1 className='mt-40 text-center'>
            По вашему запросу ничего не найдено, попробуйте изменить фильтры
          </T1>
        )}
        <div className='h-24'></div>
      </div>
    </div>
  );
}
