import Card from 'src/ui/Card/Card';
import styles from 'src/pages/Main/Main.module.scss';
import { useOutletContext } from 'react-router-dom';
import { initialCardsProps } from 'src/services/types';
import Arrow from 'src/ui/Arrow/Arrow';

export default function Main() {
  const { allowDrop, handleDrop, handleDragStart, cards } = useOutletContext<{
    allowDrop: (e: React.DragEvent<HTMLImageElement>) => void;
    handleDrop: (e: React.DragEvent<HTMLDivElement>) => void;
    handleDragStart: (e: React.DragEvent<HTMLDivElement>) => void;
    cards: initialCardsProps[];
  }>();
  console.log('cards: ', cards);

  const allCards: initialCardsProps[] = [];

  const collectCards = (card: any) => {
    allCards.push(card);
    if (card.subordinates) {
      card.subordinates.forEach(collectCards);
    }
  };

  cards.forEach(collectCards);

  const renderCards = (card: initialCardsProps) => {
    const [col, row] = card.cellId.split('-').map(Number);
    return (
      <div key={card.id} style={{ gridColumn: col + 1, gridRow: row + 1 }}>
        <Card
          id={card.id}
          name={card.name}
          position={card.position}
          title={card.title}
          cellId={card.cellId}
          count={card.subordinates.length}
          onDragStart={handleDragStart}
          draggable={true}
        />
      </div>
    );
  };

  return (
    <section className={styles.main} onDragOver={allowDrop} onDrop={handleDrop}>
      <div className={styles.cardContainer}>
        {allCards.map((card) => renderCards(card))}
      </div>
      {/* <Arrow /> */}
    </section>
  );
}
