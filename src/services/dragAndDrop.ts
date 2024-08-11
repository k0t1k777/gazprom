import { cellHeight, cellWidth } from 'src/services/const';
import { cardsList } from 'src/services/mock';
import { DroppedCard, initialCardsProps } from 'src/services/types';

// Начальная область переноса
export const handleDragStart = (
  e: React.DragEvent<HTMLDivElement>,
  droppedCards: DroppedCard[]
) => {
  const itemId = e.currentTarget.id;

  if (droppedCards.some((card) => card.id === itemId)) {
    e.preventDefault();
  } else {
    e.dataTransfer.setData('id', itemId);
  }
};

// Конечная область переноса
export const allowDrop = (e: React.DragEvent<HTMLDivElement>) => {
  e.preventDefault();
};

// Логика сброса карточек
export const handleDrop = (
  e: React.DragEvent<HTMLDivElement>,
  cards: initialCardsProps[],
  setCards: React.Dispatch<React.SetStateAction<initialCardsProps[]>>,
  droppedCards: DroppedCard[],
  setDroppedCards: React.Dispatch<React.SetStateAction<DroppedCard[]>>
) => {
  e.preventDefault();
  const itemId = e.dataTransfer.getData('id');

  const dropTarget = e.currentTarget;
  const dropTargetRect = dropTarget.getBoundingClientRect();

  const columnIndex = Math.floor((e.clientX - dropTargetRect.left) / cellWidth);
  const rowIndex = Math.floor((e.clientY - dropTargetRect.top) / cellHeight);

  const cellId = `${columnIndex}-${rowIndex}`;
  if (cellId === '0-0' || cellId === '2-0') {
    return;
  }
  if (!droppedCards.some((card) => card.cellId === cellId)) {
    const parentCard = findParentCard(cards, columnIndex, rowIndex);

    if (parentCard) {
      const originalCard = cardsList.find((card) => card.id === itemId);

      if (originalCard) {
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
      }
    }
  }
};

// Поиск родительской карты
const findParentCard = (
  cards: initialCardsProps[],
  columnIndex: number,
  rowIndex: number
): initialCardsProps | undefined => {
  let parentCellId;

  if (
    (rowIndex === 0 && (columnIndex === 0 || columnIndex === 2)) ||
    (rowIndex === 1 && (columnIndex === 0 || columnIndex === 2))
  ) {
    parentCellId = '1-0';
  } else {
    parentCellId = `${columnIndex}-${rowIndex - 1}`;
  }

  for (const card of cards) {
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

// Добавление подчиенной карты
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
        subordinates: addSubordinate(card.subordinates, parentId, subordinate),
      };
    }
    return card;
  });
};
