import 'src/components/App/App.scss';
import Header from 'src/components/Header/Header';
import SideBar from 'src/components/SideBar/SideBar';
import { Outlet, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { initialCards, cardsList } from 'src/services/mock';
import { DroppedCard, initialCardsProps, RegisterDataProps } from 'src/services/types';
import { useAppDispatch, useAppSelector } from 'src/store/hooks';
import Registration from 'src/pages/Registration/Registration';
import {
  registerUser,
  selectUsers,
  setLoggedIn,
} from 'src/store/features/slice/userSlice';
import { cellHeight, cellWidth } from 'src/services/const';
// import * as Api from 'src/services/utils'


export default function App() {
  let { loggedIn } = useAppSelector(selectUsers);
   const dispatch = useAppDispatch();
  const navigate = useNavigate();

  function handleRegister({ email, password }: RegisterDataProps) {
    dispatch(registerUser({ email, password }))
      .unwrap()
      .then((data) => {
        if (data.access) {
          localStorage.setItem('token', data.access);
          dispatch(setLoggedIn(true));
          navigate('/');
        }
      })
      .catch((error) => {
        console.error('Ошибка регистрации:', error);
      });
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
    e.currentTarget.style.cursor = 'default';
    const itemId = e.dataTransfer.getData('id');

    const dropTarget = e.currentTarget;
    const dropTargetRect = dropTarget.getBoundingClientRect();

 

    const columnIndex = Math.floor(
      (e.clientX - dropTargetRect.left) / cellWidth
    );
    const rowIndex = Math.floor((e.clientY - dropTargetRect.top) / cellHeight);

    const cellId = `${columnIndex}-${rowIndex}`;
    if (cellId === '0-0' || cellId === '2-0') {
      return;
  }
    // Проверяем, что в этой ячейке еще нет карточки
    if (!droppedCards.some((card) => card.cellId === cellId)) {

      // Находим родителя, к которому мы будем добавлять новую карточку
      const parentCard = findParentCard(cards, columnIndex, rowIndex);

      if (parentCard) {
        // Находим оригинальную карточку по itemId
        const originalCard = cardsList.find((card) => card.id === itemId);

        if (originalCard) {
          // Создаем новую подчиненную карточку на основе оригинальной
          const newSubordinateCard: initialCardsProps = {
            ...originalCard,
            id: itemId,
            subordinates: [],
            cellId,
            parentId: parentCard.id,
          };

           const updatedCards = addSubordinate(
            cards,
            parentCard.id,
            newSubordinateCard
          );

          setCards(updatedCards);

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
        return card;
      }
      if (card.subordinates) {
        const found = findParentCard(card.subordinates, columnIndex, rowIndex);
        if (found) return found;
      }
    }
    return undefined;
  };

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
      <Header
        onDragStart={handleDragStart}
        droppedCards={droppedCards}
        loggedIn={loggedIn}
      />
      {loggedIn ? (
        <div className='container'>
          <SideBar />
          <Outlet
            context={{
              allowDrop,
              handleDrop,
              handleDragStart,
              cards,
            }}
          />
        </div>
      ) : (
        <Registration handleRegister={handleRegister} />
      )}
    </div>
  );
}
