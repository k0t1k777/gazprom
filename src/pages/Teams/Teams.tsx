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
// const teamsRout = location.pathname.includes(`/teams/`)

// interface Card {
//   cellId?: string;
//   subordinates?: Card[];
// }

export default function Teams() {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const { teams, team } = useAppSelector(selectTeams);
  // console.log('team: ', team);

  // const [arrows, setArrows] = useState<JSX.Element[]>([]);
  const [allCards, setAllCards] = useState<membersProps[]>([]);
  console.log('allCards: ', allCards);
  const [updatedCards, setUpdatedCards] = useState<membersProps[]>([]);
  console.log('updatedCards: ', updatedCards);
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
          // Расчёт cellId для подчинённых карточек
          let cellId;

          if (card.subordinates && card.subordinates.length === 1) {
            // Проверяем, если у родителя 3 подчинённых
            if (index === 0) {
              // Первая карточка
              cellId = `${parentColom}-${parentRow + 1}`; // Прямо под родителем
            }
          }

          if (card.subordinates && card.subordinates.length === 2) {
            // Проверяем, если у родителя 3 подчинённых
            if (index === 0) {
              // Первая карточка
              cellId = `${parentColom}-${parentRow + 1}`; // Прямо под родителем
            } else if (index === 1) {
              // Вторая карточка
              cellId = `${parentColom + 1}-${parentRow + 1}`; // Вправо
            }
          }

          if (card.subordinates && card.subordinates.length === 3) {
            // Проверяем, если у родителя 3 подчинённых
            if (index === 0) {
              // Первая карточка
              cellId = `${parentColom}-${parentRow + 1}`; // Прямо под родителем
            } else if (index === 1) {
              // Вторая карточка
              cellId = `${parentColom + 1}-${parentRow + 1}`; // Вправо
            } else if (index === 2) {
              // Третья карточка
              cellId = `${parentColom - 1}-${parentRow + 1}`; // Влево
            }
          }

          if (card.subordinates && card.subordinates.length > 3) {
            // Проверяем, если у родителя 3 подчинённых
            if (index === 0) {
              cellId = `${parentColom}-${parentRow + 1}`;
            } else if (index === 1) {
              cellId = `${parentColom + 1}-${parentRow + 1}`; // Вправо
            } else if (index === 2) {
              cellId = `${parentColom - 1}-${parentRow + 1}`; // Влево
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

  useEffect(() => {
    dispatch(fetchGetTeams());
  }, []);

  useEffect(() => {
    if (id) {
      const parsedId = parseInt(id, 10);
      dispatch(fetchGetTeamsId(parsedId));
    }
  }, [dispatch, id]);


  useEffect(() => {
    if (team?.employees) {
      const allEmployeeData = [{ ...team.employees, cellId: '1-0' }];
      setAllCards(allEmployeeData);
    } else {
      setAllCards([]);
    }
  }, [team]);

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

  return (
    <section className={styles.teams}>
      {id ? (
        <div className={styles.cardContainer}>
          {teamCard && teamCard.map(renderCardsServer)}
          {/* {arrows} */}
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
