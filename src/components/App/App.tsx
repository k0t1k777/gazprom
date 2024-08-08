import Header from 'src/components/Header/Header';
import { Outlet, useNavigate } from 'react-router-dom';
import SideBar from 'src/components/SideBar/SideBar';
import 'src/components/App/App.scss';
import { useEffect, useState } from 'react';
import { initialCards, cardsList } from 'src/services/mock';
import { initialCardsProps, RegisterDataProps } from 'src/services/types';
import * as Api from 'src/services/utils';
import { useDispatch, useSelector } from 'react-redux';
import { setLoggedIn, SliceProps } from 'src/store/features/slice/slice';

export interface DroppedCard {
  id: string;
  cellId: string;
}

export default function App() {
  const navigate = useNavigate();
  const loggedIn = useSelector((state: SliceProps) => state.loggedIn)
  const dispatch = useDispatch();


  console.log('loggedIn: ', loggedIn);

  // const [members, setMembers] = useState('')
  // console.log('members: ', members);

  // useEffect(() => {
  // Api.getMembers()
  //   .then((data) => {
  //     setMembers(data)
  //     console.log('data: ', data);
  //   } )
  //   .catch((error) => {
  //     console.error(error)
  //   })
  // }, [])

  function handleRegister({ email, password }: RegisterDataProps) {
    // setLoading(true);
    Api.registration({ email, password })
      .then((data) => {
        if (data.access) {
          localStorage.setItem('token', data.access);
          dispatch(setLoggedIn(true));
          navigate('/');
        }
      })
      .catch((error) => {
        console.error(error);
      });
    // .finally(() => {
    //   setLoading(false);
    // });
  }

  // ДНД
  const [droppedCards, setDroppedCards] = useState<DroppedCard[]>([]);
  const [cards, setCards] = useState<initialCardsProps[]>(initialCards);

  const handleDragStart = (e: React.DragEvent<HTMLDivElement>) => {
    const itemId = e.currentTarget.id;

    if (droppedCards.some((card) => card.id === itemId)) {
      e.preventDefault();
    } else {
      e.dataTransfer.setData('id', itemId);
    }
  };

  const allowDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();

    const itemId = e.dataTransfer.getData('id');

    const dropTarget = e.currentTarget;
    const dropTargetRect = dropTarget.getBoundingClientRect();

    const cellWidth = 330;
    const cellHeight = 157;

    const columnIndex = Math.floor(
      (e.clientX - dropTargetRect.left) / cellWidth
    );
    const rowIndex = Math.floor((e.clientY - dropTargetRect.top) / cellHeight);

    const cellId = `${columnIndex}-${rowIndex}`;
    console.log('cellId: ', cellId); // Логируем ID ячейки

    // Проверяем, что в этой ячейке еще нет карточки
    if (!droppedCards.some((card) => card.cellId === cellId)) {
      // Логируем текущие карточки

      // Находим родителя, к которому мы будем добавлять новую карточку
      const parentCard = findParentCard(cards, columnIndex, rowIndex);

      if (parentCard) {
        // Находим оригинальную карточку по itemId
        const originalCard = cardsList.find((card) => card.id === itemId);

        if (originalCard) {
          // Создаем новую подчиненную карточку на основе оригинальной
          const newSubordinateCard: initialCardsProps = {
            ...originalCard, // Копируем все поля оригинальной карточки
            id: itemId,
            subordinates: [],
            cellId,
          };

          // Обновляем карточки, добавляя новую подчиненную карточку
          const updatedCards = addSubordinate(
            cards,
            parentCard.id,
            newSubordinateCard
          );

          // Обновляем состояние карточек
          setCards(updatedCards);

          // Добавление новой карточки в droppedCards
          setDroppedCards((prev) => [
            ...prev,
            { id: newSubordinateCard.id, cellId },
          ]);
        } else {
          console.error`(Original card not found for itemId ${itemId}.)`;
        }
      } else {
        console.error`(Parent card not found for cellId ${cellId}.)`;
      }
    }
  };

  const findParentCard = (
    cards: initialCardsProps[],
    columnIndex: number,
    rowIndex: number
  ): initialCardsProps | undefined => {
    let parentCellId;

    // Условие для определения родительской ячейки
    if (
      (rowIndex === 0 && (columnIndex === 0 || columnIndex === 2)) ||
      (rowIndex === 1 && (columnIndex === 0 || columnIndex === 2))
    ) {
      parentCellId = '1-0';
    } else {
      parentCellId = `${columnIndex}-${rowIndex - 1}`; // Формируем cellId для родителя
    }

    for (const card of cards) {
      // Проверяем, соответствует ли текущая карточка родительскому cellId
      if (card.cellId === parentCellId) {
        return card; // Возвращаем родительскую карточку
      }
      if (card.subordinates) {
        const found = findParentCard(card.subordinates, columnIndex, rowIndex);
        if (found) return found; // Рекурсивный поиск среди подчиненных
      }
    }
    return undefined; // Если не нашли, возвращаем undefined
  };

  // Функция для добавления подчиненной карточки
  const addSubordinate = (
    cards: initialCardsProps[],
    parentId: string,
    subordinate: initialCardsProps
  ): initialCardsProps[] => {
    return cards.map((card) => {
      if (card.id === parentId) {
        return {
          ...card,
          subordinates: [...(card.subordinates || []), subordinate],
        };
      }
      if (card.subordinates) {
        return {
          ...card,
          subordinates: addSubordinate(
            card.subordinates,
            parentId,
            subordinate
          ),
        };
      }
      return card;
    });
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      dispatch(setLoggedIn(true));
    }
  }, [dispatch]);

  return (
    <div>
      <Header onDragStart={handleDragStart} droppedCards={droppedCards} />
      {loggedIn ? (
        <div className='container'>
          <SideBar />
          <Outlet
            context={{
              handleRegister,
              allowDrop,
              handleDrop,
              handleDragStart,
              cards,
            }}
          />
        </div>
      ) : (
        <Outlet context={{ handleRegister }} /> 
         )}
    </div>
  );
}
