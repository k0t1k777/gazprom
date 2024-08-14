import { useEffect } from 'react';
import styles from 'src/pages/Teams/Teams.module.scss';
import {
  fetchGetTeams,
  selectTeams,
} from 'src/store/features/slice/teamsSlice';
import { useAppDispatch, useAppSelector } from 'src/store/hooks';
import TeamsItem from 'src/ui/TeamsItem/TeamsItem';

export default function Teams() {
  const dispatch = useAppDispatch();
  const { teams } = useAppSelector(selectTeams);
  useEffect(() => {
    dispatch(fetchGetTeams());
  }, []);

  return (
    <section className={styles.teams}>
      {teams.map((item) => (
        <TeamsItem
          key={item.id}
          name={item.name}
          projects={item.projects}
        />
      ))}
    </section>
  );
}
