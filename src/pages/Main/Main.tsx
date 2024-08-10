import Card from 'src/ui/Card/Card';
import styles from 'src/pages/Main/Main.module.scss';
import { useOutletContext } from 'react-router-dom';
import { initialCardsProps } from 'src/services/types';
import Arrow from 'src/ui/Arrow/Arrow';
import { useEffect, useLayoutEffect, useState } from 'react';

export default function Main() {
  const { allowDrop, handleDrop, cards } = useOutletContext<{
    allowDrop: (e: React.DragEvent<HTMLImageElement>) => void;
    handleDrop: (e: React.DragEvent<HTMLDivElement>) => void;
    cards: initialCardsProps[];
  }>();

  const [allCards, setAllCards] = useState<initialCardsProps[]>([]);
  const [arrows, setArrows] = useState<JSX.Element[]>([]);
  const numCols = 3;
  const numRows = 100;

  const [busyCells, setBusyCells] = useState<string[]>([]);

  const collectCellIds = (card: initialCardsProps, collected: string[]) => {
    collected.push(card.cellId);
    card.subordinates.forEach((subordinate) =>
      collectCellIds(subordinate, collected)
    );
  };

  const renderCards = (card: initialCardsProps) => {
    const [col, row] = card.cellId.split('-').map(Number);
    return (
      <div
        key={card.id}
        data-cell-id={card.id}
        className={styles.cell}
        style={{ gridColumn: col + 1, gridRow: row + 1 }}
      >
        <Card
          id={card.id}
          name={card.name}
          position={card.position}
          title={card.title}
          cellId={card.cellId}
          count={card.subordinates.length}
        />
      </div>
    );
  };

  const renderEmptyCells = (numCols: number, numRows: number) => {
    const busyCellIds = new Set(busyCells);
    const emptyCells = [];

    for (let row = 0; row < numRows; row++) {
      for (let col = 0; col < numCols; col++) {
        const cellId = `${col}-${row}`;
        if (!busyCellIds.has(cellId)) {
          emptyCells.push(cellId);
        }
      }
    }

    return emptyCells.map((cellId) => {
      const [col, row] = cellId.split('-').map(Number);

      return (
        <div
          key={cellId}
          data-cell-id={cellId}
          className={styles.cell}
          style={{
            gridColumn: col + 1,
            gridRow: row + 1,
            backgroundColor: '#EBF7FF',
          }}
        />
      );
    });
  };

  const renderArrows = () => {
    const newArrows = allCards.map((card) => {
      const parentCard = allCards.find((item) => item.id === card.parentId);

      if (parentCard) {
        const parentElement = document.querySelector(
          `[data-cell-id="${parentCard.id}"]`
        ) as HTMLElement;
        const childElement = document.querySelector(
          `[data-cell-id="${card.id}"]`
        ) as HTMLElement;

        if (parentElement && childElement) {
          const from = {
            x: parentElement.offsetLeft + parentElement.offsetWidth / 2,
            y: parentElement.offsetTop + parentElement.offsetHeight,
          };
          const to = {
            x: childElement.offsetLeft + childElement.offsetWidth / 2,
            y: childElement.offsetTop,
          };

          return (
            <Arrow
              key={`${parentCard.id}-${card.id}`}
              startX={from.x}
              startY={from.y}
              endX={to.x}
              endY={to.y}
            />
          );
        }
      }
      return null;
    });
    setArrows(
      newArrows.filter((arrow): arrow is JSX.Element => arrow !== null)
    );
  };

  useEffect(() => {
    const collectCards = (
      card: initialCardsProps,
      collected: initialCardsProps[]
    ) => {
      collected.push(card);
      card.subordinates.forEach((subordinate) =>
        collectCards(subordinate, collected)
      );
    };
    const newAllCards: initialCardsProps[] = [];
    const newBusyCells: string[] = [];

    cards.forEach((card) => {
      collectCards(card, newAllCards);
      collectCellIds(card, newBusyCells);
    });

    setAllCards(newAllCards);
    setBusyCells(newBusyCells);
  }, [cards]);

  useLayoutEffect(() => {
    if (allCards.length > 0) {
      renderArrows();
    }
  }, [allCards]);

  return (
    <section className={styles.main} onDragOver={allowDrop} onDrop={handleDrop}>
      <div className={styles.cardContainer}>
        {allCards.map(renderCards)}
        {renderEmptyCells(numCols, numRows)}
        {arrows}
      </div>
    </section>
  );
}
