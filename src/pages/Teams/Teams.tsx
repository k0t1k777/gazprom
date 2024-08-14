import { useEffect, useLayoutEffect, useState } from 'react';
import { useLocation, useOutletContext, useParams } from 'react-router-dom';
import styles from 'src/pages/Teams/Teams.module.scss';
import { renderArrows, renderCards, renderEmptyCells } from 'src/services/helpers';
import { membersProps } from 'src/services/types';
import { selectMembers } from 'src/store/features/slice/membersSlice';
import {
  fetchGetTeams,
  fetchGetTeamsId,
  selectTeams,
} from 'src/store/features/slice/teamsSlice';
import { useAppDispatch, useAppSelector } from 'src/store/hooks';
import TeamsItem from 'src/ui/TeamsItem/TeamsItem';

export default function Teams() {
  const { allowDrop, handleDrop } = useOutletContext<{
    allowDrop: (e: React.DragEvent<HTMLImageElement>) => void;
    handleDrop: (e: React.DragEvent<HTMLDivElement>) => void;
    // cards: membersProps[];
  }>();
  const { id } = useParams()
  // const teamsRout = location.pathname.includes(`/teams/`)

  const dispatch = useAppDispatch();
  const { teams, team } = useAppSelector(selectTeams);
  // console.log('team: ', team);
  let { isFilterOpen } = useAppSelector(selectMembers);


  const [allCards, setAllCards] = useState<membersProps[]>([]);
  // console.log('allCards: ', allCards);
  const [arrows, setArrows] = useState<JSX.Element[]>([]);
  const [busyCells, setBusyCells] = useState<string[]>([]);
  const [teamsCards, setTeamsCards] = useState<membersProps[]>([]);


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

    teamsCards && teamsCards.forEach((card) => {
      collectCards(card, newAllCards);
      collectCellIds(card, newBusyCells);
    });

    setAllCards(newAllCards);
    setBusyCells(newBusyCells);
  }, [teamsCards]);

  useLayoutEffect(() => {
    if (allCards.length > 0) {
      renderArrows(allCards, setArrows);
    }
  }, [allCards]);


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
  
  console.log('teamsCards: ', teamsCards);

  return (
    <section className={styles.teams} onDragOver={allowDrop} onDrop={handleDrop}>
  {id ? (
        <div>
         {teamsCards && teamsCards.map(renderCards)}
        {renderEmptyCells(busyCells, isFilterOpen)}
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
