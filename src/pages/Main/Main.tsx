import Card from 'src/ui/Card/Card';
import styles from 'src/pages/Main/Main.module.scss';
import { cards } from 'src/utills/mock';

export default function Main() {
  return (
    <div className={styles.main}>
      {cards.map((card, index) => (
        <Card
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
