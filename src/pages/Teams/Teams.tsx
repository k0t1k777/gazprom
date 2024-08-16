import { useEffect, useLayoutEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styles from 'src/pages/Teams/Teams.module.scss';
import { renderArrows, renderEmptyCells } from 'src/services/helpers';
import { membersProps } from 'src/services/types';
import { selectMembers } from 'src/store/features/slice/membersSlice';
import {
  fetchGetTeams,
  fetchGetTeamsId,
  selectTeams,
} from 'src/store/features/slice/teamsSlice';
import { useAppDispatch, useAppSelector } from 'src/store/hooks';
import Card from 'src/ui/Card/Card';
import TeamsItem from 'src/ui/TeamsItem/TeamsItem';
// const teamsRout = location.pathname.includes(`/teams/`)

export default function Teams() {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const { teams, team } = useAppSelector(selectTeams);
  // console.log('team: ', team);

  const [arrows, setArrows] = useState<JSX.Element[]>([]);
  // const [teamCards, setTeamsCards] = useState<membersProps[]>([]);
  // console.log('teamCards: ', teamCards);
  const [allCards, setAllCards] = useState<membersProps[]>([]);
  const [updatedCards, setUpdatedCards] = useState<membersProps[]>([]);
  console.log('updatedCards: ', updatedCards);
  const [teamCard, setTeamCard] = useState<membersProps[]>([]);
  // console.log('teamCard: ', teamCard);

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
const assignCellIds = (employee: membersProps, column: number, row: number): membersProps => {
  const updatedSubordinates = Array.isArray(employee.subordinates)
    ? employee.subordinates.map((subordinate, subIndex) => 
        assignCellIds(subordinate, column + 1, subIndex) // Увеличиваем column на 1
      )
    : [];

  return {
    ...employee,
    subordinates: updatedSubordinates,
    cellId: `${row}-${column}`, // Установка cellId для родителя
  };
};

useEffect(() => {
  const newCards = allCards.map((employee, index) => 
    assignCellIds(employee, 0, index) // Начинаем с column = 0 и row = index
  );

  // Устанавливаем cellId для первого элемента
  if (newCards.length > 0) {
    newCards[0].cellId = '1-0';
  }

  setUpdatedCards(newCards);
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
      const allEmployeeData = [team.employees];
      setAllCards(allEmployeeData);
    } else {
      setAllCards([]);
    }
  }, [team]);

  console.log('allCards: ', allCards);






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

// useEffect(() => {
//   if (team && Array.isArray(team.employees)) {
//       const updatedCards = team.employees.map((employee, index) => {
//           // Проверяем, есть ли у employee подчиненные
//           const updatedSubordinates = Array.isArray(employee.subordinates) ?
//               employee.subordinates.map((subordinate, subIndex) => ({
//                   ...subordinate,
//                   sellId: `${index}-${subIndex}`, // Формат sellId: "0-0", "0-1", "1-0" и т.д.
//               })) : [];

//           return {
//               ...employee,
//               subordinates: updatedSubordinates,
//           };
//       });

//       setAllCards(updatedCards);
//   }
// }, [team]);
// console.log('allCards: ', allCards);

// const collectCellIds = (card: membersProps, collected: string[]) => {
//   if (card.cellId) {
//     collected.push(card.cellId);
//   }
//   if (card.subordinates) {
//     card.subordinates.forEach((subordinate) =>
//       collectCellIds(subordinate, collected)
//     );
//   }
// };

// const assignCellIds = (cards: membersProps[], level: number = 0) => {
//   cards.forEach((card, index) => {
//     // Если у карточки есть подчиненные
//     if (card.subordinates) {
//       // Присваиваем cellId для первого уровня подчиненных
//       card.subordinates.forEach((subordinate, subIndex) => {
//         subordinate.cellId = `${index}-${level + 1}`; // Присвоение для первого уровня
//       });

//       // Рекурсивно вызываем для следующего уровня подчиненных
//       assignCellIds(card.subordinates, level + 1);
//     }
//   });
// };

// useEffect(() => {
//   if (allCards && allCards.length > 0) {
//     // Обновляем cellId для всех карточек
//     assignCellIds(allCards);

//     // Копируем первый объект и добавляем cellId
//     const updatedCard = {
//       ...allCards[0],
//       cellId: '1-0'
//     };

//     // Сохраняем в teamCard
//     setTeamCard([updatedCard]);
//   }
// }, [allCards]);

// рабочий код
// useEffect(() => {
//   if (allCards && allCards.length > 0) {
//     // Копируем первый объект и добавляем cellId
//     const updatedCard = {
//       ...allCards[0],
//       cellId: '1-0'
//     };

//     // Сохраняем в teamCard
//     setTeamCard([updatedCard]);
//   }
// }, [allCards]);

// const assignCellIds = (item, parentCellId) => {
//   // Присваиваем cellId текущему элементу
//   item.cellId = parentCellId;

//   // Если есть подчинённые, проходим по ним и присваиваем cellId
//   if (item.subordinates && item.subordinates.length > 0) {
//     item.subordinates.forEach((subordinate, index) => {
//       // Присваиваем cellId для подчинённых
//       assignCellIds(subordinate, ${parentCellId.split('-')[0]}-${index + 1});
//     });
//   }
// };

// useEffect(() => {
//   // Пример начального объекта allCards
//   const initialCards = {
//     id: 52,
//     user_id: 70,
//     parent_id: null,
//     image: '/media/images/users/fake70.jpeg',
//     subordinates: [
//       { id: 53, user_id: 71, subordinates: [] },
//       { id: 54, user_id: 72, subordinates: [] }
//     ]
//   };

//   // Присваиваем cellId начиная с '1-0'
//   assignCellIds(initialCards, '1-0');

//   // Устанавливаем результат в состояние
//   setAllCards(initialCards);
// }, []);

// const addSellId = (subordinates: Subordinate[], index: number): Subordinate[] => {
//   return subordinates.map((subordinate, subIndex) => {
//     const newSellId = `${index}-${subIndex + 1}`;

//     // Если есть подчинённые, вызываем функцию рекурсивно
//     const updatedSubordinates = subordinate.subordinates
//       ? addSellId(subordinate.subordinates, parseInt(newSellId.split('-')[0], 10))
//       : undefined;

//     return {
//       ...subordinate,
//       sellId: newSellId,
//       subordinates: updatedSubordinates,
//     };
//   });
// };

// useEffect(() => {
//   const updatedCards = allCards.map((employee, index) => {
//     const updatedSubordinates = addSellId(employee.subordinates, index);

//     return {
//       ...employee,
//       subordinates: updatedSubordinates,
//     };
//   });

//   setTeamCard(updatedCards);
// }, [allCards]);

// sellId: `${subIndex}-${index  + 1}`

// работает один массив
// useEffect(() => {
//   const collectCards = (card: membersProps, collected: membersProps[]) => {
//       collected.push(card);
//       if (card.subordinates) {
//           card.subordinates.forEach((subordinate) =>
//               collectCards(subordinate, collected)
//           );
//       }
//   };

//   const newAllCards: membersProps[] = [];

//   allCards.forEach((card) => {
//       collectCards(card, newAllCards);
//   });

//   setTeamCard(newAllCards);
// }, [allCards]);

// useEffect(() => {
//   const updatedCards = allCards.map((employee, index) => {
//     const updatedSubordinates = Array.isArray(employee.subordinates)
//       ? employee.subordinates.map((subordinate, subIndex) => ({
//           ...subordinate,
//           sellId: `${subIndex}-${index + 1}`, // Формат sellId: "0-0", "0-1", "1-0" и т.д.
//         }))
//       : [];

//     return {
//       ...employee,
//       subordinates: updatedSubordinates,
//     };
//   });
//   setTeamCard(updatedCards);
// }, [allCards]);
