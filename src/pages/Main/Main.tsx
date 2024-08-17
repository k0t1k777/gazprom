import styles from 'src/pages/Main/Main.module.scss';
import { membersProps } from 'src/services/types';
import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from 'src/store/hooks';
import {
  fetchGetTeams,
  fetchGetTeamsId,
  selectTeams,
} from 'src/store/features/slice/teamsSlice';
import Card from 'src/ui/Card/Card';
import Arrow from 'src/ui/Arrow/Arrow';
import Preloader from 'src/ui/Preloader/Preloader';
import { id } from 'src/services/const';

export default function Main() {
 

  const dispatch = useAppDispatch();
  const { team } = useAppSelector(selectTeams);

  const [allCards, setAllCards] = useState<membersProps[]>([]);
  const [updatedCards, setUpdatedCards] = useState<membersProps[]>([]);
  const [teamCard, setTeamCard] = useState<membersProps[]>([]);
  const [loading, setLoading] = useState(true);

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

  // Рекурсивная функция для добавления cellId
  const updateSubordinates = (
    card: membersProps,
    parentColom: number,
    parentRow: number
  ): membersProps => {
    if (card.subordinates && Array.isArray(card.subordinates)) {
      const updatedSubordinates = card.subordinates.map(
        (sub: membersProps, index: number) => {
          let cellId;

          if (card.subordinates && card.subordinates.length === 1) {
            if (index === 0) {
              cellId = `${parentColom}-${parentRow + 1}`;
            }
          }

          if (card.subordinates && card.subordinates.length === 2) {
            if (index === 0) {
              cellId = `${parentColom}-${parentRow + 1}`;
            } else if (index === 1) {
              cellId = `${parentColom + 1}-${parentRow + 1}`;
            }
          }

          if (card.subordinates && card.subordinates.length === 3) {
            if (index === 0) {
              cellId = `${parentColom}-${parentRow + 1}`;
            } else if (index === 1) {
              cellId = `${parentColom + 1}-${parentRow + 1}`;
            } else if (index === 2) {
              cellId = `${parentColom - 1}-${parentRow + 1}`;
            }
          }

          if (card.subordinates && card.subordinates.length > 3) {
            if (index === 0) {
              cellId = `${parentColom}-${parentRow + 1}`;
            } else if (index === 1) {
              cellId = `${parentColom + 1}-${parentRow + 1}`;
            } else if (index === 2) {
              cellId = `${parentColom - 1}-${parentRow + 1}`;
            } else if (index === 3) {
              cellId = `${parentColom + 2}-${parentRow + 1}`;
            }
          }

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
          full_name={card.full_name}
          department={card.department}
          count={card.subordinates.length}
        />
      </div>
    );
  };

  const [drawArrows, setDrawArrows] = useState<JSX.Element[]>([]);

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
    dispatch(fetchGetTeams());
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      await dispatch(fetchGetTeams());
      if (id) {
        const parsedId = parseInt(id, 10);
        await dispatch(fetchGetTeamsId(parsedId));
      }
      setLoading(false);
    };

    fetchData();
  }, [dispatch, id]);

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
        {loading ? (
          <Preloader />
        ) : (
          <>
            {teamCard && teamCard.map(renderCardsServer)}
            {drawArrows}
          </>
        )}
      </div>
    </section>
  );
}
