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
import Modal from 'src/ui/Modal/Modal';

export default function NewTeam() {
  const { allowDrop, handleDrop } = useOutletContext<{
    allowDrop: (e: React.DragEvent<HTMLImageElement>) => void;
    handleDrop: (e: React.DragEvent<HTMLDivElement>) => void;
  }>();
  let { isFilterOpen, cards } = useAppSelector(selectMembers);

  const [personalTeam, setPersonalTeam] = useState<membersProps[]>([]);
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

    setPersonalTeam(newAllCards);
    setOriginalCards(newAllCards);
    setBusyCells(newBusyCells);
  }, [cards]);

  useLayoutEffect(() => {
    if (personalTeam.length > 0) {
      renderArrows(personalTeam, setArrows);
    }
  }, [personalTeam]);

  return (
    <section
      className={styles.newTeam}
      onDragOver={allowDrop}
      onDrop={handleDrop}
    >
      {personalTeam.length === 0 ? (
        <div className={styles.title}>Добавьте члена команды сюда</div>
      ) : (
        <>
          <div className={styles.cardContainer}>
            {personalTeam.map((card) =>
              renderCards(
                card,
                setPersonalTeam,
                originalCards,
                setOriginalCards
              )
            )}
            {renderEmptyCells(busyCells, isFilterOpen)}
            {arrows}
          </div>
          <Modal />
        </>
      )}
    </section>
  );
}
