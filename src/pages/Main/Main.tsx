import Card from 'src/ui/Card/Card';
import styles from 'src/pages/Main/Main.module.scss';
import { initialCardsProps } from 'src/utills/mock';
import { useOutletContext } from 'react-router-dom';

export default function Main() {
  const { allowDrop, handleDrop, cards } = useOutletContext<{
    allowDrop: (e: React.DragEvent<HTMLImageElement>) => void;
    handleDrop: (e: React.DragEvent<HTMLDivElement>) => void;
    cards: initialCardsProps[];
  }>();
  console.log('cards: ', cards);

 const renderCards = (card: initialCardsProps) => {
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
