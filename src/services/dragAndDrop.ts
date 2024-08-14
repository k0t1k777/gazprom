import { cellHeight, cellWidth } from 'src/services/const';
// import { cardsList } from 'src/services/mock';
import { membersProps } from 'src/services/types';

// Начальная область переноса
export const handleDragStart = (
  e: React.DragEvent<HTMLDivElement>,
  droppedCards: membersProps[]
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
  droppedCards: membersProps[],
  setDroppedCards: React.Dispatch<React.SetStateAction<membersProps[]>>,
  members: membersProps[]
) => {
  e.preventDefault();
  // Здесь мы получаем ID элемента, который перетаскивается.
  const itemId = e.dataTransfer.getData('id');
  console.log('itemId: ', itemId);

  // получаем размеры и положение области, куда была сброшена карточка.
  const dropTarget = e.currentTarget;
  const dropTargetRect = dropTarget.getBoundingClientRect();

  // в какую ячейку сетки была сброшена карточка, основываясь на координатах курсора.
  const columnIndex = Math.floor((e.clientX - dropTargetRect.left) / cellWidth);
  const rowIndex = Math.floor((e.clientY - dropTargetRect.top) / cellHeight);

  // ID ячейки формируется как строка, состоящая из индексов столбца и строки.
  const cellId = `${columnIndex}-${rowIndex}`;
  console.log('cellId: ', cellId);

  // Если карточка сбрасывается в определённые ячейки, функция завершает выполнение.
  if (cellId === '0-0' || cellId === '2-0') {
    return;
  }

  // Если карточка уже была сброшена в эту ячейку, дальнейшие действия не выполняются.
  if (!droppedCards.some((card) => card.cellId === cellId)) {
    // Здесь вызывается функция для поиска родительской карточки по текущим координатам.
    const parentCard = findParentCard(cards, columnIndex, rowIndex);
    const originalCard = members.find((card) => String(card.id) === itemId);

    if (originalCard) {
      // Если родительская карточка найдена, создаётся новая подчинённая карточка с необходимыми свойствами.
      if (parentCard) {
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

        // Обновляются состояния карточек и сброшенных карточек
        setCards(updatedCards);
        setDroppedCards((prev) => [
          ...prev,
          { id: newSubordinateCard.id, cellId },
        ]);
      } else {
        // Если родительская карточка не найдена, создаём новую карточку с cellId '1-0'
        const newSubordinateCard: membersProps = {
          ...originalCard,
          id: itemId,
          subordinates: [],
          cellId: '1-0', // Устанавливаем cellId как '1-0'
          parentId: '', // Или другое значение, если нужно
        };
        // Добавляем новую карточку в массив
        const updatedCards = [...cards, newSubordinateCard];

        // Обновляем состояния карточек и сброшенных карточек
        setCards(updatedCards);
        setDroppedCards((prev) => [
          ...prev,
          { id: newSubordinateCard.id, cellId: '1-0' },
        ]);
      }
    } else {
      console.error(`(Original card not found for itemId ${itemId})`);
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

  // В зависимости от индексов строки и столбца определяется ID родительской ячейки.
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
    // Функция проходит по массиву карточек и проверяет, есть ли карточка с соответствующим ID.
    //  Если такая карточка найдена, она возвращается. Если нет,
    //  функция рекурсивно ищет среди подчинённых карточек.
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
  // Функция проходит по массиву карточек и ищет родительскую карточку по её ID.
  return cards.map((card) => {
    // Если родительская карточка найдена,
    // новая подчинённая карточка добавляется в её массив подчинённых.
    if (card.id === parentId) {
      return {
        ...card,
        subordinates: [...(card.subordinates || []), subordinate],
      };
    }
    // Если у текущей карточки есть подчинённые,
    // функция рекурсивно вызывает себя для добавления подчинённой карточки к ним.
    if (card.subordinates) {
      return {
        ...card,
        subordinates: addSubordinate(card.subordinates, parentId, subordinate),
      };
    }
    return card;
  });
};
