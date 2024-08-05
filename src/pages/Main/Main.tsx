import Card from 'src/ui/Card/Card';
import styles from 'src/pages/Main/Main.module.scss';
import { cards } from 'src/utills/mock';
import { useOutletContext } from 'react-router-dom';
import Arrow from 'src/ui/Arrow/Arrow';
import { DroppedCard } from 'src/components/App/App';

export default function Main() {
  const { allowDrop, handleDrop, droppedCards } = useOutletContext<{
    allowDrop: (e: React.DragEvent<HTMLImageElement>) => void;
    handleDrop: (e: React.DragEvent<HTMLDivElement>) => void;
    droppedCards: DroppedCard[];
  }>();

  const getCardPosition = (cellId: string) => {
    console.log('cellId: ', cellId);
    const [columnIndex, rowIndex] = cellId.split('-').map(Number);
    return {
      left: columnIndex * 330,
      top: rowIndex * 157,
    };
  };

  const renderCards = (card: cards) => {
    return (
      <div key={card.id} className={styles.cardContainer}>
        <Card
          id={card.id}
          name={card.name}
          position={card.position}
          title={card.title}
          count={card.count}
        />
        {card.subordinates && card.subordinates.length > 0 && (
          <div className={styles.subordinates}>
            {card.subordinates.map((subordinate) => renderCards(subordinate))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className={styles.main} onDragOver={allowDrop} onDrop={handleDrop}>
      {cards.map((card) => renderCards(card))}
      {droppedCards.map((droppedCard, index) => {
        const { cellId } = droppedCard;
        const upperCardPosition = getCardPosition(cellId);

        if (index < droppedCards.length - 1) {
          const lowerCard = droppedCards[index + 1];
          const lowerCardPosition = getCardPosition(lowerCard.cellId);

          const startX = upperCardPosition.left + 165; // center of upper card
          const startY = upperCardPosition.top + 157; // bottom of upper card
          const endX = lowerCardPosition.left + 165; // center of lower card
          const endY = lowerCardPosition.top; // top of lower card
          console.log(
            `Arrow from (${startX}, ${startY}) to (${endX}, ${endY})`
          );
          return (
            <Arrow
              key={`${cellId}-${lowerCard.cellId}`}
              startX={startX}
              startY={startY}
              endX={endX}
              endY={endY}
            />
          );
        }
        return null;
      })}
    </div>
  );
}
