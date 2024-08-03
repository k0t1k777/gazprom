import Card from 'src/ui/Card/Card';
import styles from 'src/pages/Main/Main.module.scss';
import { cards } from 'src/utills/mock';
import { useOutletContext } from 'react-router-dom';

export default function Main() {
  const { allowDrop, handleDrop } = useOutletContext<{
    allowDrop: (e: React.DragEvent<HTMLImageElement>) => void;
    handleDrop: (e: React.DragEvent<HTMLDivElement>) => void;
  }>();

  return (
    <div
      className={styles.main}
      onDragOver={allowDrop}
      onDrop={handleDrop}
    >
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
    </div>
  );
}
