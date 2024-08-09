import Card from 'src/ui/Card/Card';
import styles from 'src/pages/Main/Main.module.scss';
import { useOutletContext } from 'react-router-dom';
import { initialCardsProps } from 'src/services/types';
import Arrow from 'src/ui/Arrow/Arrow';

export default function Main() {
  const { allowDrop, handleDrop, cards } = useOutletContext<{
    allowDrop: (e: React.DragEvent<HTMLImageElement>) => void;
    handleDrop: (e: React.DragEvent<HTMLDivElement>) => void;
    cards: initialCardsProps[];
  }>();
  console.log('cards: ', cards);

  const allCards: initialCardsProps[] = [];

  const collectCards = (card: initialCardsProps) => {
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
        />
      </div>
    );
  };

  const renderArrows = () => {
    return allCards.map((card) => {
      console.log('allCards: ', allCards);
      const parentCard = cards.find((item) => item.id === card.parentId);
      console.log('parentCard: ', parentCard);

      if (parentCard) {
        const parentElement = document.getElementById(parentCard.id);
        console.log('parentElement: ', parentElement);

        const childCard = parentCard.subordinates.find(
          (subordinate) => subordinate.id === card.id
        );
        console.log('childCard: ', childCard);

        const childElement = document.getElementById(childCard.id); 
        
          if (parentElement && childElement) {
          console.log('childElement: ', childElement);
          console.log('parentElement: ', parentElement);
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
  };

  return (
    <section className={styles.main} onDragOver={allowDrop} onDrop={handleDrop}>
      <div className={styles.cardContainer}>
        {allCards.map((card) => renderCards(card))}
        {renderArrows()}
      </div>
    </section>
  );
}
