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
  const occupiedCells = allCards.map(card => card.cellId);
  const freeCells = ['0-1', '1-1', '2-1'];

  const renderCards = (card: initialCardsProps) => {
    console.log('allCards: ', allCards);
    const [col, row] = card.cellId.split('-').map(Number);
    const isOccupied = occupiedCells.includes(card.cellId); // Проверяем, занята ли ячейка
    const isFreeCell = freeCells.includes(card.cellId); // Проверяем, свободная ли ячейка
    return (
      <div
        key={card.id}
        data-cell-id={card.id}
        className={styles.cell}
        style={{ gridColumn: col + 1, gridRow: row + 1,
          backgroundColor: isOccupied ? 'lightgray' : (isFreeCell ? 'green' : 'yelow'),
         }}
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
    cards.forEach((card) => collectCards(card, newAllCards));
    setAllCards(newAllCards);
  }, [cards]);

  useLayoutEffect(() => {
    if (allCards.length > 0) {
      renderArrows();
    }
  }, [allCards]);

  return (
    <section className={styles.main} onDragOver={allowDrop} onDrop={handleDrop}>
      <div className={styles.cardContainer}>
        {allCards.map((card) => renderCards(card))}
        {arrows}
      </div>
    </section>
  );
}
