import Card from 'src/ui/Card/Card';
import styles from 'src/pages/Main/Main.module.scss';
import { cards } from 'src/utills/mock';
import { useOutletContext } from 'react-router-dom';
import Arrow from 'src/ui/Arrow/Arrow';

export default function Main() {
  const { allowDrop, handleDrop, droppedCards } = useOutletContext<{
    allowDrop: (e: React.DragEvent<HTMLImageElement>) => void;
    handleDrop: (e: React.DragEvent<HTMLDivElement>) => void;
    droppedCards: string[];
  }>();

  const getCardPosition = (cellId: string) => {
    const [columnIndex, rowIndex] = cellId.split('-').map(Number);
    return {
      left: columnIndex * 330,
      top: rowIndex * 157,
    };
  };

  return (
    <div className={styles.main} onDragOver={allowDrop} onDrop={handleDrop}>
      {cards.map((card, index) => (
        <Card
          id={card.id}
          key={card.id}
          name={card.name}
          position={card.position}
          title={card.title}
          count={card.count}
          index={index}
        />
      ))}
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
        console.log(`Arrow from (${startX}, ${startY}) to (${endX}, ${endY})`);
        return (
          <Arrow
            key={`${cellId}-${lowerCard.cellId}`} 
            // startX={startX}
            // startY={startY}
            // endX={endX}
            // endY={endY}
            startX={1}
            startY={222}
            endX={1551}
            endY={1255}
          />
        );
      }
      return null;
    })}
    </div>
  );
}
