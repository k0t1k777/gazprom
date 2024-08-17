import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styles from 'src/pages/Teams/Teams.module.scss';
import { membersProps } from 'src/services/types';
import {
  fetchGetTeams,
  fetchGetTeamsId,
  selectTeams,
} from 'src/store/features/slice/teamsSlice';
import { useAppDispatch, useAppSelector } from 'src/store/hooks';
import Card from 'src/ui/Card/Card';
import TeamsItem from 'src/ui/TeamsItem/TeamsItem';
import Preloader from 'src/ui/Preloader/Preloader'
import Arrow from 'src/ui/Arrow/Arrow';

export default function Teams() {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const { teams, team } = useAppSelector(selectTeams);
  const [loading, setLoading] = useState(true);

  const [arrows, setArrows] = useState<JSX.Element[]>([]);
  const [allCards, setAllCards] = useState<membersProps[]>([]);
  const [updatedCards, setUpdatedCards] = useState<membersProps[]>([]);
  const [teamCard, setTeamCard] = useState<membersProps[]>([]);

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


  export const renderArrows = (
    allCards: membersProps[],
    setArrows: React.Dispatch<React.SetStateAction<JSX.Element[]>>
  ) => {
    const newArrows = allCards.map((card) => {
      const parentCard = allCards.find((item) => item.id === card.parentId);
      if (parentCard) {
        const parentElement = document.querySelector(
          `[data-cell-id="${parentCard.id}"]`
        ) as HTMLElement;
        const childElement = document.querySelector(
          `[data-cell-id="${card.id}"]`
        ) as HTMLElement;
  
        if (parentElement && childElement) {
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
    setArrows(newArrows.filter((arrow): arrow is JSX.Element => arrow !== null));
  };
  

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
    <section className={styles.teams}>
      {loading ? (
    <Preloader />
    ) : id ? (
        <div className={styles.cardContainer}>
          {teamCard && teamCard.map(renderCardsServer)}
          {arrows}
        </div>
      ) : (
        teams.map((item) => (
          <TeamsItem
            id={item.id}
            key={item.id}
            name={item.name}
            projects={item.projects}
          />
        ))
      )}
    </section>
  );
}
