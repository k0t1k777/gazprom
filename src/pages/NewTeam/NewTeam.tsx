import { useEffect, useLayoutEffect, useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import styles from 'src/pages/NewTeam/NewTeam.module.scss';
import { membersProps } from 'src/services/types';
import { selectMembers } from 'src/store/features/slice/membersSlice';
import { useAppSelector } from 'src/store/hooks';
import {
  renderArrows,
  renderCards,
  renderEmptyCells,
} from 'src/services/helpers';

export default function NewTeam() {
  const { allowDrop, handleDrop, cards } = useOutletContext<{
    allowDrop: (e: React.DragEvent<HTMLImageElement>) => void;
    handleDrop: (e: React.DragEvent<HTMLDivElement>) => void;
    cards: membersProps[];
  }>();
  let { isFilterOpen } = useAppSelector(selectMembers);

  const [allCards, setAllCards] = useState<membersProps[]>([]);
  console.log('allCards: ', allCards);
  const [arrows, setArrows] = useState<JSX.Element[]>([]);
  const [busyCells, setBusyCells] = useState<string[]>([]);
  const [originalCards, setOriginalCards] = useState<membersProps[]>([]);

  const collectCellIds = (card: membersProps, collected: string[]) => {
    if (card.cellId) {
      collected.push(card.cellId);
    }
    if (card.subordinates) {
      card.subordinates.forEach((subordinate) =>
        collectCellIds(subordinate, collected)
      );
    }
  };


  useEffect(() => {
    const collectCards = (card: membersProps, collected: membersProps[]) => {
      collected.push(card);
      if (card.subordinates) {
        card.subordinates.forEach((subordinate) =>
          collectCards(subordinate, collected)
        );
      }
    };
    const newAllCards: membersProps[] = [];
    const newBusyCells: string[] = [];

    cards.forEach((card) => {
      collectCards(card, newAllCards);
      collectCellIds(card, newBusyCells);
    });

    setAllCards(newAllCards);
    setOriginalCards(newAllCards);
    setBusyCells(newBusyCells);
  }, [cards]);

  useLayoutEffect(() => {
    if (allCards.length > 0) {
      renderArrows(allCards, setArrows);
    }
  }, [allCards]);

  return (
    <section
      className={styles.newTeam}
      onDragOver={allowDrop}
      onDrop={handleDrop}
    >
      {allCards.length === 0 ? (
        <div className={styles.title}>Добавьте члена команды сюда</div>
      ) : (
        <div className={styles.cardContainer}>
          {allCards.map((card) =>
            renderCards(card, setAllCards, originalCards, setOriginalCards)
          )}
          {renderEmptyCells(busyCells, isFilterOpen)}
          {arrows}
        </div>
      )}
    </section>
  );
}


 // Если больше трёх подчинённых, распределяем их по колонкам
//  newColumn = parColumn + subIndex - Math.floor(subordinatesCount / 2); // Центрируем подчинённых
// }