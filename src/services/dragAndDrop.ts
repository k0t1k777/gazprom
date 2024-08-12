import { cellHeight, cellWidth } from 'src/services/const';
// import { cardsList } from 'src/services/mock';
import { DroppedCard, membersProps } from 'src/services/types';

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
  cards: membersProps[],
  setCards: React.Dispatch<React.SetStateAction<membersProps[]>>,
  droppedCards: DroppedCard[],
  setDroppedCards: React.Dispatch<React.SetStateAction<DroppedCard[]>>,
  members: membersProps[],
) => {

  console.log('members: ', members);

  e.preventDefault();
  const itemId = e.dataTransfer.getData('id');
  console.log('itemId: ', itemId);

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
      const originalCard = members.find((card) => card.id === itemId);

      if (originalCard) {
        const newSubordinateCard: membersProps = {
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
        console.error`(Original card not found for itemId ${itemId})`;
      }
    } else {
      console.error`(Parent card not found for cellId ${cellId}.)`;
    }
  }
};

// Поиск родительской карты
const findParentCard = (
  cards: membersProps[],
  columnIndex: number,
  rowIndex: number
): membersProps | undefined => {
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
  cards: membersProps[],
  parentId: string,
  subordinate: membersProps
): membersProps[] => {
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
