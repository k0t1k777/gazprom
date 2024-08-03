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
          {droppedCards.map((cardId, index) => {
        const upperCard = document.getElementById(cardId);
        if (upperCard && index < droppedCards.length - 1) {
          const lowerCard = document.getElementById(droppedCards[index + 1]);
          if (lowerCard) {
            const upperRect = upperCard.getBoundingClientRect();
            const lowerRect = lowerCard.getBoundingClientRect();

            const startX = upperRect.left + upperRect.width / 2;
            const startY = upperRect.bottom;
            const endX = lowerRect.left + lowerRect.width / 2;
            const endY = lowerRect.top;

            return (
              <Arrow 
                key={`${cardId}-${droppedCards[index + 1]}`} 
                startX={startX} 
                startY={startY} 
                endX={endX} 
                endY={endY} 
              />
            );
          }
        }
        return null;
      })}
    </div>
  );
}
