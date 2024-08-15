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
  const [arrows, setArrows] = useState<JSX.Element[]>([]);
  const [busyCells, setBusyCells] = useState<string[]>([]);

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
      console.log('cards: ', cards);
      collectCards(card, newAllCards);
      collectCellIds(card, newBusyCells);
    });

    setAllCards(newAllCards);
    setBusyCells(newBusyCells);
  }, [cards]);

  useLayoutEffect(() => {
    if (allCards.length > 0) {
      renderArrows(allCards, setArrows);
    }
  }, [allCards]);
  console.log('allCards: ', allCards);

  return (
    <section
      className={styles.newTeam}
      onDragOver={allowDrop}
      onDrop={handleDrop}
    >
      {allCards.length === 0 ? (
        <div className={styles.title}>Перенесите мембера сюда</div>
      ) : (
        <div className={styles.cardContainer}>
          {allCards.map(renderCards)}
          {renderEmptyCells(busyCells, isFilterOpen)}
          {arrows}
        </div>
      )}
    </section>
  );
}
