import Card from 'src/ui/Card/Card';
import styles from 'src/pages/Main/Main.module.scss';
import { cards } from 'src/utills/mock';
import { useOutletContext } from 'react-router-dom';
import { DroppedCard } from 'src/components/App/App';

export default function Main() {
  const { allowDrop, handleDrop } = useOutletContext<{
    allowDrop: (e: React.DragEvent<HTMLImageElement>) => void;
    handleDrop: (e: React.DragEvent<HTMLDivElement>) => void;
    droppedCards: DroppedCard[];
  }>();

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

    </div>
  );
}
