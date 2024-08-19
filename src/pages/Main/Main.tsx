import styles from 'src/pages/Main/Main.module.scss';
import { membersProps } from 'src/services/types';
import { useEffect, useState } from 'react';
import { useAppSelector } from 'src/store/hooks';
import { selectTeams } from 'src/store/features/slice/teamsSlice';
import Card from 'src/ui/Card/Card';
import Arrow from 'src/ui/Arrow/Arrow';
import { selectUsers } from 'src/store/features/slice/userSlice';
import PopupProfile from 'src/components/PopupProfile/PopupProfile';

export default function Main() {
  const { team } = useAppSelector(selectTeams);
  const { isProfileOpen } = useAppSelector(selectUsers);
  const [allCards, setAllCards] = useState<membersProps[]>([]);
  const [updatedCards, setUpdatedCards] = useState<membersProps[]>([]);
  const [teamCard, setTeamCard] = useState<membersProps[]>([]);
  const [drawArrows, setDrawArrows] = useState<JSX.Element[]>([]);

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

  // Рекурсивная функция для добавления ячеек cellId
  const updateSubordinates = (
    card: membersProps,
    parentColom: number,
    parentRow: number
  ): membersProps => {
    if (card.subordinates && Array.isArray(card.subordinates)) {
      const updatedSubordinates = card.subordinates.map(
        (sub: membersProps, index: number) => {
          const cellId = `${
            parentColom +
            (index === 0 ? 0 : index === 1 ? 1 : index === 2 ? -1 : index - 2)
          }-${parentRow + 1}`;

          const updatedSub = updateSubordinates(
            sub,
            parentColom + index,
            parentRow + 1
          );
          return { ...updatedSub, cellId };
        }
      );
      return { ...card, subordinates: updatedSubordinates };
    }
    return card;
  };

  const renderCardsServer = (card: membersProps) => {
    if (!card.cellId || !card.subordinates) {
      return null;
    }

    const [col, row] = card.cellId.split('-').map(Number);
    return (
      <div
        key={card.id}
        data-cell-id={card.id}
        style={{ gridColumn: col + 1, gridRow: row + 1 }}
      >
        <Card
          id={card.id}
          title={card.position}
          image={card.image}
          full_name={card.full_name}
          department={card.department}
          count={card.subordinates.length}
        />
      </div>
    );
  };

  // Находим родительскую карточку
  const findArrows = (parentId: string) => {
    const parentElement = document.getElementById(parentId);
    const childCards = teamCard.filter((card) => card.parent_id === parentId);
    const arrows: JSX.Element[] = [];

    childCards.forEach((childCard) => {
      const childElement = document.getElementById(childCard.id);

      if (childElement && parentElement) {
        const from = {
          x: parentElement.offsetLeft + parentElement.offsetWidth / 2,
          y: parentElement.offsetTop + parentElement.offsetHeight,
        };
        const to = {
          x: childElement.offsetLeft + childElement.offsetWidth / 2,
          y: childElement.offsetTop,
        };

        arrows.push(
          <Arrow
            key={`${parentId}-${childCard.id}`}
            startX={from.x}
            startY={from.y}
            endX={to.x}
            endY={to.y}
          />
        );

        arrows.push(...findArrows(childCard.id));
      }
    });

    return arrows;
  };

  useEffect(() => {
    const foundParentCard = teamCard.find((card) => card.parent_id === null);
    if (foundParentCard) {
      const arrows = findArrows(foundParentCard.id);
      setDrawArrows(arrows);
    }
  }, [teamCard]);

  useEffect(() => {
    if (team?.employees) {
      const allEmployeeData = [{ ...team.employees, cellId: '1-0' }];
      setAllCards(allEmployeeData);
    } else {
      setAllCards([]);
    }
  }, [team]);

  useEffect(() => {
    const updatedAllCards = allCards.map((card) =>
      updateSubordinates(
        card,
        Number(card.cellId && card.cellId.split('-')[0]),
        0
      )
    );
    setUpdatedCards(updatedAllCards);
  }, [allCards]);

  // Собираем все в один []
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
    updatedCards.forEach((card) => {
      collectCards(card, newAllCards);
    });
    setTeamCard(newAllCards);
  }, [updatedCards]);

  return (
    <section className={styles.main}>
      <div className={styles.cardContainer}>
        {teamCard && teamCard.map(renderCardsServer)}
        {drawArrows}
      </div>
      {isProfileOpen && <PopupProfile />}
    </section>
  );
}
