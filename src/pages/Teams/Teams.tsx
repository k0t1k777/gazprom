import { useEffect, useLayoutEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import styles from 'src/pages/Teams/Teams.module.scss';
import { renderArrows, renderCards, renderEmptyCells } from 'src/services/helpers';
import { membersProps } from 'src/services/types';
import {
  fetchGetTeams,
  fetchGetTeamsId,
  selectTeams,
} from 'src/store/features/slice/teamsSlice';
import { useAppDispatch, useAppSelector } from 'src/store/hooks';
import TeamsItem from 'src/ui/TeamsItem/TeamsItem';

export default function Teams() {
  const { id } = useParams()

  const dispatch = useAppDispatch();
  const { teams, team } = useAppSelector(selectTeams);

  const [arrows, setArrows] = useState<JSX.Element[]>([]);
  const [busyCells, setBusyCells] = useState<string[]>([]);
  const [teamsCards, setTeamsCards] = useState<membersProps[]>([]);
  console.log('teamsCards: ', teamsCards);


  
  // const teamsRout = location.pathname.includes(`/teams/`)

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

  // useEffect(() => {
  //   const collectCards = (card: membersProps, collected: membersProps[]) => {
  //     collected.push(card);
  //     if (card.subordinates) {
  //       card.subordinates.forEach((subordinate) =>
  //         collectCards(subordinate, collected)
  //       );
  //     }
  //   };
  //   const newAllCards: membersProps[] = [];
  //   const newBusyCells: string[] = [];

  //   cards.forEach((card) => {
  //     collectCards(card, newAllCards);
  //     collectCellIds(card, newBusyCells);
  //   });

  //   setAllCards(newAllCards);
  //   setBusyCells(newBusyCells);
  // }, [cards]);

  // useLayoutEffect(() => {
  //   if (team.employees?.subordinates.length > 0) {
  //     renderArrows(team.employees?.subordinates, setArrows);
  //   }
  // }, [team.employees?.subordinates]);


  useEffect(() => {
    dispatch(fetchGetTeams());
  }, []);


  useEffect(() => {
    if (id) {
      const parsedId = parseInt(id, 10)
      dispatch(fetchGetTeamsId(parsedId))
    }
  }, [dispatch, id])

  useEffect(() => {
    setTeamsCards(team && team.employees?.subordinates)
  }, [team])

  return (
    <section className={styles.teams}>
  {id ? (
        <div>
         {/* {team.employees?.subordinates.map(renderCards)}
        {renderEmptyCells(busyCells)}
        {arrows} */}
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
